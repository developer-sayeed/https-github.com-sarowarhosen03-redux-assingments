import { configureStore } from '@reduxjs/toolkit';
import postSlice from '../features/post/postSlice';
import postsSlice from '../features/Posts/PostsSlice';
import RealatedPostsSlice from '../features/realatedPost/RealatedPostsslice';
import filterSlice from '../features/filter/filterSlice';

export const store = configureStore({
  reducer: {
    posts:postsSlice,
    post:postSlice,
    realatedPost:RealatedPostsSlice,
    filter:filterSlice
   
  
  },
});
