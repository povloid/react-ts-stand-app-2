export interface AppState {
  a: number;
  b: number;
}

let appState: AppState = { a: 0, b: 0 };
let listeners: Function[] = [];

export const appStore = {
  incA() {
    appState = { ...appState, a: appState.a + 1 };
    console.log(appState);
    emitChange();
  },

  incB() {
    appState = { ...appState, b: appState.b + 1 };
    emitChange();
  },

  subscribe(listener: Function) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  getSnapshot() {
    return appState;
  },
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}
