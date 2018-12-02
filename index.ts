#!/usr/bin/env node

import 'core-js';
import chalk from 'chalk';
import * as ora from 'ora';
import * as commander from 'commander';
import { prepareTestCases } from "./testCases";
import { prepareSelectors } from "./selectors";
import { runTests } from "./testing";

commander
    .version('1.0.0')
    .description('State checking tool');

commander
    .command('start')
    .alias('s')
    .description('Start testing')
    .action(async () => {
        const spinnerTestCases = ora('Preparing test cases \n').start();
        const testCases = await prepareTestCases();
        spinnerTestCases.stop();

        const spinnerConfiguration = ora('Preparing configuration files \n').start();
        const selectors = await prepareSelectors();
        spinnerConfiguration.stop();

        if (testCases && selectors) {
            await runTests(testCases, selectors);
        }
    });

if (!process.argv.slice(2).length) {
    commander.outputHelp();
    process.exit();
}

commander.parse(process.argv);