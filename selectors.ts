import * as glob from "glob";
import chalk from "chalk";
import * as webpack from "webpack";
import * as path from "path";
import * as fs from "fs";

import { Selectors } from "./types";

export const prepareSelectors = async (): Promise<Selectors | void> => {
    try {
        const configurationFile = await getConfigurationFiles();
        await buildTemporarySelectors(configurationFile);
        const compiledSelectors = await getCompiledSelectors();
        return require(compiledSelectors);
    } catch (errors) {
        console.log(chalk.red(`Error: ${errors}`));
    }
};

const getConfigurationFiles = (): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        glob(
            "**/checkState.config.js",
            { ignore: "node_modules/**/checkState.config.js", realpath: true },
            (err, files) => {
                if (err) {
                    reject(err);
                }
                files && files.length ? resolve(files[0]) : reject();
            });
    });
};

const buildTemporarySelectors = (configurationFile: string): Promise<void> => {
    console.log(chalk.green(`Configuration in progress: ${configurationFile}`));
    return new Promise((resolve, reject) => {
        webpack({
            context: path.resolve(__dirname),
            entry: configurationFile,
            output: {
                path: configurationFile.replace("checkState.config.js", ""),
                filename: "tmp.checkState.config.js",
                libraryTarget: "umd",
                library: "lib",
                umdNamedDefine: true,
                globalObject: "this",
            },
            resolve: {
                extensions: [".ts", ".tsx", ".js", ".jsx"],
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: "ts-loader",
                        options: {
                            compilerOptions: {
                                noEmit: false,
                            }
                        }
                    },
                ]
            },
        }, () => {
            resolve();
        });
    });
};

export const removeTemporarySelectors = async (): Promise<void> => {
    const compiledSelectors = await getCompiledSelectors();
    await removeFile(compiledSelectors);
};

const removeFile = (path: string) => {
    return new Promise<void>((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    });
};

const getCompiledSelectors = (): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        glob(
            "**/tmp.checkState.config.js",
            { ignore: "node_modules/**/tmp.checkState.config.js", realpath: true },
            (err, files) => {
                if (err) {
                    reject(err);
                }
                files && files.length ? resolve(files[0]) : reject();
            })
    });
};
