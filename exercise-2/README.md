# Exercise 2: Add a configuration file

Instead of typing commands in console or having a task file, webpack relies on a configuration file. Let's create our first one:

- Create a new file `webpack.config.js``
- Write the following configuration:
```
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    }
};
```
Now you can just run:
```
$ webpack
````

And the new bundle will be generated according to the configuration set in your file.

## Add your first loader
You can configure special behavior when loading different file types using the require syntax. In order to do so, webpack uses the concept of *loaders*. We'll add a new loader for .css files.
- Edit the `webpack.config.js`file and add a loader for css:
```
module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
```
