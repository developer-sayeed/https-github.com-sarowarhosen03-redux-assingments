import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetBooksQuery } from "../../features/Api/apiSlice";
import BookCard from "../Card/bookCard";


export default function Home() {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [ featured,setfeatured]= useState(false);
  const { filterText } = useSelector((state) => state.filterBy);
  //decide what to render
  let content = null;
  if (isLoading) content = <h3>Loading ...</h3>;
  if (!isLoading && isError) content = <h2 > There was an error  ocuard to fetch books</h2>;
  if (!isLoading && !isError && books.length === 0)
    content = <h2> No Book Found</h2>;
  if (!isLoading && !isError && books.length > 0) {
    content = books
      .filter((book) => {
        if(featured)return book.featured===true;
        return true;

      })
      .filter((book) => {
        if(filterText!=='')return book.name.toLowerCase().startsWith(filterText);
        return true;

      })

      .map((book) => <BookCard key={book.id} book={book} />);
  }
  return (
    <main className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <div className="flex items-center justify-between mb-12">
          <h4 className="mt-2 text-xl font-bold">Book List</h4>

          <div className="flex items-center space-x-4">
            <button onClick={()=>setfeatured(false)} className={`lws-filter-btn ${!featured&&'active-filter'}`}>All</button>
            <button onClick={()=>setfeatured(true)} className={`lws-filter-btn ${featured&&'active-filter'}`}>Featured</button>
          </div>
        </div>
        <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* <!-- Card 1 --> */}
          {content}
        </div>
      </div>
    </main>
  );
}
