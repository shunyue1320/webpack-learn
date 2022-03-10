// 手写一个  babel-logger 插件
const path = require('path');
const types = require('@babel/types');

const visitor = {
  CallExpression(nodePath, state) {
    const { node } = nodePath;
    if (types.isMemberExpression(node.callee)) {
      if (node.callee.object.name === 'console') {
        if (['log','debug','info','warn','error'].includes(node.callee.property.name)) {
          // 拿到这一行的 行 列
          const { line, column } = node.loc.start;
          // 拿到路径信息
          const fileName = path.relative(path.resolve('.'),state.file.opts.filename).replace(/\\/g,'/');
          // 参数最前面插入 fileName, line, column
          node.arguments.unshift(types.stringLiteral(`${fileName} ${line}:${column}`));
        }
      }
    }
  }
}


module.exports = function () {
  return {
    visitor
  }
}
