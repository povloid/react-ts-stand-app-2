import { Options } from "@testing-library/user-event";
import { bootstrapType } from "../types"
import { partial1right } from "../../tools/fp";


let id: number = 0

function generateNextId() {
    return `modal-${id++}`
}

export interface AlertAppState {
    id: string;
    type: bootstrapType
    message?: string
}

export type AlertsAppState = AlertAppState[]

export const alertsAppStateInit: AlertsAppState = []


export const alertsClear = (): AlertsAppState => []

export const alertsAdd = (alerts: AlertsAppState, type: bootstrapType, message?: string, id?: string): AlertsAppState =>
    [...alerts, { type, message, id: id || generateNextId() }]

export const alertsDel = (alerts: AlertsAppState, alertId: string): AlertsAppState =>
    [...alerts.filter(a => a.id !== alertId)]
