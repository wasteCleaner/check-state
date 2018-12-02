import * as glob from "glob";
import chalk from "chalk";
import * as webpack from "webpack";
import * as path from "path";

import { SelectorsGroup } from "./types";

export const prepareSelectors = async () => {
    const configurationFiles = await getConfigurationFiles();
    if (configurationFiles.length === 0) {
        return console.log(chalk.red('Configuration files not found'));
    }

    await Promise.all(configurationFiles.map((config) => buildTemporaryActions(config)));

    const compiledActions = await getCompiledConfigurations();
    if (compiledActions.length === 0) {
        return console.log(chalk.red('Compiled configuration files not found'));
    }

    return compiledActions.map((action) => require(action) as SelectorsGroup);
};

const getConfigurationFiles = () => {
    return new Promise<string[]>((resolve, reject) => {
        glob(
            '**/checkState.config.js',
            { ignore: 'node_modules/**/checkState.config.js', realpath: true },
            (err, files) => {
                if (err) reject(err);
                resolve(files);
            });
    });
};

const buildTemporaryActions = async (configurationFile: string) => {
    console.log(chalk.green(`Configuration in progress: ${configurationFile}`));
    return await webpack({
        context: path.resolve(__dirname),
        entry: configurationFile,
        output: {
            path: configurationFile.replace('checkState.config.js', ''),
            filename: 'tmp.checkState.config.js',
            libraryTarget: 'umd',
            library: 'lib',
            umdNamedDefine: true,
            globalObject: 'this'
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader'
                }
            ]
        },
    });
};

const getCompiledConfigurations = () => {
    return new Promise<string[]>((resolve, reject) => {
        glob(
            '**/tmp.checkState.config.js',
            { ignore: 'node_modules/**/tmp.checkState.config.js', realpath: true },
            (err, files) => {
                if (err) reject(err);
                resolve(files);
            })
    });
};
