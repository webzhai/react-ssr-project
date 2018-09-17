const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpackBaseConfig')
const config = webpackMerge(webpackBase,{
  mode:'development',
  entry:{
    app:[
      'react-hot-loader/patch', // 热更新
      path.join(__dirname, '../../client/app')
    ],
  },
  devServer:{
    host: '0.0.0.0',
    compress: true,
    port: '8888',
    contentBase: path.join(__dirname, '../../dist'), // 在此文件夹内启动webpack devServer服务
    hot: true, // 热更新
    overlay: {
      errors: true
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // 热更新
  ]
})
module.exports = config
