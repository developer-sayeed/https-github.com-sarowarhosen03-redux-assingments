const store = require("./app/store");
const fetchRealatedVideos = require("./features/fetchVideos/thunk/fetchRealatedVideos");
const fetchVideo = require("./features/fetchVideos/thunk/fetchVideos");


store.dispatch(fetchVideo()).then(()=>store.dispatch(fetchRealatedVideos()));
