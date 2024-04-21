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
//                                 app state                                 //
///////////////////////////////////////////////////////////////////////////////

export interface AppState {
  a: number;
  b: number;
  form1: Form1;
}

export const appStateInit = {
  a: 0,
  b: 0,
  form1: form1InitState,
};

export const appStore = new ExternalStore<AppState>(appStateInit);

export const appStoreForm1TitleCursor = new ExternalStoreCursor(
  appStore,
  (store) => store.form1.title,
  (state: AppState, title: string) => ({
    ...state,
    form1: { ...state.form1, title },
  }),
);

export const appStoreForm1DescriptionCursor = new ExternalStoreCursor(
  appStore,
  (store) => store.form1.description,
  (state: AppState, description: string) => ({
    ...state,
    form1: { ...state.form1, description },
  }),
);
