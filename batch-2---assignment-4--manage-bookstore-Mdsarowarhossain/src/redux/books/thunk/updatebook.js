import { updateBook } from "../actions";
//ypdate the book 
const updateBookthunk = (bookid, payload) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:9000/books/${bookid}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...payload,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const book = await response.json();

    dispatch(updateBook(book.id, book));
  };
};

export default updateBookthunk;
