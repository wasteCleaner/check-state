import * as glob from "glob";
import chalk from "chalk";
import * as fs from "fs";

import { Tests } from "./types";

export const prepareTestCases = async (): Promise<Tests | void> => {
    try {
        const testFiles = await getTestFiles();
        const testCases = await readCases(testFiles);
        return JSON.parse(testCases);
    } catch (errors) {
        console.log(chalk.red(`Error: ${errors}`));
    }
};

const getTestFiles = (): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        glob(
            "**/*.checkState.json",
            { ignore: "node_modules/**/*.checkState.json" },
            (err, files) => {
                if (err) {
                    reject(err);
                }

                files && files.length ? resolve(files[0]) : reject();
            });
    });
};

const readCases = (testFile: string): Promise<string> => {
    console.log(chalk.green(`In progress: ${testFile}`));
    return new Promise<string>((resolve, reject) => {
        fs.readFile(testFile, "utf8", (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};