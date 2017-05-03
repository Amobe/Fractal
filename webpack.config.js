var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    'babel-polyfill',
    './src/main',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
    publicPath: '/',
    filename: 'main.js'
  },
  module: {
    loaders: [{
        loader: "babel-loader",
        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "src"),
        ],
        // Only run `.js` file through Babel
        test: /\.js$/,
        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0'],
        }
      },
      {
        loader: 'json',
        test: /\.json$/
      },
    ],
    rules: [{
      enforce: 'post',
      loader: 'transform-loader/cacheable?brfs',
      include: path.resolve(__dirname, 'node_modules/pixi.js')
    }]
  },
  devServer: {
    contentBase: './src'
  }
}