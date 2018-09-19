const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpackBaseConfig')
const config = webpackMerge(webpackBase, {
  mode: 'development',
  entry: {
    app: [
      'react-hot-loader/patch', // 热更新
      path.join(__dirname, '../../client/app')
    ]
  },
  // 开发环境webpack将客户端资源打包进内存以便热更新
  devServer: {
    host: '0.0.0.0', // 接受localhost和本机ip发起的请求
    compress: true,
    port: '8888',
    contentBase: path.join(__dirname, '../../dist'), // 在此文件夹内启动webpack devServer服务
    hot: true, // 热更新
    overlay: {
      errors: true // 打包出现错误时浏览器浮层提示错误
    },
    // devServer服务在host:port/public/下提供，
    // 与webpackBaseConfig中配置的publicPath保持一致以便能正确拿到静态资源
    publicPath: '/public/',
    // 错误请求退回到index
    historyApiFallback: {
      index: '/public/index.html'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // 热更新
  ]
})
module.exports = config
