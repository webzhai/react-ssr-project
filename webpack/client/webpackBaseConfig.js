const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const moduleAlias = require('module-alias')
const ManifestPlugin = require('webpack-manifest-plugin')
const _ = require('lodash')
const listEntries = require('../utils')
const pkg = require('../../package')

moduleAlias()

const GLOBALS = {
  ENV_IS_DEV: process.env.NODE_ENV ==='development',
  ENV_IS_NODE: false,
};
// const entryRoot = path.join(baseDir, 'scripts/pages');
// const normalEntries = listEntries(entryRoot);

module.exports = {
  target: 'web',
  entry: {
    index: path.join(__dirname, '../../client/views/pages/Index')
  },
  output: {
    filename: 'scripts/[name].[hash].js',
    chunkFilename: 'scripts/[name].[hash].js',
    path: path.join(__dirname, '../../dist/client'),
    publicPath: '/public/client/' // 打包出的文件引用资源路径包含/public/,且请求路径/public/映射到path中
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
    new webpack.DefinePlugin(GLOBALS),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../../client/template.html')
    }),
    new HtmlWebpackPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../../client/server.template.ejs'),
      filename: 'server.ejs'
    }),
    new ManifestPlugin({
      filename:'assetsMainfest.json',
      filepath:'',
      // basePath:'/test/' // 所有文件引用的路径前缀。用于在清单中包含输出路径。
      // publicPath:'/test2/' //仅用于输出文件的路径前缀，类似于Webpack的output.publicPath。如果还提供了basePath，则忽略
      // writeToFileEmit: true, //用于内存开发环境
      generate(seed, files) {
        const assetsMap = {};
        files.forEach(({ name, path: assetPath }) => {
          let key;
        let ext;
        if (name.endsWith('.css')) {
          key = name.substring(0, name.length - 4);
          ext = 'css';
        } else if (name.endsWith('.js')) {
          key = name.substring(0, name.length - 3);
          ext = 'js';
        } else {
          return;
        }

        if (assetsMap[key]) {
          assetsMap[key][ext] = assetPath;
        } else {
          assetsMap[key] = { [ext]: assetPath };
        }
      });

        return { ...seed, ...assetsMap };
      },
    })
  ],
  resolve: {
    // '.js', '.jsx'后缀名可省略
    extensions: ['.js', '.jsx'],
    alias: _.merge(pkg._moduleAliases)
  }
}
