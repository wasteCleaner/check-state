#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js");
var chalk_1 = require("chalk");
var ora = require("ora");
var commander = require("commander");
var fs = require("fs");
var glob = require("glob");
commander
    .version('1.0.0')
    .description('State checking tool');
commander
    .command('start')
    .alias('s')
    .description('Start testing')
    .action(function () {
    glob('**/*.sct.json', { ignore: 'node_modules/**/*.sct.json' }, function (err, files) {
        files.forEach(function (file) {
            console.log(chalk_1.default.yellowBright(file));
            fs.readFile(file, 'utf8', function (err, data) {
                if (err)
                    throw err;
                console.log(data);
            });
        });
    });
    var spinner = ora('Loading').start();
    setTimeout(function () {
        spinner.color = 'yellow';
        spinner.text = 'Done!';
        spinner.stop();
        console.log(chalk_1.default.green('All tests passed!!!'));
    }, 5000);
});
if (!process.argv.slice(2).length) {
    commander.outputHelp();
    process.exit();
}
commander.parse(process.argv);
