const { createSlice } = require("@reduxjs/toolkit");

//initial state
let initialState = {
  sortBy: "",
  postType: false,
};

//ready slice
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    habdelFilterchange: (state, action) => {
      action.payload.name === "filter"
        ? (state.postType = action.payload.value)
        : (state.sortBy = action.payload.value);
    },
  },
});
export default filterSlice.reducer;
export const { habdelFilterchange } = filterSlice.actions;
