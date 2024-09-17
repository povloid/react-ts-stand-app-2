import { Fragment } from "react/jsx-runtime";
import { Cursor, useCursor } from "../../ExternalStore"
import { SwitchAppState, switchIsChecked, switchToggele } from "./SwitchAppState"


export interface SwitchProps {
    id?: string;
    cursor: Cursor<SwitchAppState>,
    disabled?: boolean
}

export const Switch = ({ id, cursor, disabled }: SwitchProps
) => {
    const state = useCursor(cursor)
    return (
        <input id={id}
            className="form-check-input" type="checkbox"
            checked={switchIsChecked(state)} disabled={disabled}
            onChange={() => cursor.update(switchToggele).push()} />
    )
}

export interface SwitchComponentWithLabelProps extends SwitchProps {
    yes?: string
    no?: string
}

export const SwitchWithLabel = (props: SwitchComponentWithLabelProps) => {

    const state = useCursor(props.cursor)
    const checked = switchIsChecked(state)

    return (
        <Fragment>
            <Switch id={props.id} cursor={props.cursor} disabled={props.disabled} />
            <label className="form-check-label" htmlFor={props.id}>{(checked ? (props.yes || "да") : (props.no || "нет"))}</label>
        </Fragment>
    )
}