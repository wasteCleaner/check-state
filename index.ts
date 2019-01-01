#!/usr/bin/env node

import "core-js";
import * as ora from "ora";
import * as commander from "commander";
import chalk from "chalk";
import { prepareTestCases } from "./testCases";
import {
    prepareSelectors,
    removeTemporarySelectors,
} from "./selectors";
import { runTests } from "./testing";

commander
    .version("1.0.2")
    .description("State checking tool");

commander
    .command("start")
    .alias("s")
    .description("Start testing")
    .action(async () => {
        try {
            const spinnerTestCases = ora("Preparing test cases \n").start();
            const testCases = await prepareTestCases();
            spinnerTestCases.stop();

            const spinnerConfiguration = ora("Preparing configuration files \n").start();
            const selectors = await prepareSelectors();
            spinnerConfiguration.stop();

            if (testCases && selectors) {
                runTests(testCases, selectors);
            }

            await removeTemporarySelectors();
        } catch (error) {
            console.log(chalk.red(`Error: ${error}`));
        }

    });

if (!process.argv.slice(2).length) {
    commander.outputHelp();
    process.exit();
}

commander.parse(process.argv);