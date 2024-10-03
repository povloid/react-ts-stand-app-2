import { ReactNode } from "react";
import { Cursor, useCursor } from "../../ExternalStore";
import { bootstrapType } from "../types";
import { ButtonAppState } from "./ButtonAppState";


export interface ButtonProps {
    onClick?: () => void,
    type?: bootstrapType,
    children?: ReactNode
    disabled?: boolean
}

export const Button = ({
    onClick,
    type,
    disabled,
    children,
}: ButtonProps) => (
    <button type="button"
        className={`btn btn-${type || "secondary"}`}
        disabled={disabled}
        onClick={(e) => {
            e.stopPropagation()
            if (onClick) onClick()
        }}>
        {children}
    </button>
)


export interface ButtonWithStateProps extends ButtonProps {
    cursor: Cursor<ButtonAppState>
}

export const ButtonWithState = (props: ButtonWithStateProps) => {

    const { disabled } = useCursor(props.cursor)

    return (
        <Button {...props} disabled={disabled} />
    )
}

