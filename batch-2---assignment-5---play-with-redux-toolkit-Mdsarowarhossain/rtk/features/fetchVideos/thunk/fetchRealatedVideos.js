const { createAsyncThunk } = require("@reduxjs/toolkit");
const { default: fetch } = require("node-fetch");

const fetchRealatedVideos = createAsyncThunk(
  "video/fetchRealatedVideoss",
  async (_, { getState }) => {
    let videoTag = getState().videos.video.tags;
    let quryString = videoTag.map((tag) => `tags_like=${tag}`).join("&");

    let response = await fetch(`http://localhost:9000/videos?${quryString}`);
    let videos = await response.json();
    // assuming that the array of objects is stored in a variable called 'videos'
    let sortedVideoList = videos.sort(function (a, b) {
      return b.views.replace("k", "") - a.views.replace("k", "");
    });

    return sortedVideoList;
  }
);

module.exports = fetchRealatedVideos;
