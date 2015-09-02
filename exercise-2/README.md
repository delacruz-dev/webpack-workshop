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
Webpack will read the file and look for the entry file specified, and then generate an output file with the resulting bundle.

## Add your first loader
You can configure special behavior when loading different file types using the require syntax. In order to do so, webpack uses the concept of *loaders*. We'll add a new loader for .css files.

- First, we need to install the following loaders:
```
$ npm install css-loader style-loader --save-dev
```

- Edit the `webpack.config.js`file and add the configuration settings for loading css:

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
require('./style.css');
```
- Generate the bundle again and open the html file in your browser. You should see your styles applied.

As you can see, the output file generates only a bundle.js with the css styles embedded. You may be ok with that, since the style is just a part of the behaviour (*blink*) but you may also want to bundle the styles separatedly. Let's do that in the next step:

- Install the Extract Text Plugin (https://github.com/webpack/extract-text-webpack-plugin):
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
## Apply code transformation
With webpack and Babel (https://babeljs.io/), you can safely write your code in ECMAScript 2015 and apply a transformation in bundle time. First of all, install babel:
```
$ npm install babel-loader --save-dev
```
Add the corresponding loader to your configuration file:
```javascript
{
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel'
}
```
Now you can transform your code to ES6 syntax or use React JSX, since Babel will transpile it to ES5. Change the files of the folder to ES6:
- *entry.js*
```javascript
import bye from './bye';
import './style.css';
import './style.scss';

document.write(bye);
```
- *bye.js*
```javascript
export default 'bye, world!';
```
