// babel核心包，用来实现语法树生成、遍历、修改和生成源代码
const core = require("@babel/core");

// 用来生成某些AST节点或者判断某个节点是不是需要个类型的
const types = require("@babel/types");

const sourceCode = `const sum = (a,b)=>{
  console.log(this);
  return a+b;
}`;

// 手写 箭头函数 转 es5函数 插件
const transformEs2015ArrowFunctions = {
  visitor: {
    ArrowFunctionExpression(path) {
      let { node } = path;
      let body = node.body;
      hoistFunctionEnvironment(path);  // 外面加一次this指向：var _this = this;
      node = "FunctionExpression";     // 改成es5函数 function
      // 判断函数体是否是语句块
      if (!types.isBlockStatement(body)) {
        // 不是语句块则块语句包裹并return函数体： { return body }
        node.body = types.blockStatement([types.returnStatement(body)]);
        console.log("node.body =====", node.body)
      }
    },
  },
};

function hoistFunctionEnvironment(path) {
  // 1.确定我要用哪里的this 向上找不是箭头函数的函数或者根节点
  const thisEnv = path.findParent((parent) => {
    return (
      (parent.isFunction() && !path.isArrowFunctionExpression()) ||
      parent.isProgram()
    );
  });
  let thisBindings = "_this";
  let thisPaths = getThisPaths(path);
  if (thisPaths.length > 0) {
    //在thisEnv这个节点的作用域中添加一个变量 变量名为_this, 值 为this var _this = this;
    if (!thisEnv.scope.hasBinding(thisBindings)) {
      thisEnv.scope.push({
        id: types.identifier(thisBindings),
        init: types.thisExpression(),
      });
    }
  }
  thisPaths.forEach((thisPath) => {
    // 将所有 this => _this
    thisPath.replaceWith(types.identifier(thisBindings));
  });
}

function getThisPaths(path) {
  let thisPaths = [];
  path.traverse({ // traverse 便利 path 子节点拿到使用 this 的 path
    ThisExpression(path) {
      thisPaths.push(path);
    },
  });
  return thisPaths;
}

/**
 * 在转换的时候，每一个语法都会对应一个插件
 * 每个插件只有一个功能，转换一种写法
 */
const targetCode = core.transform(sourceCode, {
  plugins: [transformEs2015ArrowFunctions],
  //上面手写插件实现内置插件 transform-es2015-arrow-functions 的功能
  //plugins: ['transform-es2015-arrow-functions']
});
// 实现 箭头函数 转 es5函数 第一步： 指定this指向
console.log("targetCode = ", targetCode.code);
