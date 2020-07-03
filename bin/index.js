#!/usr/bin/env node

const c = require("chalk");
const yargs = require("yargs");
const f = require("figlet");
const fs = require("fs");
const fetch = require("node-fetch");
const imgd = require("image-downloader");
const options = yargs
    .option("c", {alias: "count", describe: "Count of memes to generate", type: "number", demandOption: false})
    .option("directory", {describe: "A name folder where should write.", type: "string", demandOption: false})
    .option("no-gif", {describe: "Download non-GIF images only", type:"boolean"})
    .argv;
if(!options.directory) {
    f("Meme Installer", (err, result) => {
        if(err) throw err;
        console.log(c.blue(result));
    });
    console.log(c.yellowBright("Welcome to the Meme Installer! A CLI for downloading memes as images to a specific directory!"));
    console.log(c.yellowBright("Use"), c.blueBright("memeinstall --directory=folder"), c.yellowBright("to generate memes and download in a folder!"));
    console.log(c.yellowBright("Replace"), c.blueBright("folder"), c.yellowBright("with a folder name you want to download!"), "\n", 
    c.yellowBright("For example:"), c.cyanBright("memeinstall -c 25 --directory=memes"));
    console.log("");
    console.log("By default, Meme Installer will generate 10 memes. To improve more memes up to 50, use", c.yellowBright("memeinstall -c 50 --directory=folder"));
} 

 else {
    function download(directory, url) {
        imgd.image({url: url,dest: directory}).then(({filename}) => {
            console.log(c.greenBright("[INFO] -"), `${filename} downloaded!`);
        }).catch(e => {return console.error(c.redBright("[ERROR] -"), `Can't download because of an error: ${e}`);});
    };
    try {
        const directory = fs.readdirSync(options.directory);
        console.log(c.yellowBright(`Getting memes from URL...`));
        fetch(`https://meme-api.herokuapp.com/gimme/${options.c || 10}`).then(m => m.json()).then(m => {
            console.log(c.yellowBright(`Downloading ${!m.count ? 1 : m.count} meme${!m.count ? '' : m.count > 1 ? 's' : ''}...`));
            const memes = m.count ? m.memes : m;
            if(memes instanceof Array) {
                for(const meme of memes) {
                    const filememe = meme.url.split(".");
                    if((typeof options.gif != "undefined" && !options.gif) && filememe[filememe.length - 1] == "gif") {
                        console.log(c.cyanBright("[SKIPPED] -"), "Skipped because the file is a GIF and it's not allowed by an option \"--no-gif\"");
                        continue;
                    } else {
                        download(options.directory, meme.url);
                    }
                }
            } else {
                download(options.directory, memes.url);
            } 
        }).catch(e => {
            return console.error(c.redBright("[ERROR] -"), `Can't get an URL because of an error: ${e}`);
        });
    } catch {
        console.log(c.redBright("I cannot find that folder. Please try again"));
    
    }
} 