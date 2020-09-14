#!/usr/bin/env node
const fetch = require("node-fetch");
const { install } = require("./tools")

/**
 * Get a meme from an url
 * @param {number} count Count of memes to get per once
 * @param {{
 *    type: "json" | "text",
 *    url: string
 * }} options 
 */
module.exports.getMeme = (count = 10, options = {
    type: "json",
    url: null
}) => {
    return new Promise((res, rej) => {
        const json = options.type == "json"
        res(
            fetch(!options.url ? `https://meme-api.herokuapp.com/gimme/${count}` : options.url)
                .then(r => json ? r.json() : r.text())
                .then(r => {
                    return r
                }).catch(err => rej(err))
        )
    })
}
/**
 * Download memes to a directory
 * @param {string} dir Default to the current file's directory
 * @param {number} count Count of memes to download
 * @param {boolean} nogif Disable GIF memes (to prevent lots of MBs disk)
 */
module.exports.install = (dir = "./", count=10, nogif = false) => {
    return new Promise((res, rej) => {
        try {
            return res(install(dir, count, nogif))
        } catch (err) {
            return rej(err)
        }
    })
};