import { Cursor, useCursor } from "../../ExternalStore";
import { inputSetValue, InputAppState, inputValue } from "./InputAppState";


type InputTypeAttribute =
	| "color"
	| "date"
	| "datetime-local"
	| "email"
	| "hidden"
	| "month"
	| "number"
	| "password"
	| "range"
	| "search"
	| "submit"
	| "tel"
	| "text"
	| "time"
	| "url"
	| "week"

export const Input = (props: {
	id?: string;
	type?: InputTypeAttribute,
	placeholder?: string;
	cursor: Cursor<InputAppState>;
}) => {
	const { cursor } = props;
	const state = useCursor(cursor);

	const value = inputValue(state);

	const onChange = (e: { target: { value: string } }) =>
		cursor.update((state) => inputSetValue(state, e.target.value)).push();

	return (
		<input className="form-control"
			id={props.id}
			value={value}
			onChange={onChange}
			type={props.type}
			placeholder={props.placeholder}
		/>
	)
};
