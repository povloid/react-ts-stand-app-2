export namespace input {
  interface State {
    value: string;
  }

  export const value = (state: State) => state.value;

  export const setValue = (state: State, value: string): State => ({
    ...state,
    value,
  });
}
