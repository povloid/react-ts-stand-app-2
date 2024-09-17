import { ReactNode } from "react";
import { bootstrapType } from "../types";

export const Button = ({
    onClick,
    type,
    children,
}: {
    onClick?: () => void,
    type?: bootstrapType,
    children?: ReactNode
}) =>
    <button type="button"
        className={`btn btn-${type || "secondary"}`}
        onClick={onClick}>
        {children}
    </button>
