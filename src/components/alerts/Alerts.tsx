import { Fragment, ReactNode } from "react";
import { Cursor, useCursor } from "../../ExternalStore";
import { bootstrapType } from "../types";
import { AlertsAppState, alertsDel } from "./AlertsAppState";


export const Alert = ({ type, children, onClose }: { type: bootstrapType, children?: ReactNode, onClose?: () => void }) => (
  <div className={`alert alert-${type} alert-dismissible`} role="alert">
    {children}
    {onClose
      ?
      <button type="button" className="close" onClick={onClose}>
        <span>&times;</span>
      </button>
      :
      null
    }
  </div >
)


export const Alerts = ({ cursor }: { cursor: Cursor<AlertsAppState> }) => {

  const alerts = useCursor(cursor)

  return (
    <Fragment>
      {alerts.map(({ id, type, message }) =>
        <Alert key={id} type={type} onClose={() => cursor.update(state => alertsDel(state, id)).push()}>
          {message}
        </Alert>)}
    </Fragment>
  )
}