import path from 'path';
import process from 'process';
import webpack from 'webpack';
import webpackDevConfig from './webpackDevConfig.js';
import webpackProdConfig from './webpackProdConfig.js';

let webpackConfig = webpackProdConfig;

if (process.env.NODE_ENV === 'development') {
  webpackConfig = webpackDevConfig;
}

let compiler = webpack(webpackConfig);
compiler.apply(new webpack.ProgressPlugin());
compiler.run(function (err, stats) {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  console.log(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }));
});
