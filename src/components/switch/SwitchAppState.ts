export type SwitchAppState = boolean

export const switchAppStateInit = false

export const switchIsChecked = (state: SwitchAppState): boolean => state

export const switchSetValue = (_: SwitchAppState, value: boolean): SwitchAppState => value
export const switchCheck = (): SwitchAppState => true
export const switchUncheck = (): SwitchAppState => false
export const switchToggele = (state: SwitchAppState): SwitchAppState => !state
