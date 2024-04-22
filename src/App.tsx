//import logo from "./logo.svg";
import "./App.css";
import {
  appStore,
  appStoreForm1DescriptionCursor,
  appStoreForm1TitleCursor,
  appStoreTable1Cursor,
  appStoreTable1ItemsCursor,
} from "./AppState";
import { useStoreCursor } from "./ExternalStore";

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

function Table1Item_(props: { i: number }) {
  const i = props.i;
  const cursor = appStoreTable1ItemsCursor(i);
  const item = useStoreCursor(cursor);

  const incN = () =>
    cursor.update((item) => ({ ...item, n: item.n + 1 })).emitChange();

  console.log("item", item.id);

  return (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.n}</td>
      <td>
        <button onClick={incN}>+</button>
      </td>
    </tr>
  );
}

function Table1() {
  const table = useStoreCursor(appStoreTable1Cursor);

  console.log("table");

  return (
    <table>
      <tbody>
        {table.items.map((item) => (
          <Table1Item_ i={item.id} />
        ))}
      </tbody>
    </table>
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
        <Table1 />
      </header>
    </div>
  );
}

export default App;
