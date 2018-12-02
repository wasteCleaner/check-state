import * as glob from 'glob';
import chalk from "chalk";
import * as fs from "fs";

import { Tests } from "./types";

export const prepareTestCases = async () => {
    try {
        const testFiles = await getTestCases();
        if (testFiles.length === 0) {
            console.log(chalk.red('Check state files not found'));
        }

        return Promise.all(testFiles.map((file) => readCase(file)))
            .then(testsCases => testsCases.map(testCase => JSON.parse(testCase) as Tests));
    } catch (e) {
        console.log(chalk.red(`Error: ${e}`));
    }
};

const getTestCases = () => {
    return new Promise<string[]>((resolve, reject) => {
        glob(
            '**/*.checkState.json',
            { ignore: 'node_modules/**/*.checkState.json' },
            (err, files) => {
                if (err) reject(err);
                resolve(files);
            });
    });
};

const readCase = (testFile: string) => {
    console.log(chalk.green(`In progress: ${testFile}`));
    return new Promise<string>((resolve, reject) => {
        fs.readFile(testFile, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};