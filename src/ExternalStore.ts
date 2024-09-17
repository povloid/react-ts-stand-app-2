import { useSyncExternalStore } from "react";

///////////////////////////////////////////////////////////////////////////////
//                               Cursor                                      //
///////////////////////////////////////////////////////////////////////////////


export interface Cursor<S> {
	getSnapshot(): S
	update(fn: (state: S) => S): Cursor<S>
	push(): void
	subscribe(listener: Function): () => void
	get<V>(fn: (state: S) => V): V
	createCursorOn<K extends keyof S>(key: K): Cursor<S[K]>
}

export const useCursor = <S>(store: Cursor<S>) => {
	const subscribe = (listener: Function) => store.subscribe(listener);
	const getSnapshot = () => store.getSnapshot();
	return useSyncExternalStore(subscribe, getSnapshot);
};

///////////////////////////////////////////////////////////////////////////////
//                               External Store                              //
///////////////////////////////////////////////////////////////////////////////

export class ExternalStore<S> implements Cursor<S> {
	private listeners: Function[] = [];
	private state: S;

	public constructor(private initState: S) {
		this.state = { ...this.initState };
	}

	public subscribe(listener: Function) {
		this.listeners = [...this.listeners, listener];
		return () => {
			this.listeners = this.listeners.filter((l) => l !== listener);
		};
	}

	public getSnapshot() {
		return this.state;
	}

	public get<V>(fn: (state: S) => V): V {
		return fn(this.state);
	}

	public update(fn: (state: S) => S) {
		this.state = fn(this.state);
		return this;
	}

	public push() {
		this.listeners.forEach((listener) => listener());
	}

	public createCursorOn<K extends keyof S>(key: K): Cursor<S[K]> {
		return new ExternalStoreCursor(this,
			(state) => state[key],
			(state, newState) => ({ ...state, [key]: newState }))
	}
}

///////////////////////////////////////////////////////////////////////////////
//                           External Store Cursor                           //
///////////////////////////////////////////////////////////////////////////////

export class ExternalStoreCursor<S, SS> implements Cursor<SS> {

	private listeners: Function[] = [];

	public constructor(
		private readonly cursor: Cursor<S>,
		private readonly getSnapshotAt: (state: S) => SS,
		private readonly updateAt: (state: S, subState: SS) => S
	) {
	}

	public getSnapshot(): SS {
		return this.getSnapshotAt(this.cursor.getSnapshot());
	}

	public get<V>(fn: (state: SS) => V): V {
		return fn(this.getSnapshotAt(this.cursor.getSnapshot()));
	}

	public update(fn: (state: SS) => SS) {
		this.cursor.update((state) =>
			this.updateAt(state, fn(this.getSnapshotAt(state))),
		);
		return this;
	}

	public subscribe(listener: Function) {
		this.listeners = [...this.listeners, listener];
		return () => {
			this.listeners = this.listeners.filter((l) => l !== listener);
		};
	}

	public push() {
		this.listeners.forEach((listener) => listener());
	}

	public createCursorOn<K extends keyof SS>(key: K): Cursor<SS[K]> {
		return new ExternalStoreCursor(this,
			(state) => state[key],
			(state, newState) => ({ ...state, [key]: newState }))
	}
}
