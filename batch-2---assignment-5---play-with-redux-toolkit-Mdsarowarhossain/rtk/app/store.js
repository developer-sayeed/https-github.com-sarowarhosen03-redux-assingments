const { configureStore } = require("@reduxjs/toolkit");
const { default: logger } = require("redux-logger");
const videoSlice=require('../features/fetchVideos/videoslice');

let store = configureStore({
    reducer:{
        videos:videoSlice
    },
    middleware: (getDefaultMiddleware) =>{
    return    getDefaultMiddleware().concat(logger);
    }
})
module.exports = store;