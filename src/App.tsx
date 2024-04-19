import React, { useSyncExternalStore } from "react";
import logo from "./logo.svg";
import "./App.css";
import { AppState, appStore } from "./DB";

function App() {
  const app = useSyncExternalStore(appStore.subscribe, appStore.getSnapshot);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {app.a}
        <button
          onClick={() =>
            appStore.update((app: AppState) => ({ ...app, a: app.a + 1 }))
          }
        >
          INC
        </button>
      </header>
    </div>
  );
}

export default App;
