import getRealatedPost from "./getRealatedPost";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

//initial state
let initialState = {
  isLoading: false,
  isError: false,
  error: "",
  reallatedPosts: [],
};

export const realatedPostsAsync = createAsyncThunk(
  "Posts/fetchPosts",
  async ({ tags, id }) => {
    const realatedPosts = await getRealatedPost({ tags, id });
    return realatedPosts;
  }
);

//ready slice
const RealatedPostsSlice = createSlice({
  name: "realatedPost",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(realatedPostsAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(realatedPostsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reallatedPosts = action.payload;
      })
      .addCase(realatedPostsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.reallatedPosts = [];
        state.error = action.error?.message;
      });
  },
});
export default RealatedPostsSlice.reducer;
