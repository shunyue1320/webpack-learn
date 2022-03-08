// 源代码 => ast语法树  网站：https://astexplorer.net/
const esprima = require("esprima");
// 便利ast语法树打印每个节点
const estraverse = require("estraverse");
// ast语法树 => 源代码
const escodegen = require("escodegen");

// 目标代码
const sourceCode = "function ast(){}";
// 目标代码 => ast语法树
const ast = esprima.parse(sourceCode);
console.log("ast = ", ast);
console.log(" ");
/**
 * 当我们遍历一颗抽象语法树的时候
 * 以深度优先的方式进行遍历
 * 只会遍历有type属性节点
 * 每个节点都会有进入和离开两个环节
 */
let indent = 0;
let padding = () => " ".repeat(indent);

estraverse.traverse(ast, {
  enter(node) {
    console.log(padding() + node.type + "进入");
    indent += 2;
  },
  leave(node) {
    indent -= 2;
    console.log(padding() + node.type + "离开");
  },
});

const targetCode = escodegen.generate(ast);
console.log(" ");
console.log("targetCode = ", targetCode);

// ast =  Script {
//   type: 'Program',
//   body: [
//     FunctionDeclaration {
//       type: 'FunctionDeclaration',
//       id: [Identifier],
//       params: [],
//       body: [BlockStatement],
//       generator: false,
//       expression: false,
//       async: false
//     }
//   ],
//   sourceType: 'script'
// }

// Program进入
//   FunctionDeclaration进入
//     Identifier进入
//     Identifier离开
//     BlockStatement进入
//     BlockStatement离开
//   FunctionDeclaration离开
// Program离开

// targetCode =  function ast() {
// }
