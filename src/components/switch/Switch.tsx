import { ReactNode } from "react";
import { Cursor, useCursor } from "../../ExternalStore";
import { SwitchAppState, switchIsChecked, switchToggele } from "./SwitchAppState";


export interface SwitchProps {
    id?: string;
    cursor: Cursor<SwitchAppState>,
    disabled?: boolean;
    children?: ReactNode;
}

export const Switch = ({ id, cursor, disabled, children }: SwitchProps
) => {
    const state = useCursor(cursor)
    return (
        <div className="form-check form-switch">
            <input id={id}
                className="form-check-input" type="checkbox"
                checked={switchIsChecked(state)} disabled={disabled}
                onChange={() => cursor.update(switchToggele).push()} />
            {children}
        </div>
    )
}

export interface SwitchComponentWithLabelProps extends SwitchProps {
    yes?: string
    no?: string
}

export const SwitchWithText = (props: SwitchComponentWithLabelProps) => {

    const state = useCursor(props.cursor)
    const checked = switchIsChecked(state)

    return (
        <Switch id={props.id} cursor={props.cursor} disabled={props.disabled}>
            <label className="form-check-label" htmlFor={props.id}>{(checked ? (props.yes || "да") : (props.no || "нет"))}</label>
        </Switch>
    )
}