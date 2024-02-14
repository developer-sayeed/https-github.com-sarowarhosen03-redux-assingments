import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addJob,
  fetchJobs,
  updateJob,
  deleteJob,
  getTargetJob,
} from "./JobApi";
const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  jobs: [],
  editingItem: {
    isLoading: false,
    isError: false,
    error: "",
    editItem: {},
  },
  sortText: "",
  searhText: "",
  type: "",
};

export const creatJobAsync = createAsyncThunk(
  "jobs/createAsync",
  async (data) => {
    const respose = await addJob(data);
    return respose;
  }
);

export const fetchJobAsync = createAsyncThunk("jobs/fetchAsync", async () => {
  const respose = await fetchJobs();
  return respose;
});

export const updateJobAsync = createAsyncThunk(
  "jobs/updateAsync",
  async ({ id, data }) => {
    const respose = await updateJob({ id, data });
    return respose;
  }
);

export const deleteJobAsync = createAsyncThunk(
  "jobs/deleteAsync",
  async (id) => {
    const respose = await deleteJob(id);
    return respose;
  }
);

export const getEditJobAsync = createAsyncThunk(
  "jobs/getEditAsync",
  async (id) => {
    const respose = await getTargetJob(id);
    return respose;
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    updateSort: (state, action) => {
      state.sortText = action.payload;
    },
    onSearch: (state, action) => {
      state.searhText = action.payload;
    },
    handelTypeChange: (state, action) => {
      state.type = action.payload;
    },
  },
  extraReducers: (builder) => {
    //create job
    builder
      .addCase(creatJobAsync.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(creatJobAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs.push(action.payload);
      })
      .addCase(creatJobAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
    //fetch Jobs
    builder
      .addCase(fetchJobAsync.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchJobAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
    //update job

    //do nothing
    //Delete job

    builder
      .addCase(deleteJobAsync.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(deleteJobAsync.fulfilled, (state, action) => {

        state.isLoading = false;
        state.jobs = state.jobs.filter((job) => job.id !== action.meta.arg);
      })
      .addCase(deleteJobAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });

    //get target job

    builder
      .addCase(getEditJobAsync.pending, (state, action) => {
        state.editingItem.isLoading = true;
        state.editingItem.isError = false;
        state.editingItem.error = "";
      })
      .addCase(getEditJobAsync.fulfilled, (state, action) => {
        state.editingItem.isLoading = false;
        state.editingItem.editItem = action.payload;
      })
      .addCase(getEditJobAsync.rejected, (state, action) => {
        state.editingItem.isLoading = false;
        state.editingItem.isError = true;
        state.editingItem.error = action.error?.message;
      });
  },
});

export default jobsSlice.reducer;
export const { updateSort, onSearch, handelTypeChange } = jobsSlice.actions;
