const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const moduleAlias = require('module-alias')
const _ = require('lodash')
const pkg = require('../../package')

moduleAlias()

const GLOBALS = {
  ENV_IS_DEV: process.env.NODE_ENV ==='development',
  ENV_IS_NODE: true,
}
module.exports = {
  target: 'node',
  entry: {
    index: path.join(__dirname, '../../client/views/pages/Index')
  },
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, '../../dist/server'),
    filename: 'scripts/[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/public/server'
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../../node_modules')
        ]
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin(GLOBALS)
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: _.merge(pkg._moduleAliases)
  }
}
