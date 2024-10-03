import { ReactNode, useEffect } from "react"
import { Cursor, useCursor } from "../../ExternalStore"
import { NavAppState, navIsActive, navSetActiveC } from "./NavAppState"


// генератор уникальных идентификаторов

let id: number = 0

function generateNextId() {
    return `nav-item-${id++}`
}


export const Nav = ({
    type,
    children
}: {
    type: "tabs" | "pills"
    children?: ReactNode
}) => {

    return (
        <ul className={`nav nav-${type}`}>
            {children}
        </ul>
    )
}

export const NavItem = ({
    acitveKey,
    acitve,
    cursor,
    children
}: {
    acitveKey: string;
    acitve?: boolean,
    cursor: Cursor<NavAppState>
    children?: ReactNode
}) => {

    useEffect(() => {
        if (acitve) cursor.update(navSetActiveC(acitveKey)).push()
        return () => { }
    }, [acitveKey])

    const state = useCursor(cursor)

    const isAcitve = navIsActive(state, acitveKey)

    const onClick = () => cursor.update(navSetActiveC(acitveKey)).push()

    return (
        <li className="nav-item" onClick={onClick}>
            <a className={`nav-link ${isAcitve ? "active" : ""}`} aria-current="page" style={{ cursor: "pointer" }}>
                {children}
            </a>
        </li>
    )
}

export const NavBlock = ({
    acitveKey,
    cursor,
    children
}: {
    acitveKey: string;
    cursor: Cursor<NavAppState>
    children?: ReactNode
}) => {

    const state = useCursor(cursor)

    const isAcitve = navIsActive(state, acitveKey)

    return isAcitve ? children : null
}