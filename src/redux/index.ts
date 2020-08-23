import {combineReducers} from '@reduxjs/toolkit'
import todoSlice from './todo/index';

export const reducer = combineReducers({
    todos: todoSlice.reducer,
});