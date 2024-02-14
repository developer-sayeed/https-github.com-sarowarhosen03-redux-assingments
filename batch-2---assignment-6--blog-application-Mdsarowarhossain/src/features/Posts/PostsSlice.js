import { updatePostsAsync } from "../post/postSlice";
import getPosts from "./PostsApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

//initial state
let initialState = {
  isLoading: false,
  isError: false,
  error: "",
  posts: [],
};

export const postsAsync = createAsyncThunk("Posts/fetchPosts", async () => {
  const posts = await getPosts();
  return posts;
});

//ready slice
const postsSlice = createSlice({
  name: "Posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postsAsync.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(postsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(postsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.posts = [];
        state.error = action.error?.message;
      });
    builder.addCase(updatePostsAsync.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) => {
        if (action.payload.post.id === post.id) {
          if (action.payload.type === "likes") {
            post.likes = action.payload.post.likes;
          } else if (action.payload.type === "save") {
            post.isSaved = action.payload.post.isSaved;
          }
          return post;
        }
        return post;
      });
    });
  },
});
export default postsSlice.reducer;
