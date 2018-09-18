const path = require('path')
const axios = require('axios')
const proxy = require('http-proxy-middleware')
const MemoryFs = require('memory-fs')
const webpack = require('webpack')
const ejs = require('ejs')
const ReactSSR = require('react-dom/server')
const serverConfig = require('../../webpack/server/webpackDevConfig')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
    .then((res) => {
    resolve(res.data)
  })
    .catch(reject)
  })
}

const NativeModule = require('module')
const vm = require('vm')

// `(function(exports, require, module, __finename, __dirname){ ...bundle code })`
const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true,
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs //更改webpack默认硬盘写入为内存写入
let serverBundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats=stats.toJson();
  stats.errors.forEach((err)=>console.error(err))
  stats.warnings.forEach((warn)=>console.warn(warn))
  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath,'utf-8')
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})

module.exports = function (app) {
  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))

  app.get('*',function (req,res,next) {
    if(!serverBundle){
      res.send('waiting for compile , refresh later')
    }
    getTemplate().then((template) => {
     const content = ReactSSR.renderToString(serverBundle)
     const html = ejs.render(template,{appString:content})
     // res.send(template.replace('<!-- app -->',content))
     res.send(html)
    }).catch(next)
  })
}
