import { useSyncExternalStore } from "react";

///////////////////////////////////////////////////////////////////////////////
//                               External Store                              //
///////////////////////////////////////////////////////////////////////////////

export class ExternalStore<S> {
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

  public update(fn: (state: S) => S) {
    this.state = fn(this.state);
    return this;
  }

  public emitChange() {
    this.listeners.forEach((listener) => listener());
  }
}

export const useExternalStore = <S>(store: ExternalStore<S>) => {
  const subscribe = (listener: Function) => store.subscribe(listener);
  const getSnapshot = () => store.getSnapshot();
  return useSyncExternalStore(subscribe, getSnapshot);
};

///////////////////////////////////////////////////////////////////////////////
//                           External Store Cursor                           //
///////////////////////////////////////////////////////////////////////////////

export class ExternalStoreCursor<S, SS> {
  private listeners: Function[] = [];
  public constructor(
    private externalStore: ExternalStore<S>,
    private getSnapshotAt: (state: S) => SS,
    private updateAt: (state: S, subState: SS) => S,
    private name?: string,
  ) { }

  public getSnapshot(): SS {
    return this.getSnapshotAt(this.externalStore.getSnapshot());
  }

  public update(fn: (state: SS) => SS) {
    this.externalStore.update((state) =>
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

  public emitChange() {
    this.listeners.forEach((listener) => listener());
  }
}

export const useExternalStoreCursor = <S, SS>(store: ExternalStoreCursor<S, SS>) => {
  const subscribe = (listener: Function) => store.subscribe(listener);
  const getSnapshot = () => store.getSnapshot();
  return useSyncExternalStore(subscribe, getSnapshot);
};
