const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const moduleAlias = require('module-alias')
const _ = require('lodash')
const pkg = require('../../package')

moduleAlias()

module.exports={
  target:'web',
  entry:{
    app:path.join(__dirname,'../../client/app')
  },
  output:{
    filename:'[name].[hash].js',
    path:path.join(__dirname,'../../dist'),
    publicPath:'/public/',
  },
  module:{
    rules:[
      // {
      //   enforce:'pre',
      //   test:/.(js|jsx)$/,
      //   loader:'eslint-loader',
      //   exclude:[
      //     path.join(__dirname, '../../node_modules')
      //   ]
      // },
      {
        test:/.jsx$/,
        loader:'babel-loader'
      },
      {
        test:/.js$/,
        loader:'babel-loader',
        exclude:[
          path.join(__dirname, '../../node_modules')
        ]
      }
    ]
  },
  plugins:[
    new htmlWebpackPlugin({
      template:path.join(__dirname, '../../client/template.html')
    })
  ],
  resolve:{
    extensions: ['.js', '.jsx'],
    alias:_.merge(pkg._moduleAliases)
  }
}
