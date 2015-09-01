# Exercise 2: Add a configuration file

Instead of typing commands in console or having a task file, webpack relies on a configuration file. Let's create our first one:

- Create a new file `webpack.config.js`
- Write the following configuration:

```javascript
module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    }
};
```
Now you can just run:
```
$ webpack
```

And the new bundle will be generated according to the configuration set in your file.

## Add your first loader
You can configure special behavior when loading different file types using the require syntax. In order to do so, webpack uses the concept of *loaders*. We'll add a new loader for .css files.

- First, we need to install the following loaders:
```
$ npm install css-loader style-loader --save-dev
```

- Edit the `webpack.config.js` file and add the configuration settings for loading css:

```javascript
module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' }
        ]
    }
};
```

- Add a new `style.css` file and apply some random styles to the html document.
- Edit the `entry.js` file and import your style.css file:
```
require('style.css');
```
- Generate the bundle again:
```
$ webpack
```
- Open the html file in your browser. You should see your styles applied.

As you can see, the output file generates only a bundle.js with the css styles embedded. You may be ok with that, since the style is just a part of the behaviour (*blink*) but you may also want to bundle the styles separatedly. Let's do that in the next step:
- Install the Extract Text Plugin:
```
$ npm install --save-dev extract-text-webpack-plugin
```
- Change your `webpack.config.js` file to add the newly installed plugin module and its configuration:

```javascript
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './entry.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ]
};
```

- Don't forget to add the reference to the new bundle.css file in your html:
```
  <link href="./bundle.css" media="all" rel="stylesheet" type="text/css">
```

Do you want to use SASS or another compile-to-css language? no problem, you just need to install the appropiate loader. For example, for SASS:
```
$ npm i --save-dev sass-loader
```
And add the following loader to the config file:

```javascript
{
    test: /\.scss$/,
    loader: 'style!css!sass'
}
```

Or, to extract it to a separate file with the rest of the style files:

```javascript
{
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
}
```

- Next, create a .scss file with some new styles and require it in the `entry.js` file:
```
require('./style.scss');
```
TODO: INCLUDE, EXCLUDE IN LOADER

