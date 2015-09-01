var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  context: __dirname,
  entry: path.resolve(ROOT_PATH, 'src/entry'),
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    pulicPath: 'assets/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  plugins: [new HtmlwebpackPlugin({
      title: 'Exercise 4'
    })
  ]
};