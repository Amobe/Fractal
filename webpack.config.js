var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: '/assets',
    filename: '[name].bundle.js'
  },
  entry: {
    app: [
      'babel-polyfill',
      './main.js'
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        loader: 'json',
        include: path.join(__dirname, 'node_modules', 'pixi.js'),
        test: /\.json$/
      },
      {
        loader: 'url-loader',
        test: /\.(png|jpg)$/,
        query: {
          limit: 10000
        }
      }
    ]
  }
}
