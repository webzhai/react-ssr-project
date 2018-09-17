const express = require('express');
const fs = require('fs')
const path = require('path')
const ReactSSR = require('react-dom/server')
const serverEntry=require('../dist/server-entry')
const app = express();
app.use('/public',express.static(path.join(__dirname, '../dist')))
app.get("*",function (req,res,next) {
  const contents = ReactSSR.renderToString(serverEntry.default);
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'),'utf-8');
  const newTemplate = template.replace('<!-- app -->',contents)
  res.send(newTemplate)
})
app.listen(3333,function () {
  console.log('server is listening port 3333')
})
