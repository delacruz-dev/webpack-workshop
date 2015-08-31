NOTE: Be sure to have Node.JS installed.

# Installation
To install it webpack globally, open a new terminal and type:
```
$ npm install webpack -g
```
# Exercise 1.1:
- Clone this repository
- Create a new file with some `Hello world` stuff in plain javascript syntax
- Save it as `entry.js`
- Run:

```
$ webpack ./entry.js bundle.js
```
- It should create a `bundle.js` file showing an output in the screen similar to this:
```
Version: webpack 1.11.0
Time: 60ms
    Asset     Size  Chunks             Chunk Names
bundle.js  1.42 kB       0  [emitted]  main
chunk    {0} bundle.js (main) 28 bytes [rendered]
    [0] ./tutorials/getting-started/setup-compilation/entry.js 28 bytes {0} [built]
```
- Create a html file and add a reference to the generated `bundle.js` file.
- Open it in a browser and enjoy your first hello world bundle with webpack!
- Commit your changes

# Exercise 1.2:
- Add another file, with different random text. For example: "Bye, World!". But in this case, export it as a module:
```
export default "Bye, World!"
```
- Save it as `second.js`
- Open the entry.file and import the second.js module. Then, write it:
```
import bye from 'second';

document.write(bye);
```
- Run the webpack command again:
```
$ webpack ./entry.js bundle.js
```
