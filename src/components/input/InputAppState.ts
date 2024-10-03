export type InputAppState = string

export const inputAppStateInit: InputAppState = ""


export const inputValue = (state: InputAppState) => state;
export const inputValueOrUndefinedWhenEmpty = (state: InputAppState) => state.length > 0 ? state : undefined;

export const inputSetValue = (state: InputAppState, value: string): InputAppState => value;


