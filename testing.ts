import {
    flattenDeep,
    isEqual,
    isArray,
    isObjectLike,
} from "lodash";
import chalk from "chalk";
import {
    SelectorsGroup,
    TestsSets,
    TestCase,
    State,
    Action,
} from "./types";

export const runTests = async (tests: TestsSets, selectors: SelectorsGroup[]) => {
    const testCases = flattenDeep(tests) as TestCase[];
    let allSelectors = {};
    selectors.forEach(selectorsGroup => {
        allSelectors = Object.assign(allSelectors, selectorsGroup);
    });

    testCases.forEach(({ action, state, selectorsResult }) => {
        execute(allSelectors, selectorsResult, state, action, []);
    });
};

const execute = (selectores: any, selectorsResult: any, state: State, action: Action, path: string[]) => {
    if (typeof selectores === "function") {
        isEqual(selectores(state), selectorsResult) ?
            console.log(chalk.green(`Success: ${path.join('/')}, action: ${action.type}`)) :
            console.log(chalk.red(`Fail: ${path.join('/')}, action: ${action.type}, expected: ${selectorsResult}, actual: ${selectores(state)}`,
                JSON.stringify(state, null, 2)));
    }

    if (isArray(selectores)) {
        selectores.forEach((selector, i) => {
            execute(selector, selectorsResult[i], state, action, [...path, `${i}`]);
        });
    }

    if (isObjectLike(selectores) && !isArray(selectores)) {
        Object.keys(selectores).forEach(selectorName => {
            execute(selectores[selectorName], selectorsResult[selectorName], state, action, [...path, selectorName]);
        });
    }
};