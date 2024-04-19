export class ExternalStore<S> {
  private listeners: Function[] = [];
  private state: S;

  public constructor(state: S) {
    this.state = state;
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
