import { ExternalStoreCursor, useExternalStoreCursor } from "../../ExternalStore";
import { inputSetValue, InputState, inputValue } from "./InputState";

export const InputComponent = <S,>(props: {
  cursor: ExternalStoreCursor<S, InputState>;
}) => {
  const { cursor } = props;
  const state = useExternalStoreCursor(cursor);

  const value = inputValue(state);

  const onChange = (e: { target: { value: string } }) =>
    cursor.update((state) => inputSetValue(state, e.target.value)).emitChange();

  return <input className="form-control" value={value} onChange={onChange} />;
};
