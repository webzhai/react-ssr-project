const path = require('path')
const nodeExternals = require('webpack-node-externals')
const moduleAlias = require('module-alias')
const _ = require('lodash')
const pkg = require('../../package')

moduleAlias()
module.exports={
  target:'node',
  entry:{
    app: path.join(__dirname, '../../client/server-entry.js')
  },
  externals:[nodeExternals()],
  output:{
    path: path.join(__dirname, '../../dist'),
    filename:'server-entry.js',
    libraryTarget:'commonjs2',
    publicPath:'/public/',
  },
  module:{
    rules:[
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
  resolve:{
    extensions: ['.js', '.jsx'],
    alias:_.merge(pkg._moduleAliases)
  }
}
