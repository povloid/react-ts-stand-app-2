import { useCursor } from "../../ExternalStore"
import { IconMdi } from '../icon/IconMdi'
import { Button, ButtonProps, ButtonWithStateProps } from "./Button"

export const AddButton = (props: ButtonProps) =>
    <Button {...props}><IconMdi iname="plus" />  Добавить</Button>

export const AddButtonWithState = (props: ButtonWithStateProps) => {
    const { disabled } = useCursor(props.cursor)

    return (
        <AddButton {...props} disabled={disabled} />
    )
}


export const EditButton = (props: ButtonProps) =>
    <Button {...props}><IconMdi iname="pencil" />  Редактировать</Button>

export const EditButtonWithState = (props: ButtonWithStateProps) => {
    const { disabled } = useCursor(props.cursor)

    return (
        <EditButton {...props} disabled={disabled} />
    )
}


export const DelButton = (props: ButtonProps) =>
    <Button {...props}><IconMdi iname="minus" />  Удалить</Button>

export const DelButtonWithState = (props: ButtonWithStateProps) => {
    const { disabled } = useCursor(props.cursor)

    return (
        <DelButton {...props} disabled={disabled} />
    )
}


export const AcceptButton = (props: ButtonProps) =>
    <Button {...props}><IconMdi iname="check" /> Принять</Button>

export const AcceptButtonWithState = (props: ButtonWithStateProps) => {
    const { disabled } = useCursor(props.cursor)

    return (
        <AcceptButton {...props} disabled={disabled} />
    )
}


export const CancelButton = (props: ButtonProps) =>
    <Button {...props}><IconMdi iname="cancel" />  Отмена</Button>

export const CancelButtonWithState = (props: ButtonWithStateProps) => {
    const { disabled } = useCursor(props.cursor)

    return (
        <EditButton {...props} disabled={disabled} />
    )
}

