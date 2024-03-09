import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    accessToken: undefined,
    user: undefined,
  },
  admin: {
    accessToken: undefined,
    user: undefined,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user.accessToken = action.payload.accessToken;
      state.user.user = action.payload.user;
    },
    adminLoggedIn: (state, action) => {
      state.admin.accessToken = action.payload.accessToken;
      state.admin.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.user.accessToken = undefined;
      state.user.user = undefined;
    },
    adminLoggedOut: (state) => {
      state.admin.accessToken = undefined;
      state.admin.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut, adminLoggedIn, adminLoggedOut } =
  authSlice.actions;
export default authSlice.reducer;
