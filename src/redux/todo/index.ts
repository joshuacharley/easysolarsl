import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "./todoTypes";

const initialState: Todo[] = [
  {
    todoId: 1,
    description: "Kill Sage",
    userId: "ngomnanaft@icloud.com",
  },
  {
    todoId: 2,
    description: "Climb Kilimanjaro",
    userId: "ngomnanaft@icloud.com",
  },
];

const todoSlice = createSlice({
  name: "Todos",
  initialState: initialState,
  reducers: {
    create: {
      reducer: (state, { payload }: PayloadAction<Todo>) => {
        state.push(payload);
      },
      prepare: (todo: any) => ({ payload: todo }),
    },
    edit: (state, { payload }) => {
      const todoToDelete = state.find((todo) => todo.todoId === payload.todoId);

      if (todoToDelete) {
        todoToDelete.description = payload.description;
      }
    },
    remove: (state, { payload }) => {
      const todoToDelete = state.findIndex(
        (todo) => todo.todoId === payload.todoId
      );

      if (todoToDelete !== 1) {
        state.splice(todoToDelete, 1);
      }
    },
  },
});

export const {
  create: createTodoAction,
  edit: editTodoAction,
  remove: deleteTodoAction,
} = todoSlice.actions;

export default todoSlice;
