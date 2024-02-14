import { loadded_books } from "../actions";

 const Loadbooks = async (dispetch) => {
  const response = await fetch("  http://localhost:9000/books");
  let books = await response.json();
  dispetch(loadded_books(books));
};

export default Loadbooks;