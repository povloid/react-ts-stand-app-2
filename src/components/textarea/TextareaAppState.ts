export type TextareaAppState = string

export const textareaAppStateInit: TextareaAppState = ""

export const textareaValue = (state: TextareaAppState) => state;

export const textareaSetValue = (state: TextareaAppState, value: string): TextareaAppState => value;


