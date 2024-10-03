import { curry2Right } from "../../tools/fp"

export interface ButtonAppState {
    disabled?: boolean
}

export const buttonAppStateInit: ButtonAppState = {

}

export const buttonEnable = (state: ButtonAppState): ButtonAppState => ({ ...state, disabled: undefined })
export const buttonDisable = (state: ButtonAppState): ButtonAppState => ({ ...state, disabled: true })

export const buttonSetDisable = (state: ButtonAppState, disabled: boolean): ButtonAppState => ({ ...state, disabled })
export const buttonSetDisableC = curry2Right(buttonSetDisable)
