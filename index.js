const webpack = require("webpack");
// const webpack = require("./webpack");
const webpackOptions = require("./webpack.config");

const compiler = webpack(webpackOptions);

compiler.run((err, stats) => {
  console.log("err ======", err);
  console.log(
    "stats ======",
    stats.toJson({
      assets: true, //本欠编译产出的资源
      chunks: true, //本次编译产出的代码块
      modules: true, //本次编译产出的模块
    })
  );
});
