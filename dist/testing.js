"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var chalk_1 = require("chalk");
exports.runTests = function (tests, selectors) {
    var testCases = lodash_1.flattenDeep(tests);
    testCases.forEach(function (_a) {
        var action = _a.action, state = _a.state, selectorsResult = _a.selectorsResult;
        execute(selectors, selectorsResult, state, action);
    });
};
var execute = function (selectors, selectorsResult, state, action) {
    return Object.keys(selectors).forEach(function (selectorName) {
        var actualResult = selectors[selectorName](state);
        var expectedResult = selectorsResult[selectorName];
        lodash_1.isEqual(actualResult, expectedResult) ?
            console.log(chalk_1.default.green("Success: " + selectorName + ", action: " + action.type)) :
            console.log(chalk_1.default.red("Fail: " + selectorName + ", action: " + action.type + ", expected: " + JSON.stringify(expectedResult) + ", actual: " + JSON.stringify(actualResult), JSON.stringify(state, null, 2)));
    });
};
