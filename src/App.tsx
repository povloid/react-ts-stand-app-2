import { useSyncExternalStore } from "react";
//import logo from "./logo.svg";
import "./App.css";
import { AppState, appStore } from "./DB";
import { createStore } from "./pathStore";

const aStore = createStore({ a: 1 });

function A() {
  const app = useSyncExternalStore(aStore.subscribe, aStore.getSnapshot);

  console.log("A");

  const inc = () => aStore.update((s) => ({ ...s, a: s.a + 1 }));

  return (
    <div>
      {app.a}
      <button onClick={inc}>INC</button>
    </div>
  );
}

function AA() {
  const app = useSyncExternalStore(aStore.subscribe, aStore.getSnapshot);

  console.log("AA");

  const inc = () => aStore.update((s) => ({ ...s, a: s.a + 1 }));

  return (
    <div>
      {app.a}
      <button onClick={inc}>INC</button>
    </div>
  );
}

const bStore = createStore({ b: 1 });

function B() {
  const app = useSyncExternalStore(bStore.subscribe, bStore.getSnapshot);

  console.log("B");

  const inc = () => bStore.update((s) => ({ ...s, b: s.b + 1 }));

  return (
    <div>
      {app.b}
      <button onClick={inc}>INC</button>
    </div>
  );
}

function App() {
  const app = useSyncExternalStore(appStore.subscribe, appStore.getSnapshot);

  return (
    <div className="App">
      <header className="App-header">
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
        <A></A>
        <AA></AA>
        <B></B>
      </header>
    </div>
  );
}

export default App;
