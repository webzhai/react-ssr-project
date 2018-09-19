const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const moduleAlias = require('module-alias')
const _ = require('lodash')
const pkg = require('../../package')

moduleAlias()

module.exports = {
  target: 'web',
  entry: {
    app: path.join(__dirname, '../../client/app')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../../dist'),
    publicPath: '/public/' // 打包出的文件引用资源路径包含/public/,且请求路径/public/映射到path中
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /.(js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude: [
      //     path.join(__dirname, '../../node_modules')
      //   ]
      // },
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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../../client/template.html')
    }),
    new HtmlWebpackPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../../client/server.template.ejs'),
      filename: 'server.ejs'
    })
  ],
  resolve: {
    // '.js', '.jsx'后缀名可省略
    extensions: ['.js', '.jsx'],
    alias: _.merge(pkg._moduleAliases)
  }
}
