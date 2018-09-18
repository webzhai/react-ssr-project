const express = require('express');
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const ReactSSR = require('react-dom/server')
const app = express()
const isDev = process.env.NODE_ENV === 'development'

app.use(favicon(path.join(__dirname, '../favicon.ico')))
if(!isDev){
  const serverEntry=require('../dist/server-entry')
  app.use('/public',express.static(path.join(__dirname, '../dist')))
  app.get("*",function (req,res,next) {
    const contents = ReactSSR.renderToString(serverEntry.default);
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'),'utf-8');
    const newTemplate = template.replace('<!-- app -->',contents)
    res.send(newTemplate)
  })
}else{
  const devStatic=require('./utils/dev-static')
  devStatic(app)
}
app.listen(3333,function () {
  console.log('server is listening port 3333')
})
