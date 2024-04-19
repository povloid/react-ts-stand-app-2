class ExternalStore<S> {
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
    this.emitChange();
  }

  private emitChange() {
    this.listeners.forEach((listener) => listener());
  }
}

export const createStore = <S>(state: S) => {
  const store = new ExternalStore(state);
  return {
    subscribe: (listener: Function) => store.subscribe(listener),
    getSnapshot: () => store.getSnapshot(),
    update: (fn: (state: S) => S) => store.update(fn),
  };
};
