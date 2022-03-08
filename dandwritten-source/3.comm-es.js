
// commonjs 引入 esModule 打包后的代码
// esModule 引入是引用，不是拷贝

var modules = {
  "./src/title.js": (module, exports, require) => {
    require.r(exports);
    require.d(exports, {
      default: () => _DEFAULT_EXPORT__,
      age: () => age,
    });

    // 下面是引入模块内导入的代码， 上面的 get 是引用下面的值，下面的值发生改变，上面的值也会发生改变
    const _DEFAULT_EXPORT__ = "title_name";
    const age = "title_age";
  },
};

var cache = {};

function require(moduleId) {
  if (cache[moduleId]) {
    return cache[moduleId].exports;
  }
  var module = cache[moduleId]  = {
    exports: {}
  }
  modules[moduleId](module, module.exports, require)
  return module.exports
}

// 标记导入的是 esModule 类型
require.r = function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  Object.defineProperty(exports, '__esModule', { value: true });
}

// 给 exports 对象增加 get 方法，get 方法用于获取模块的 exports 对象
require.d = function(exports, definition) {
  for (var key in definition) {
    Object.defineProperty(exports, key, {
      enumerable: true, // 可枚举
      get: definition[key]
    })
  }
}

const title = require("./src/title.js");
console.log(title.default);
console.log(title.age);