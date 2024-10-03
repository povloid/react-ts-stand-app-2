import { createContext, PropsWithChildren, ReactNode, useContext, useEffect } from "react";
import { Cursor, ExternalStore, useCursor } from "../../ExternalStore";
import { HashScreensAppState, selectedHashScreen, selectedHashScreenSetC } from "./HashScreensAppState";


const CursorContext = createContext<Cursor<HashScreensAppState<string>>>(new ExternalStore("none"));


/**
 * Навигация по экранам через адресную строку
 * 
 * @param props 
 * @returns 
 */
export const HashScreens = <T extends string,>(props: {
    cursor: Cursor<HashScreensAppState<T>>,
    children?: ReactNode
}) => {

    const state = useCursor(props.cursor)
    const currentScreen = selectedHashScreen(state)

    useEffect(() => {

        const handleHash = () => {
            console.log('Выбран экран:', window.location.hash)
            props.cursor.update(selectedHashScreenSetC(window.location.hash as T)).push()
        }

        window.addEventListener("popstate", handleHash);

        window.location.hash = currentScreen

        return () => {
            window.removeEventListener("popstate", handleHash)
        }
    }, [currentScreen]);

    return (
        <CursorContext.Provider value={props.cursor}>
            {props.children}
        </CursorContext.Provider>
    )
}

export interface HashScreenProps<T extends string> extends PropsWithChildren {
    hash: T
}

/**
 * Скрин для показа по хэшу  
 * 
 * @param props
 * @returns 
 */
export const HashScreen = <T extends string,>(
    props: HashScreenProps<T>
) => {

    const cursor = useContext(CursorContext)

    const state = useCursor(cursor)
    const currentScreen = selectedHashScreen(state)

    return currentScreen === props.hash ? props.children : null
}

