import React from "react";
import { useDispatch, useSelector } from "react-redux";
import addBook from "../../redux/books/thunk/addBooksThunk";
import updateBookthunk from "../../redux/books/thunk/updatebook";
import { onClearForm, onFromChange } from "../../redux/formHalder/actions";

export default function AddBookform() {
  const usedispetch = useDispatch();
  let formdata = useSelector((state) => state.formdata);
  let { name, author, thumbnail, price, rating, featured } = formdata.data;
  const handelChange = (e) =>
    usedispetch(
      onFromChange(
        e.target.name,
        e.target.name === "featured" ? e.target.checked : e.target.value
      )
    );
  const handelSubmit = (e) => {
   formdata.editMode? usedispetch(updateBookthunk(formdata.data.id,formdata.data)): usedispetch(addBook({name, author, thumbnail, price, rating, featured}));
    usedispetch(onClearForm());
    e.preventDefault();
  };

  return (
    <div className="p-4 overflow-hidden bg-white shadow-cardShadow rounded-md">
      <h4 className="mb-8 text-xl font-bold text-center">Add New Book</h4>
      <form className="book-form" onSubmit={handelSubmit}>
        <div className="space-y-2">
          <label htmlFor="name">Book Name</label>
          <input
            required
            className="text-input"
            type="text"
            id="input-Bookname"
            name="name"
            value={name}
            onChange={handelChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category">Author</label>
          <input
            required
            className="text-input"
            type="text"
            id="input-Bookauthor"
            name="author"
            value={author}
            onChange={handelChange}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="image">Image Url</label>
          <input
            required
            className="text-input"
            type="text"
            id="input-Bookthumbnail"
            name="thumbnail"
            value={thumbnail}
            onChange={handelChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-8 pb-4">
          <div className="space-y-2">
            <label htmlFor="price">Price</label>
            <input
              required
              className="text-input"
              type="number"
              id="input-Bookprice"
              name="price"
              value={price}
              onChange={handelChange}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="quantity">Rating</label>
            <input
              required
              className="text-input"
              type="number"
              id="input-Bookrating"
              name="rating"
              value={rating}
              min="1"
              max="5"
              onChange={handelChange}
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="input-Bookfeatured"
            type="checkbox"
            name="featured"
            className="w-4 h-4"
            checked={featured}
            onChange={handelChange}
          />
          <label htmlFor="featured" className="ml-2 text-sm">
            {" "}
            This is a featured book{" "}
          </label>
        </div>

        <button type="submit" className="submit" id="submit">
          {formdata.editMode ? "Update Book details" : "Add Book"}
        </button>
      </form>
    </div>
  );
}
