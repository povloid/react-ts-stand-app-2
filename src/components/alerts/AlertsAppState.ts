import { curry2Right } from "../../tools/fp";
import { bootstrapType } from "../types";


let id: number = 0

function generateNextId() {
    return `alert-${id++}`
}

export interface AlertAppState {
    id: string;
    type: bootstrapType
    message?: string
}

export type AlertsAppState = AlertAppState[]

export const alertsAppStateInit: AlertsAppState = []


export const alertsClear = (): AlertsAppState => []

export const alertsAdd = (alerts: AlertsAppState, { type, message, id }: { type: bootstrapType, message?: string, id?: string }): AlertsAppState =>
    [...alerts, { type, message, id: id || generateNextId() }]

export const alertsAddC = curry2Right(alertsAdd)

export const alertsDel = (alerts: AlertsAppState, alertId: string): AlertsAppState =>
    [...alerts.filter(a => a.id !== alertId)]

export const alertsDelC = curry2Right(alertsDel)