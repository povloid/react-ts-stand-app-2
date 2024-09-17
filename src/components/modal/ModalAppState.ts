

export interface ModalAppState {
	show: boolean
}

export const modalAppStateInit: ModalAppState = {
	show: false
}

export const modalShow = (s: ModalAppState): ModalAppState => ({...s, show: true})
export const modalHide = (s: ModalAppState): ModalAppState => ({...s, show: false})