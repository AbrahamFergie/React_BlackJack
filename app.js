const express = require('express')
const path = require('path')
const logger = require('morgan')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const http = require('http')

const webpack = require('webpack')
const config = require('./webpack.config')
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

if(process.env.NODE_ENV === 'development ') {
  console.log('------------------------------------');
  console.log("here");
  console.log('------------------------------------');
  const compiler = webpack(config)
  const webpackMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    }
  })
  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
}
// app.use(express.static('component'))
app.use(express.static(path.join(__dirname, 'client')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', function(request, response){
  response.sendFile(path.resolve(__dirname + '/public', 'index.html'))
})
app.set(port)
server.listen(port)
