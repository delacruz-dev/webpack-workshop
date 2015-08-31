NOTE: Be sure to have Node.JS installed.

# Installation
To install it webpack globally, open a new terminal and type:
```
$ npm install webpack -g
```

# Exercise 1:
- Clone this repository
- Create a new file with some `Hello world` stuff in plain javascript syntax. For example:
```
console.log("hello, world!");
```
- Save the file as `entry.js`
- Run:
```
$ node entry.js
```
- Now let's create another file, but as a module:
```
module.exports = "bye, world!";
```
- Then, edit the `entry.js` file and import the newly created module as follows:
```
var bye = require('./second.js');

console.log(bye);
```
- Now that we have an entry point for our app and a module, we need to create a bundle to make it available for the browser. That's where webpack comes to help. Let's create our first bundle with:
```
$ webpack entry.js bundle.js
```
- You should see in your terminal the following output and a `bundle.js` file should have been created:
```
Version: webpack 1.11.0
Time: 60ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.42 kB       0  [emitted]  main
chunk    {0} bundle.js (main) 28 bytes [rendered]
    [0] ./tutorials/getting-started/setup-compilation/entry.js 28 bytes {0} [built]
```
- Let's try it in a browser. Create a html file and add a reference to the generated `bundle.js` file.
- Open it in a browser and enjoy your first hello world bundle with webpack!
- Commit your changes
