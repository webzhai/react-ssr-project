const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const moduleAlias = require('module-alias')
const _ = require('lodash')
const pkg = require('../../package')
const utils = require('../utils')

moduleAlias()

const GLOBALS = {
  ENV_IS_DEV: process.env.NODE_ENV ==='development',
  ENV_IS_NODE: true,
}

const entryConfig = {
  include: [
    '../../client/views/pages',
  ]
};
const baseDir = process.cwd();
const normalEntries = utils.getEntry(entryConfig, baseDir);
const entries = _.merge({}, normalEntries);
console.log('entriesentriesentriesentriesentriesentriesentries',entries)
module.exports = {
  target: 'node',
  context: baseDir,
  entry: entries,
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
