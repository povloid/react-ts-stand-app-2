import { curry2Right } from "../../tools/fp";

export interface NavAppState {
    active: string;
}

export const navAppStateInit = {
    active: "none"
}

export const navIsActive = (state: NavAppState, acitve: string): boolean => state.active === acitve

export const navSetActive = (state: NavAppState, active: string): NavAppState => ({ ...state, active: active })
export const navSetActiveC = curry2Right(navSetActive)