export interface InputState {
  value: string;
}

export const inputInitState: InputState = {
  value: "",
};

export const inputValue = (state: InputState) => state.value;

export const inputSetValue = (
  state: InputState,
  value: string,
): InputState => ({
  ...state,
  value,
});
