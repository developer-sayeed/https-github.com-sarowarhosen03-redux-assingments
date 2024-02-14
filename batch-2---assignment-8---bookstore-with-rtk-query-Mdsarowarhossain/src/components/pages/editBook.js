import React from "react";
import EditBookForm from "../form/editBookForm";
import { useGetBookQuery } from "../../features/Api/apiSlice";
import { useParams } from "react-router-dom";
export default function EditBook() {
  const {id} = useParams();
  const { data: book, isLoading, isError } = useGetBookQuery(id);
  //decide what to render
  let content = null;
  if (isLoading) content =<h3>Loading ......</h3>;
  if (!isLoading && isError)
    content = <h2> There was an error ocuard to fetch book</h2>;
  if (!isLoading && !isError && book.name === undefined)
    content = <h2> No Record Found</h2>;
  if (!isLoading && !isError && book.name !== undefined)
    content = <EditBookForm book={book} />;

  return (
    <main className="py-6 2xl:px-6">
      <div className="container">
        <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
          <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
          {content}
        </div>
      </div>
    </main>
  );
}
