#!/usr/bin/env node
const fetch = require("node-fetch");
const installer = require("./cli.js");
module.exports.getMeme = (count=10) => {
    return new Promise((res, rej) => {
        res(
            fetch(`https://meme-api.herokuapp.com/gimme/${count}`)
            .then(r => r.json())
            .then(r => {
                return r
            }).catch(err => rej(err))
        )
    })
}
module.exports.install = (dir="./", nogif=false) => {
    return new Promise((res, rej) => {
        try {
            res(installer(dir, nogif))
        } catch(err) {
            rej(err)
        }
    })
};