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
  plugins: [new HtmlwebpackPlugin({
      title: 'Exercise 4'
    })
  ]
};