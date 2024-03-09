import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unAssingdVideos: {},
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUnAssingdVideos: (state, action) => {
      state.unAssingdVideos = action.payload;
    },
  },
});

export const { setUnAssingdVideos, removeVideo } = adminSlice.actions;
export default adminSlice.reducer;
