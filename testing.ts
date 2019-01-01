import {
    flattenDeep,
    isEqual,
} from "lodash";
import chalk from "chalk";
import {
    Selectors,
    SelectorsResult,
    Tests,
    State,
    Action,
} from "./types";

export const runTests = (tests: Tests, selectors: Selectors): void => {
    const testCases = flattenDeep(tests) as Tests;
    testCases.forEach(({ action, state, selectorsResult }) => {
        execute(selectors, selectorsResult, state, action);
    });
};

const execute = (selectors: Selectors, selectorsResult: SelectorsResult, state: State, action: Action): void =>
    Object.keys(selectors).forEach(selectorName => {
        const actualResult = selectors[selectorName](state);
        const expectedResult = selectorsResult[selectorName];
        isEqual(actualResult, expectedResult) ?
            console.log(chalk.green(`Success: ${selectorName}, action: ${action.type}`)) :
            console.log(chalk.red(`Fail: ${selectorName}, action: ${action.type}, expected: ${JSON.stringify(expectedResult)}, actual: ${JSON.stringify(actualResult)}`,
                JSON.stringify(state, null, 2)));
    });