const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const types = require("@babel/types");
const { callbackify } = require("util");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

function toUnixPath(path) {
  return path.replace(/\\/g, "/");
}

// 当前命令所在的目录
const baseDir = toUnixPath(process.cwd());

class Compilation {
  constructor(options) {
    this.options = options;
    //本次编译所有生成出来的模块
    this.modules = [];
    //本次编译产出的所有代码块 入口模块和依赖的模块打包在一起成为代码块
    this.chunks = [];
    //本次编译产出的资源文件
    this.assets = {};
    //本次打包步及了哪些文件了，主要是为了实现watch,监听文件的变化，文件发生变化后会重新编译
    this.fileDependencies = [];
  }
  build(callback) {
    //5.根据配置文件中的`entry`配置项找到所有的入口
    let entry = {};
    if (typeof this.options.entry === "string") {
      entry.main = this.options.entry;
    } else {
      entry = this.options.entry;
    }

    //6.从入口文件出发，调用所有配置的loader规则，比如说loader对模块进行编译
    for (let entryName in entry) {
      // 入口的名称就是entry的属性名，也将会成为代码块的名称
      // /Users/guojianbo/Documents/learning/webpack-learn/src/index.js
      let entryFilePath = path.posix.join(baseDir, entry[entryName]);
      //把入口文件的绝对路径添加到依赖数组里
      this.fileDependencies.push(entryFilePath);
      // 6.从入口文件出发，调用所有配置的loader规则，比如说loader对模块进行编译
      let entryModule = this.buildModule(entryName, entryFilePath);
      this.modules.push(entryModule);
      //8.等把所有的模块编译完成后，根据模块之间的依赖关系，组装成一个个包含多个模块的chunk
      let chunk = {
        name: entryName, //代码块的名称就是入口的名称
        entryModule, //此代码块对应的入口模块的对象
        modules: this.modules.filter((item) => item.names.includes(entryName)),
      };
      this.chunks.push(chunk);
    }

    //9.再把各个代码块chunk转换成一个一个的文件(asset)加入到输出列表
    this.chunks.forEach((chunk) => {
      let filename = this.options.output.filename.replace("[name]", chunk.name);
      this.assets[filename] = getSource(chunk);
    });

    callback(
      null,
      {
        chunks: this.chunks,
        modules: this.modules,
        assets: this.assets,
      },
      this.fileDependencies
    );
  }

  // 当你编译 模块的时候，需要传递你这个模块是属于哪个代码块的，传入代码块的名称
  buildModule(name, modulePath) {
    // 6.  从入口文件出发，调用所有配置的loader规则，比如说loader对模块进行编译
    // 6.1 读取模块内容
    let sourceCode = fs.readFileSync(modulePath, "utf8");
    // buildModule返回一个模块对象，每个模块都会有一个moduleId 模块ID 等于相对于根目录的相对路径
    let moduleId = "./" + path.posix.relative(baseDir, modulePath);
    // 创建一个模块对象 name 是此模块属于哪个代码块，一个模块可以会属于多个代码块
    let module = { id: moduleId, names: [name], dependencies: [] };

    // 6.2 查找对应的loader对源码进行翻译和转换
    let loaders = [];
    let { rules = [] } = this.options.module;
    rules.forEach((rule) => {
      let { test } = rule;
      //如果模块的路径和正则匹配，就把此规则对应的loader添加到loader数组里
      if (modulePath.match(test)) {
        loaders.push(...rule.use);
      }
    });

    runLoaders(
      {
        resource: modulePath,
        loaders,
      },
      () => {}
    );

    //自右向左对模块进行转译
    /*   sourceCode = loaders.reduceRight((sourceCode, loader) => {
              return require(loader)(sourceCode);
          }, sourceCode); */
    //通过loader翻译后的内容一定是js内容
    // 7.再找出此模块的依赖的模块，再递归本步骤找到依赖的模块进行编译
    let ast = parser.parse(sourceCode, { sourceType: "module" });
    traverse(ast, {
      CallExpression: (nodePath) => {
        const { node } = nodePath;
        //如果这是一个require的方法调用的话
        if (node.callee.name === "require") {
          //获取依赖的模块
          let depModuleName = node.arguments[0].value;
          //当前的正在编译 的模块所在的目录
          let dirname = path.posix.dirname(modulePath);
          //获取依赖模块的绝对路径 C:\aproject\zhufengwebpack202202\4.flow\src\title
          let depModulePath = path.posix.join(dirname, depModuleName);
          //获取配置的扩展名
          let extensions = this.options.resolve.extensions;
          //尝试添加后缀，找到一个真实在硬盘上存在的文件
          depModulePath = tryExtensions(depModulePath, extensions);
          this.fileDependencies.push(depModulePath);
          //获取依赖的模块的ID
          let depModuleId = "./" + path.posix.relative(baseDir, depModulePath);
          //修改语法权地，把依赖的模块改为依赖模块ID
          //require('./title');=>require("./src/title.js");
          node.arguments = [types.stringLiteral(depModuleId)];
          //添加依赖
          module.dependencies.push({ depModuleId, depModulePath });
        }
      },
    });

    // 重新生成新的代码
    let { code } = generator(ast);
    //把转译后的源代码存放到module._source属性上
    module._source = code;
    //再递归本步骤找到依赖的模块进行编译
    module.dependencies.forEach(({ depModuleId, depModulePath }) => {
      let existModule = this.modules.find((item) => item.id === depModuleId);
      //如果modules里已经存在这个将要编译 的依赖模块了，那么就不需要编译 了，直接把此代码块的名称添加到对应的模块的name里就可以
      if (existModule) {
        //name指的是哪它属于哪些代码块
        existModule.names.push(name);
      } else {
        let depModule = this.buildModule(name, depModulePath);
        this.modules.push(depModule);
      }
    });
    return module;
  }
}

function getSource(chunk) {
  return `
   (() => {
    var modules = {
      ${chunk.modules
        .map(
          (module) => `
        "${module.id}": (module) => {
          ${module._source}
        }
      `
        )
        .join(",")}  
    };
    var cache = {};
    function require(moduleId) {
      var cachedModule = cache[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }
      var module = (cache[moduleId] = {
        exports: {},
      });
      modules[moduleId](module, module.exports, require);
      return module.exports;
    }
    var exports ={};
    ${chunk.entryModule._source}
  })();
   `;
}

function tryExtensions(modulePath, extensions) {
  if (fs.existsSync(modulePath)) {
    return modulePath;
  }
  for (let i = 0; i < extensions.length; i++) {
    let filePath = modulePath + extensions[i];
    if (fs.existsSync(filePath)) return filePath;
  }
  throw new Error(`无法找到${modulePath}`);
}
module.exports = Compilation;
