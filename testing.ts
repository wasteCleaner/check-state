import {
    SelectorsGroup,
    TestsSets,
} from "./types";





export const runTests = async (tests: TestsSets, selectors: SelectorsGroup[]) => {
    tests.forEach((test) => {
        console.log(test);
    });
};