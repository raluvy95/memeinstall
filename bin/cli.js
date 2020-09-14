#!/usr/bin/env node

const c = require("chalk");
const yargs = require("yargs");
const f = require("figlet");
const fs = require("fs");
const fetch = require("node-fetch");
const imgd = require("image-downloader");
const options = yargs
    .option("c", { alias: "count", describe: "Count of memes to generate", type: "number", demandOption: false, default: 25 })
    .option("directory", { alias: "dir", describe: "A name folder where should write.", type: "string", demandOption: false, default: "./" })
    .option("no-gif", { describe: "Download non-GIF images only", type: "boolean", default: false })
    .option("debug", { describe: "Enable debug mode", type: "boolean", default: false })
    .argv;
function welcome() {
    f("Meme Installer", (err, result) => {
        if (err) throw err;
        console.log(c.blue(result));
    });
    console.log(c.yellowBright("Welcome to the Meme Installer! A CLI for downloading memes as images to a specific directory!"));
    console.log(c.yellowBright("Use"), c.blueBright("memeinstall --directory=folder"), c.yellowBright("to generate memes and download in a folder!"));
    console.log(c.yellowBright("Replace"), c.blueBright("folder"), c.yellowBright("with a folder name you want to download!"), "\n",
        c.yellowBright("For example:"), c.cyanBright("memeinstall -c 25 --directory=memes"));
    console.log("");
    console.log("By default, Meme Installer will generate 10 memes. To improve more memes up to 50, use", c.yellowBright("memeinstall -c 50 --directory=folder"));
}
function debug(info) {
    if (options.debug) {
        return info
    }
}
function install(dir = options.directory || "./", nogif = options["no-gif"] || false) {
    function download(directory, url) {
        imgd.image({ url: url, dest: directory }).then(({ filename }) => {
            debug(console.log(c.greenBright("[INFO] -"), `${filename} downloaded!`));
        }).catch(e => { return debug(console.error(c.redBright("[ERROR] -"), `Can't download because of an error: ${e}`)); });
    };
    try {
        fs.readdirSync(dir);
    } catch {
        debug(console.log(c.redBright("I cannot find that folder. Please try again")));
        throw new Error(`I cannot find that folder "${dir}". Please try again`)
    }
    debug(console.log(c.yellowBright(`Getting memes from URL...`)));
    fetch(`https://meme-api.herokuapp.com/gimme/${options.c || 10}`).then(m => m.json()).then(m => {
        debug(console.log(c.yellowBright(`Downloading ${!m.count ? 1 : m.count} meme${!m.count ? '' : m.count > 1 ? 's' : ''}...`)));
        const memes = m.count ? m.memes : m;
        if (memes instanceof Array) {
            for (const meme of memes) {
                const filememe = meme.url.split(".");
                if ((typeof nogif != "undefined" && !nogif) && filememe[filememe.length - 1] == "gif") {
                    debug(console.log(c.cyanBright("[SKIPPED] -"), "Skipped because the file is a GIF and it's not allowed by an option \"--no-gif\""));
                    continue;
                } else {
                    download(directory, meme.url);
                }
            }
        } else {
            download(dir, memes.url);
        }
    }).catch(e => {
        return debug(console.error(c.redBright("[ERROR] -"), `Can't get an URL because of an error: ${e}`));
    });
}
if (!dir) {
    welcome()
} else {
    install()
}
module.exports = install