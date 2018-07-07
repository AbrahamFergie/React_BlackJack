const path = require('path')
const webpack = require('webpack')

var config = {
  devtool: 'source-map',
  entry: path.join(__dirname, 'client/app.jsx'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: 'client/public/index.html',
  //     inject: 'body',
  //     filename: 'index.html'
  //   }),
  //   new webpack.optimize.OccurenceOrderPlugin(),
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin(),
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': JSON.stringify('development')
  //   })
  // ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        'presets': ['react', 'es2015', 'stage-0']
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }]
  }
}
if(process.env.NODE_ENV === 'production'){
  config.devtool = false
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      },
      comments: false
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ]
}

module.exports = config
