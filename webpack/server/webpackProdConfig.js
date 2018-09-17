const path = require('path')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpackBaseConfig')
const config = webpackMerge(webpackBase,{
  // mode:'development'
  mode:'production'
})
module.exports = config
