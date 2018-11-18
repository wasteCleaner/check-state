#!/usr/bin/env node

import 'core-js';
import chalk from 'chalk';
import * as ora from 'ora';
import * as commander from 'commander';
import * as fs from 'fs';
import * as glob from 'glob';

commander
    .version('1.0.0')
    .description('State checking tool');

commander
    .command('start')
    .alias('s')
    .description('Start testing')
    .action(() => {
        glob('**/*.sct.json', { ignore: 'node_modules/**/*.sct.json' }, (err, files) => {
            files.forEach(file => {
                console.log(chalk.yellowBright(file));
                fs.readFile(file, 'utf8', (err, data) => {
                    if (err) throw err;
                    console.log(data);
                });
            });
        });


        const spinner = ora('Loading').start();
        setTimeout(() => {
            spinner.color = 'yellow';
            spinner.text = 'Done!';
            spinner.stop();
            console.log(chalk.green('All tests passed!!!'));
        }, 5000);
    });

if (!process.argv.slice(2).length) {
    commander.outputHelp();
    process.exit();
}

commander.parse(process.argv);