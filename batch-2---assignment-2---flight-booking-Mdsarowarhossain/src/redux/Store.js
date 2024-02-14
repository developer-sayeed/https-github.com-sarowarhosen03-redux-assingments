import { applyMiddleware, createStore } from "redux";
//import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./RootReducers";

//dev version

// const store = createStore(rootReducer,composeWithDevTools(applyMiddleware()));

//production version

const store = createStore(rootReducer);

export default store;
