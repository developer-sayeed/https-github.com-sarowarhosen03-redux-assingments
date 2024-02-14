const { createSlice } = require("@reduxjs/toolkit");
const fetchRealatedVideos = require("./thunk/fetchRealatedVideos");
const fetchVideo = require("./thunk/fetchVideos");

// initial State
const initialState = {
  loading: false,
  video: {},
  error: "",
  relatedVideos: {
    loading: false,
    videos: [],
    error: "",
  },
};

//creating slice
let videoSlice = createSlice({
  name: "videos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    //add case for related Videos
    builder
    .addCase(fetchRealatedVideos.pending, (state, action) => {
      state.relatedVideos.loading = true;
    })
    .addCase(fetchRealatedVideos.fulfilled, (state, action) => {
      state.relatedVideos.loading = false;
      state.relatedVideos.videos = action.payload;
    })
    .addCase(fetchRealatedVideos.rejected, (state, action) => {
      state.loading = false;
      state.fetchRealatedVideos.error = action.error.message;
    });

  },
});
module.exports = videoSlice.reducer;
module.exports.videoSliceActions = videoSlice.actions;
