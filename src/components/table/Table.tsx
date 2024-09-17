import { stat } from "fs"
import { Cursor, ExternalStoreCursor, useCursor } from "../../ExternalStore"
import { TableAppState } from "./TableAppState"


export type ItemRender<T> = (props: { o: T, i: number, c: Cursor<T>, cc: Cursor<T>[], tc: Cursor<TableAppState<T>> }) => JSX.Element

export const Table = <T,>(props: {
	itemRender?: ItemRender<T>
	thead?: JSX.Element
	cursor: Cursor<TableAppState<T>>
}) => {

	const { columns, items } = useCursor(props.cursor)

	const ItemRender: ItemRender<T> = props.itemRender || (({ o, i }: { o: T, i: number }) => <tr key={i}><td colSpan={columns?.length}>{`[${i}] ${o}`}</td></tr>)

	return (
		<div className="table-responsive">
			<table className="table">
				{
					columns ? (
						// Если колонки есть в данных
						<thead>
							<tr>
								{columns.map((o, i) => (
									<th key={i} scope="col">
										{o.text}
									</th>
								))}
							</tr>
						</thead>
					) :
						// Иначе берем колонки из настроек
						props.thead
				}
				<tbody>
					{
						items.length > 0 ? (
							createRenders(props.cursor, items, ItemRender)
						) : (
							<tr>
								<td colSpan={columns?.length}>нет данных</td>
							</tr>
						)
					}
				</tbody>
			</table>
		</div>
	)
}


const createRenders = <T,>(cursor: Cursor<TableAppState<T>>, items: T[], ItemRender: ItemRender<T>) => {

	const cc = items.map((o, i) =>
		new ExternalStoreCursor(
			cursor,
			(state) => state.items[i],
			(state, newItem) => ({ ...state, items: state.items.map((item, ii) => ii === i ? newItem : item) })))

	return items.map((o, i) => {
		return <ItemRender key={i} o={o} i={i} c={cc[i]} cc={cc} tc={cursor} />
	})
}
