//import logo from "./logo.svg";
import "./App.css";
import {
  appStore,
  appStoreForm1DescriptionCursor,
  appStoreForm1TitleCursor,
  appStoreInput1Cursor,
  appStoreInput2Cursor,
  appStoreTable1Cursor,
  appStoreTable1ItemsCursor,
} from "./AppState";
import { InputComponent } from "./components/input/InputComponent";
import { useExternalStoreCursor } from "./ExternalStore";

function Form1InputName() {
  const title = useExternalStoreCursor(appStoreForm1TitleCursor);

  console.log("title");

  const onChange = (e: { target: { value: string } }) =>
    appStoreForm1TitleCursor.update(() => e.target.value).emitChange();

  return (
    <div className="mb-3">
      <input className="form-control" value={title} onChange={onChange} />
    </div>
  );
}

function Form1InputDescription() {
  const description = useExternalStoreCursor(appStoreForm1DescriptionCursor);

  console.log("description");

  const onChange = (e: { target: { value: string } }) =>
    appStoreForm1DescriptionCursor.update(() => e.target.value).emitChange();

  return (
    <div className="mb-3">
      <input className="form-control" value={description} onChange={onChange} />
    </div>
  );
}

function Table1ItemComponent(props: { i: number }) {
  const i = props.i;
  const cursor = appStoreTable1ItemsCursor(i);
  const item = useExternalStoreCursor(cursor);

  const incN = () =>
    cursor.update((item) => ({ ...item, n: item.n + 1 })).emitChange();
  const decN = () =>
    cursor.update((item) => ({ ...item, n: item.n - 1 })).emitChange();

  console.log("item", item);

  const delItem = () => {
    console.log("delete id =", item.id)
    return appStoreTable1Cursor
      .update((table) => ({
        ...table,
        items: table.items.filter((item_) => item_.id !== item.id),
      }))
      .emitChange();
  }

  return (
    <tr>
      <td width="10%">{item.id}</td>
      <td>{item.name}</td>
      <td width="10%">{item.n}</td>
      <td width="20%">
        <div className="btn-group">
          <button type="button" className="btn btn-danger" onClick={incN}>+</button>
          <button type="button" className="btn btn-primary" onClick={decN}>-</button>
        </div>
        {" "}
        <button type="button" className="btn btn-warning" onClick={delItem}>DEL</button>
      </td>
    </tr>
  );
}

function Table1() {
  const table = useExternalStoreCursor(appStoreTable1Cursor);

  const addNewItem = () =>
    appStoreTable1Cursor
      .update((table) => ({
        ...table,
        items: [
          ...table.items,
          { id: table.items.length, name: "", description: "", n: 0 },
        ],
      }))
      .emitChange();

  console.log("table");

  return (
    <>
      <table className="table">
        <tbody>
          {table.items.map((item, i) => (
            <Table1ItemComponent key={i} i={i} />
          ))}
        </tbody>
      </table>
      <button type="button" className="btn btn-primary" onClick={addNewItem}>ADD</button>
    </>
  );
}

function App() {
  console.log("App");

  const logAppStore = () => console.log(appStore.getSnapshot());

  return (
    <div className="App container">
      <h1>Test</h1>
      <div>
        <fieldset>
          <Form1InputName />
          <Form1InputDescription />
        </fieldset>
      </div>
      <div className="mb-3">
        <button type="button" className="btn btn-primary" onClick={logAppStore}>LOG</button>
      </div>
      <div>
        <fieldset>
          <div className="mb-3">
            <InputComponent cursor={appStoreInput1Cursor} />
          </div>
          <div className="mb-3">
            <InputComponent cursor={appStoreInput1Cursor} />
          </div>
          <div className="mb-3">
            <InputComponent cursor={appStoreInput2Cursor} />
          </div>
        </fieldset>
      </div>
      <Table1 />
    </div >
  );
}

export default App;
