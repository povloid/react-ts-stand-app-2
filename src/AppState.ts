import { ExternalStore, ExternalStoreCursor } from "./ExternalStore";

///////////////////////////////////////////////////////////////////////////////
//                                   form 1                                  //
///////////////////////////////////////////////////////////////////////////////

export interface Form1 {
  title: string;
  description: string;
}

export const form1InitState: Form1 = {
  title: "",
  description: "",
};

///////////////////////////////////////////////////////////////////////////////
//                                   table                                   //
///////////////////////////////////////////////////////////////////////////////

export interface Table1Item {
  id: number;
  name: string;
  description: string;
}

export interface Table1 {
  items: Table1Item[];
}

export const table1InitState: Table1 = {
  items: [{ id: 0, name: "name 0", description: "..." }],
};

///////////////////////////////////////////////////////////////////////////////
//                                 app state                                 //
///////////////////////////////////////////////////////////////////////////////

export interface AppState {
  a: number;
  b: number;
  form1: Form1;
  table1: Table1;
}

export const appStateInit = {
  a: 0,
  b: 0,
  form1: form1InitState,
  table1: table1InitState,
};

///////////////////////////////////////////////////////////////////////////////
//                                   Store                                   //
///////////////////////////////////////////////////////////////////////////////

export const appStore = new ExternalStore<AppState>(appStateInit);

export const appStoreForm1TitleCursor = new ExternalStoreCursor(
  appStore,
  (state) => state.form1.title,
  (state: AppState, title: string) => ({
    ...state,
    form1: { ...state.form1, title },
  }),
);

export const appStoreForm1DescriptionCursor = new ExternalStoreCursor(
  appStore,
  (state) => state.form1.description,
  (state: AppState, description: string) => ({
    ...state,
    form1: { ...state.form1, description },
  }),
);
