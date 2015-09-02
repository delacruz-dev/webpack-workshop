# Exercise 4: Deploy to production
We don't want to have the same configuration for development and production environments, so there are some changes we would like to do to improve our config file.

First of all, add webpack to the npm lifecycle by adding the following script in the package.config section:
```javascript
{
  ...
  "scripts": {
    "build": "webpack",
    ...
  },
  ...
}
```

Add some build specific configuration to make Webpack pick up your JS* files:

```javascript
...

if(TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: path.resolve(ROOT_PATH, 'app')
        }
      ]
    }
  });
}
```
After this changes, `npm run build` should return the following output:
```
> TARGET=build webpack

Hash: bd3b549c6c712233167f
Version: webpack 1.10.1
Time: 4903ms
        Asset       Size  Chunks             Chunk Names
    bundle.js    1.09 MB       0  [emitted]  main
bundle.js.map    1.28 MB       0  [emitted]  main
   index.html  184 bytes          [emitted]
    + 345 hidden modules
```
That's quite a lot for a production bundle, so we'll have to minify it somehow. Let's apply the following configuration:
```
if(TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map',
    module: {
      ...
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}
```
Uglify Plugin will convert our code into a smaller format without losing any meaning. Running `npm run build` again should output the following result:
```
> TARGET=build webpack

Hash: d3508663532b5b3565cc
Version: webpack 1.10.1
Time: 12221ms
        Asset       Size  Chunks             Chunk Names
    bundle.js     324 kB       0  [emitted]  main
bundle.js.map    2.66 MB       0  [emitted]  main
   index.html  184 bytes          [emitted]
    + 345 hidden modules
```
It takes longer, but as you can see, the size is considerably smaller.

If we are using React.JS, we can still optimize the bundle size a little bit more. React relies on `process.env.NODE_ENV` based optimizations. If we set it to `production`, React will get built in an optimized manner. In webpack, we can add the following snippet to the `plugins` section:
```javascript
if(TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map',
    module: {
      ...
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      ...
    ]
  });
}
```
Hit `npm run build` once more to se an even more reduced bundle file size for your app:
```
> TARGET=build webpack

Hash: 37ebe639517bfeb72ff6
Version: webpack 1.10.1
Time: 10930ms
        Asset       Size  Chunks             Chunk Names
    bundle.js     264 kB       0  [emitted]  main
bundle.js.map    2.53 MB       0  [emitted]  main
   index.html  184 bytes          [emitted]
    + 339 hidden modules
```
We can still improve even more our bundles by splitting our app and vendor scripts. This way allows us to benefit from client caching. In Webpack, it is done by expanding the `entry` configuration.
```javascript
...

var pkg = require('./package.json');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);

...

if(TARGET === 'build') {
  module.exports = merge(common, {
    entry: {
      app: path.resolve(ROOT_PATH, 'app/main.jsx'),
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: path.resolve(ROOT_PATH, 'build'),
      filename: 'app.[chunkhash].js'
    },
    devtool: 'source-map',
    module: {
      ...
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin(
        'vendor',
        'vendor.[chunkhash].js'
      ),
      ...
    ]
  });
}
```
This will take the modules under the `dependencies` section in your `package.json` and bundle them separatedly from your app scripts. If you run `npm run build` again, you should see an even smaller app bundle size:
```
> TARGET=build webpack

Hash: 1671be044a8a34b58fa8
Version: webpack 1.10.1
Time: 11983ms
                             Asset       Size  Chunks             Chunk Names
       app.cfd412c37a844a41daf8.js    57.8 kB       0  [emitted]  app
    vendor.edaf1006b1f4b71898f9.js     208 kB       1  [emitted]  vendor
   app.cfd412c37a844a41daf8.js.map     415 kB       0  [emitted]  app
vendor.edaf1006b1f4b71898f9.js.map    2.12 MB       1  [emitted]  vendor
                        index.html  266 bytes          [emitted]
   [0] multi vendor 64 bytes {1} [built]
    + 339 hidden modules
```
