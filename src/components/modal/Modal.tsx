import { ReactNode, useEffect, useState } from "react"
import { Cursor, useCursor } from "../../ExternalStore"
import { ModalAppState } from "./ModalAppState"



// генератор уникальных идентификаторов

let id: number = 0

function generateNextModalId() {
	return `modal-${id++}`
}

// хранилище уникальных идентификаторов

const modalsIds = new Set<string>([])

// функции для добаление и удаления модальных идентификаторов

function addModalId(modalId: string): void {
	modalsIds.add(modalId)
	console.log("Создано модальное окно:", modalId)
}

function deleteModalId(modalId: string): void {
	modalsIds.delete(modalId)
	console.log("Удалено модальное окно:", modalId)
}

function watchModalIds(): void {
	if (modalsIds.size === 0) {
		document.body.classList.add("modal-open")
	} else {
		document.body.classList.remove("modal-open")
	}
}


export const Modal = (props: {
	size?: "xl" | "lg" | "sm"
	centred?: boolean
	cursor: Cursor<ModalAppState>
	children?: ReactNode
}) => {

	const [id] = useState(generateNextModalId())


	useEffect(() => {

		addModalId(id)

		return () => {
			deleteModalId(id)
		}
	}, [id])


	const { show } = useCursor(props.cursor)

	watchModalIds()

	// hide: <div class="modal fade" style="display: none;" aria-hidden="true">	
	// show: <div class="modal fade show" style="display: block;" aria-modal="true" role="dialog">

	const size = props.size ? `modal-${props.size}` : ""
	const centred = props.centred ? "modal-dialog-centered" : ""

	return (
		<div id={id} tabIndex={-1} aria-labelledby="exampleModalLabel"
			className={show ? "modal fade show" : "modal fade"}
			aria-hidden={!show}
			aria-modal={show}
			style={(show ? { display: "block", backgroundColor: "rgba(0, 0, 0, 0.2)" } : { display: "none" })}
			role={show ? "dialog" : undefined}
		>
			<div className={`modal-dialog ${size} ${centred}`}>
				<div className="modal-content">
					{show ? props.children : null}
				</div>
			</div>
		</div>
	)
}

export const ModalHeader = (props: {
	onClose?: () => void,
	children?: ReactNode
}) => {
	return (
		<div className="modal-header">
			<h1 className="modal-title fs-5" id="exampleModalLabel">{props.children || "Title"}</h1>
			{
				props.onClose
					? <button type="button" className="btn-close"
						data-bs-dismiss="modal" aria-label="Close"
						onClick={(e) => {
							e.stopPropagation()
							if (props.onClose) props.onClose()
						}}></button>
					: null
			}
		</div>
	)
}

export const ModalBody = ({ children }: { children?: ReactNode }) => (
	<div className="modal-body">
		{children}
	</div>
)


export const ModalFooter = (props: {
	children?: ReactNode
}) => {
	return (
		<div className="modal-footer">
			{props.children}
		</div>
	)
}

