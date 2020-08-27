import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUser = {
  token: "",
};

interface IUser {
  token: string;
}

const userSlice = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {
    create: {
      reducer: (state, { payload }: PayloadAction<IUser>) => {
        state.token = payload.token;
      },
      prepare: (user: IUser) => ({
        payload: user,
      }),
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { create: loginAction, logout: logoutAction } = userSlice.actions;

export default userSlice;
