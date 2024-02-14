import { LOAD_BOOK,DELETE_BOOK, ADD_BOOK, UPDATE_BOOK } from "./actionsType";

export const loadded_books = (books) =>{
   return {
    type: LOAD_BOOK,
    payload: books,
   };
}
export const addedBook = (payload) =>{
   return {
    type: ADD_BOOK,
    payload
   };
}
export const updateBook = (id,book) =>{
   return {
    type: UPDATE_BOOK,
    payload:{id,book}
   };
}
export const deleted = (id) =>{
   return {
    type: DELETE_BOOK,
    payload: id,
   };
}