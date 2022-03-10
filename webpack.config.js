const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              // [
              //   'babel-plugin-import',
              //   {
              //     libraryName: 'lodash',
              //     libraryDirectory: ''
              //   }
              // ]
              // 手写的插件
              [
                path.resolve(__dirname, "plugins/babel-plugin-import.js"),
                {
                  libraryName: 'lodash',
                  libraryDirectory: ''
                }
              ],
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(), // 清除前次打包文件
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    })
  ],
  devServer: {}
}