import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loadbooks from "../../redux/books/thunk/LoadBooks";
import { setFilterBook } from "../../redux/Filter/Actions";
import AddBookform from "./AddBookform";
import BookCard from "./BookCard";

export default function BooksHome() {
  //load data from server

  const usedispetch = useDispatch();
  useEffect(() => {
    usedispetch(Loadbooks);
  }, []);

  //get the book sist
  const booklist = useSelector((state) => state.books);
  const filterConf = useSelector((state) => state.filter);
  let {Featured, filterText}= filterConf;
  //habdel filter

  const habdelfeature = (value) => {
    usedispetch(setFilterBook(value));
  };

let queryResult;

  filterText !== ''?queryResult = booklist.filter(book => book.name.toLowerCase().startsWith(filterText.toLowerCase())) :  queryResult = booklist;



  return (
    <main className="py-12 2xl:px-6">
      <div className="container grid xl:grid-cols-[auto_350px] 2xl:grid-cols-[auto_400px] gap-4 2xl:gap-8">
        <div className="order-2 xl:-order-1">
          <div className="flex items-center justify-between mb-12">
            <h4 className="mt-2 text-xl font-bold">Book List</h4>

            <div className="flex items-center space-x-4">
              <button
                onClick={(e) => habdelfeature(false)}
                className={`filter-btn  ${
                  !Featured ? "active-filter" : ""
                }`}
                id="lws-filterAll"
              >
                All
              </button>
              <button
                onClick={(e) => habdelfeature(true)}
                className={`filter-btn  ${
                  Featured ? "active-filter" : ""
                }`}
                id="lws-filterFeatured"
              >
                Featured
              </button>
            </div>
          </div>
          <div className="lws-bookContainer">
            {
            Featured
              ? queryResult
                  .filter((book) => book.featured)
                  .map((book) => <BookCard key={book.id} book={book} />)
              : queryResult.map((book) => <BookCard key={book.id} book={book} />)
              
              }
          </div>
        </div>
        <div>
          <AddBookform />
        </div>
      </div>
    </main>
  );
}
