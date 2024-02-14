import { ADD_BOOK, DELETE_BOOK, LOAD_BOOK, UPDATE_BOOK } from "./actionsType";

export default function booksReducer(state = [], action) {
  switch (action.type) {
    case LOAD_BOOK:
      return action.payload;
    case ADD_BOOK:
      return [...state,{...action.payload}];
    case UPDATE_BOOK:
      return state.map((book)=>book.id===action.payload.id?{...action.payload.book}:book);
    case DELETE_BOOK:
      return state.filter(book=>book.id!==action.payload);
    default:
      return state;
  }
}
