# Add a configuration file

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
