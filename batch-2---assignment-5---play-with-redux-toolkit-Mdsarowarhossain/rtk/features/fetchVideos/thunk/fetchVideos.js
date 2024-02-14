const { createAsyncThunk } = require("@reduxjs/toolkit");
const { default: fetch } = require("node-fetch");
const fetchRealatedVideos = require("./fetchRealatedVideos");

const fetchVideo = createAsyncThunk(
  "video/fetchVideo",
  async () => {
    //getting the video object
    const response = await fetch("http://localhost:9000/videos");
    let data= await response.json();
    return data;
  }
);





module.exports = fetchVideo;
