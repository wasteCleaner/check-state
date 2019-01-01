export type Action = {
    type: string,
    payload?: undefined,
};

export type State = Object | unknown;

export type SelectorsResult = { [index:string]: unknown };

export type TestCase = {
    action: Action,
    state: State,
    selectorsResult: SelectorsResult,
};

export type Tests = TestCase[];

export type Selectors =  { [index:string]: (state: State) => unknown };
