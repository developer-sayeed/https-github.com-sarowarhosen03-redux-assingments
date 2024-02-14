import { configureStore } from '@reduxjs/toolkit';
import jobReducer from '../features/Jobs/jobSlice';

export const store = configureStore({
  reducer: {
    jobs:jobReducer,
  },
});
