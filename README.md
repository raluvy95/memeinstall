# Meme Installer
A CLI module for downloading memes as images to a specific directory
```
memeinstall [-c <count>] --directory=<folder name>
```
# Installation
The module can be install via [npm](https://www.npmjs.com/package/@therealraluvy/memeinstall)
```
npm i -g @therealraluvy/memeinstall
```
If you want to use this for script-only, you can remove the option `-g`. You can check it out in [Script tag](#Script)
```
npm i @therealraluvy/memeinstall
```
# Options
`-c <count>` | Count of memes to download. The default is 10 and the max almont of memes is 50<br>
`--no-gif=<boolean>` | Refuse to download GIF meme. Default is false.<br>
`--directory=<folder name>` | Which folder do you want to download. The default is the current directory.<br>
`--debug` | Enable debug mode. Default is false
# Examples
Without options will install memes in current directory
```
memeinstall
```
This will install 10 memes to a folder called memes
```
memeinstall --directory=memes
```
This will install 50 memes to a folder called memes
```
memeinstall -c 50 --directory=memes
```
# Script
Script support is added in `v1.3.0`. It is similar to CLI, works on Node.js. TypeScript is not supported, but hopefuly will support later<br>
Here's quick example
```js
const memeinstall = require("@therealraluvy/memeinstall")
memeinstall.install()
```
Advanced example
```js
memeinstall.install("memes", 50, true)
    .then(() => {
        console.log("Finished downloading!")
    })
    .catch(err => console.error(err))
```
It's possible to get a meme without downloading using `getMeme`
```js
memeinstall.getMeme(25)
    .then(json => console.log(json))
```

# Requirements
Node.js >= 10.0.0<br>
Have at least 15 or more MB disk stoarge for 50 memes

# Change Log
### v1.3.0
Fixed `--no-gif` ignoring the check if the file is added
Added Script category

### v1.1.0
Added an optional `--no-gif`. Useful when you want to get memes without GIF.

### v1.0.0-1.0.4
Published to NPM. Nothing changes