// 手写一个  babel-plugin-import 插件
const types = require('@babel/types');
 
const visitor = {
  // 当babel遍历语法树的时候，当遍历到ImportDeclaration节点的时候会执行此函数
  ImportDeclaration(nodePath, state) { // state 是 loader 配置时传递过来的
    // 获取对应的 node 节点
    const { node } = nodePath;
    // 获取导入的标识符
    const { specifiers } = node;
    const { libraryName, libraryDirectory = 'lib' } = state.opts;
    // 如果导入的库等于配置的库的名字 并且 当前导入不是默认导入
    if (node.source.value === libraryName && !types.isImportDefaultSpecifier(specifiers[0])) {
      const declarations = specifiers.map(specifier => {
        // 引入模块真实路径拼接
        const source = [libraryName, libraryDirectory, specifier.imported.name].filter(Boolean).join('/');
        return types.importDeclaration(
          [types.importDefaultSpecifier(specifier.local)],
          types.stringLiteral(source)
        );
      });
      nodePath.replaceWithMultiple(declarations)
    }
  }
}

module.exports = function () {
  return {
    visitor
  }
}
