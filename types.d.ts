export type Action = {
    type: string,
    payload?: any,
};

export type State = Object | any[] | any;

export type SelectorsResult = any[];

export type TestCase = {
    action: Action,
    state: State,
    selectorsResult: SelectorsResult,
};

export type Tests = TestCase[];

export type TestsSets = Tests[];

export type Selectors =  { [index:string]: (state: State) => any };

export type SelectorsGroup =  { [index:string]: Selectors };