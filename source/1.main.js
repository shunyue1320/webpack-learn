// commonjs 引入 module.exports 导出的 commonjs 打包后的代码

(() => {
  var modules = ({
    "./src/title.js":
      ((module) => {
        module.exports = "title";
      })
  });
  var cache = {};
  function require(moduleId) {
    var cachedModule = cache[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = cache[moduleId] = {
      exports: {}
    };
    modules[moduleId](module, module.exports, require);
    return module.exports;
  }
  var exports = {};
  let title = require("./src/title.js.js");
  console.log(title);
})()