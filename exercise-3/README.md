# Exercise 3: Improve the development experience

You may have noticed that the developer experience (#DX) until now has not been awesome enough. Let's try to improve it with some arrangements to your environment. 

First of all, you'll feel more confortable with a local dev server to serve your bundle files, and to generate automatically a new bundle after every change in the source files... don't you? Go for it:
- First of all, install the packages needed. Type in your terminal:
```
npm install
```
- Install `webpack-dev-server` globally:
```
$ npm install webpack-dev-server -g
```
Then, start it with:
```
$ webpack-dev-server --progress --colors
```
Webpack dev server is very similar to other tools like *LiveReload* or *Browsersync*. Altough webpack CLI has a `--watch` modifier to watch for changes in files, webpack dev server giver you more possibilities, like Hot Module Replacement. It also prevents webpack from emitting the resulting files to disk. Instead it keeps and serves the resulting files from memory, which is way faster.

It's a good idea to configure webpack dev server as a script in your `package.json` file:

```
...
"scripts": {
  "start": "webpack-dev-server"
},
...
```

And let the `webpack.config.js` file for setting the configuration:
```
...
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  entry: {
    app: [
      "webpack/hot/dev-server",
      path.resolve(ROOT_PATH, 'src/entry')
    ]
  },
  ...
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: ,
    port: 4000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    ...
  ]
};
```
You can now run in your terminal:
```
$ npm start
```
And when the server starts, navigate to [http://localhost:4000/] to see the results.
