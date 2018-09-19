const path = require('path')
const axios = require('axios')
const proxy = require('http-proxy-middleware')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const ejs = require('ejs')
const ReactSSR = require('react-dom/server')
const serverConfig = require('../../webpack/server/webpackDevConfig')

// 从内存中获取客户端编译后模板
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then((res) => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

// 将从内存中获取的服务端打包输出文件转换为js模块
const NativeModule = require('module')
const vm = require('vm')
// `(function(exports, require, module, __finename, __dirname){ ...bundle code })`
const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

// 启动一个webpack模块 并将打包输出位置更改为内存
const mfs = new MemoryFs()
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs // 更改webpack默认硬盘写入为内存写入
let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach((err) => console.error(err))
  stats.warnings.forEach((warn) => console.warn(warn))
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})

module.exports = function (app) {
  // 将指向静态文件夹public的请求重定向到开发环境webpack(webpack-dev-server)服务器，
  // 避免所有静态资源请求都使用app.get('*')处理所导致的请求结果都为字符串html模板的问题
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))

  app.get('*', function (req, res, next) {
    if (!serverBundle) {
      res.send('waiting for compile , refresh later')
    }
    getTemplate().then((template) => {
      const content = ReactSSR.renderToString(serverBundle)
      const html = ejs.render(template, { appString: content })
      // res.send(template.replace('<!-- app -->',content))
      res.send(html)
    }).catch(next)
  })
}
