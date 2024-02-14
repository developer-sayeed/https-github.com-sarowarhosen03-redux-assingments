import { addedBook } from "../actions";
const addBook = (payload) => {
    return async (dispatch) => {
        const response = await fetch("http://localhost:9000/books", {
            method: "POST",
            body: JSON.stringify({
              ...payload
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        const book = await response.json();

        dispatch(addedBook(book));
    };
};

export default addBook;
