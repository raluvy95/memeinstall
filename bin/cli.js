#!/usr/bin/env node
const tool = require("./tools")
const yargs = require("yargs");
const options = yargs
    .option("welcome", { describe: "Show welcome message and usage", type: "boolean" })
    .argv;

if (options.welcome) {
    tool.welcome()
} else {
    tool.install()
}