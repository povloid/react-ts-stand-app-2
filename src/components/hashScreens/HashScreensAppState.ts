import { curry2Right } from "../../tools/fp"

export type HashScreensAppState<T extends string> = T

export const selectedHashScreen = <T extends string>(state: HashScreensAppState<T>): T => state
export const selectedHashScreenSet = <T extends string>(state: HashScreensAppState<T>, screen: T): HashScreensAppState<T> => screen
export const selectedHashScreenSetC = curry2Right(selectedHashScreenSet)

