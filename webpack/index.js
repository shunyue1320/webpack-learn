const Compiler = require("./Compiler");

function webpack(options) {

  // 1. 初始化参数，从配置文件和shell语句中读取并合并参数，并得到最终的配置对象
  const argv = process.argv.slice(2);
  // node index.js --mode=development
  let shellOptions = argv.reduce((shellOptions, options) => {
    let [key, value] = options.split("=");
    shellOptions[key.slice(2)] = value;
    return shellOptions;
  }, {});
  let finalOptions = { ...options, ...shellOptions };


  // 2. 用上一步的配置对象初始化compiler对象
  const compiler = new Compiler(finalOptions);


  // 3. 加载所有在配置文件中配置的插件
  const { plugins } = finalOptions;

  for (let plugin of plugins) {
    plugin.apply(compiler); // 订阅事件
  }
  return compiler;
}

module.exports = webpack;
