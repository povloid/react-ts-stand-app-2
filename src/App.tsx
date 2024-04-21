import { useSyncExternalStore } from "react";
//import logo from "./logo.svg";
import "./App.css";
import {
  appStore,
  appStoreForm1DescriptionCursor,
  appStoreForm1TitleCursor,
} from "./AppState";
import { ExternalStore, useStore, useStoreCursor } from "./ExternalStore";

function Form1InputName() {
  const title = useStoreCursor(appStoreForm1TitleCursor);

  console.log("title");

  const onChange = (e: { target: { value: string } }) =>
    appStoreForm1TitleCursor.update(() => e.target.value).emitChange();

  return (
    <div>
      <input value={title} onChange={onChange} />
    </div>
  );
}

function Form1InputDescription() {
  const description = useStoreCursor(appStoreForm1DescriptionCursor);

  console.log("description");

  const onChange = (e: { target: { value: string } }) =>
    appStoreForm1DescriptionCursor.update(() => e.target.value).emitChange();

  return (
    <div>
      <input value={description} onChange={onChange} />
    </div>
  );
}

function App() {
  console.log("App");

  const logAppStore = () => console.log(appStore.getSnapshot());

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
        <Form1InputName />
        <Form1InputDescription />
        <button onClick={logAppStore}>LOG</button>
      </header>
    </div>
  );
}

export default App;
