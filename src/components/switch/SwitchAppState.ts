export type SwitchAppState = boolean

export const switchAppStateInit = false

export const switchIsChecked = (state: SwitchAppState): boolean => state

export const switchSetValue = (state: SwitchAppState, value: boolean): SwitchAppState => value
export const switchCheck = (state: SwitchAppState): SwitchAppState => true
export const switchUncheck = (state: SwitchAppState): SwitchAppState => false
export const switchToggele = (state: SwitchAppState): SwitchAppState => !state
