import { combineReducers } from "redux";
import booksReducer from "./books/bookreducer";
import FilterReducer from "./Filter/filterReducer";
import formcontroler from "./formHalder/formReducer";


export default combineReducers({
    formdata:formcontroler,
    books:booksReducer,
    filter:FilterReducer
})