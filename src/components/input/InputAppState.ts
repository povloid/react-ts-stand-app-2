export type InputAppState = string

export const inputAppStateInit: InputAppState = ""


export const inputValue = (state: InputAppState) => state;

export const inputSetValue = (state: InputAppState, value: string): InputAppState => value;


