const express = require('express')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const ReactSSR = require('react-dom/server')
const app = express()
const isDev = process.env.NODE_ENV === 'development'

// 处理浏览器发起的favicon请求
app.use(favicon(path.join(__dirname, '../favicon.ico')))

// 生产环境
if (!isDev) {
  const serverEntry = require('../dist/server-entry')
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', function (req, res, next) {
    const contents = ReactSSR.renderToString(serverEntry.default)
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
    const newTemplate = template.replace('<!-- app -->', contents)
    res.send(newTemplate)
  })
} else {
  // 开发环境在内存进行热更新
  const devStatic = require('./utils/dev-static')
  devStatic(app)
}
app.listen(3333, function () {
  console.log('server is listening port 3333')
})
