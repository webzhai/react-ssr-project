const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpackBaseConfig')
const config = webpackMerge(webpackBase,{
  mode:'development',
  entry:{
    app:[
      'react-hot-loader/patch',
      path.join(__dirname, '../../client/app')
    ],
  },
  devServer:{
    host:'0.0.0.0',
    compress:true,
    port:'8888',
    contentBase:path.join(__dirname, '../../dist'),
    hot:true,
    overlay:{
      errors:true
    },
    publicPath:'/public/',
    historyApiFallBack: {
      index: '/public/index.html'
    },
    proxy:{
      '/api':'http://localhost:3333'
    }
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
})
module.exports = config
