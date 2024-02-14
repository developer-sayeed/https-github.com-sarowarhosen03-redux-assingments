import getPost from "./postApi";
import { updatePostApi } from "./updatePostapi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

//initial state
let initialState = {
  isLoading: false,
  isError: false,
  error: "",
  post: {},
};

export const postAsync = createAsyncThunk("Post/fetchPost", async ({ id }) => {
  const post = await getPost(id);
  return post;
});

//update post
export const updatePostsAsync = createAsyncThunk(
  "Posts/updatePosts",
  async (payload) => {
    const post = await updatePostApi(payload.id, payload.data);
    return { post, type: payload.type };
  }
);

//ready slice
const postSlice = createSlice({
  name: "Post",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(postAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(postAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.post = {};
        state.error = action.error?.message;
      });

    builder.addCase(updatePostsAsync.fulfilled, (state, action) => {
      if (action.payload.type === "likes") {
        state.post.likes = action.payload.post.likes;
      }
      else if (action.payload.type === "save") {
        state.post.isSaved = action.payload.post.isSaved;
      }
    });
  },
});
export default postSlice.reducer;
