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
## Parameters  
`-c <count>` | Count of memes to download. The default is 10 and the max almont of memes is 50<br>
`--directory=<folder name>` | Which folder do you want to download.<br><br>
Leave empty parameters will return with welcome message
# Examples
Without parameters will send a welcome message
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
# Requirements
Node.js >= 10.0.0<br>
Have at least 15 or more MB disk stoarge for 50 memes