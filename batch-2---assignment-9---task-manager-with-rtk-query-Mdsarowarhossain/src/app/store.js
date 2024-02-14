import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import taskManagerSlice from "../features/taskManager/taskManagerSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filter: taskManagerSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultNormalizer) =>
    getDefaultNormalizer().concat(apiSlice.middleware),
});
