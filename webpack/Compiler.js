const fs = require("fs");
const path = require("path");
const { SyncHook } = require("tapable");
const Compilation = require("./Compilation");

class Compiler {
  constructor(options) {
    this.options = options;
    this.hooks = {
      run: new SyncHook(),  // 会在编译刚开始的时候触发此run钩子
      done: new SyncHook(), // 会在编译结束的时候触发此done钩子
    };
  }
  // 4. 执行 Compiler 对象的 run 方法开始执行编译
  run(callback) {
    // 4.1. 在编译前触发run钩子执行 表示开始启动编译了
    this.hooks.run.call();

    // 4.3. 编译成功之后的回调
    const onCompiled = (err, stats, fileDependencies) => {
      // 将打包后的代码写入 output.path 输出路径内
      for (const filename in stats.assets) {
        let filePath = path.join(this.options.output.path, filename);
        let exist = fs.existsSync(path.dirname(filePath));
        if (!exist) {
          fs.mkdirSync(path.dirname(filePath));
        }
      }

      // 编译完成返回打包的内容
      callback(err, {
        toJson: () => stats,
      });

      // 开启热加载
      fileDependencies.forEach((fileDependency) => {
        fs.watch(fileDependency, () => this.compile(onCompiled));
      });

      //当编译成功后会触发done这个钩子执行
      this.hooks.done.call();
    };

    // 4.2. 开始编译，编译 成功之后调用onCompiled方法
    this.compile(onCompiled);
  }
  compile(callback) {
    // webpack虽然只有一个Compiler,但是每次编译都会产出一个新的Compilation
    let compilation = new Compilation(this.options);
    // 执行compilation的build方法进行编译 ，编译 成功之后执行回调
    compilation.build(
      
    );
  }
}

module.exports = Compiler;
