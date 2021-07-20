// *************webpack需要引入的包*************************
// 抽离css样式
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 用来压缩分离出来的css样式
let OptimizeCss =  require('optimize-css-assets-webpack-plugin');
// 用来压缩js
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// *************webpack相关配置部分*************************
module.exports = {
  optimization: {
    // 优化项
    minimizer: [
      new OptimizeCss(), // 压缩css
      new UglifyJsPlugin({ // 压缩js
        cache: true, // 是否用缓存
        parallel: true, // 并发打包
        sourceMap: false, // es6 -> es5 转换时会用到
      }),
    ],
  },
  // 中间部分省略

  // 抽离css样式
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', // 抽离出来样式的名字
    }),
  ],
}