import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./index";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer,
  middleware: [thunk],
});
