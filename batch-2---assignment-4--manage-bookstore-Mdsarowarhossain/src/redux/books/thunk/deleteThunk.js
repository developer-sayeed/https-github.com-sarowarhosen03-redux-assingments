import { deleted } from "../actions";

const deleteBook = (bookid) => {
    return async (dispatch) => {
        await fetch(`http://localhost:9000/books/${bookid}`, {
            method: "DELETE",
        });

        dispatch(deleted(bookid));
    };
};

export default deleteBook;