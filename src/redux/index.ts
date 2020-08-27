import { combineReducers } from "@reduxjs/toolkit";
import todoSlice from "./todo/index";
import userSlice from "./user";

export const reducer = combineReducers({
  todos: todoSlice.reducer,
  user: userSlice.reducer,
});
