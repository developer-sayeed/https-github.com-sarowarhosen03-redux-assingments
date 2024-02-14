import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditBookMutation } from "../../features/Api/apiSlice";

export default function EditBookForm({ book }) {
  const {
    id,
    name: Iname,
    author: Iauthor,
    thumbnail: Ithumbnail,
    price: Iprice,
    rating: Irating,
    featured: Ifeatured,
  } = book;
  const [editBook, { isLoading, isError, isSuccess }] = useEditBookMutation();
  const naviget = useNavigate();

  const [formData, setFormData] = useState({
    name: Iname,
    author: Iauthor,
    thumbnail: Ithumbnail,
    price: Iprice,
    rating: Irating,
    featured: Ifeatured,
  });

  const { name, author, thumbnail, price, rating, featured } = formData;

 useEffect(() => {
  if (isSuccess) naviget("/");
 }, [isSuccess,naviget])
 

  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "featured" ? e.target.checked : e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    editBook({
      id,
      data: {
        ...formData,
      },
    });
  };
  return (
    <form className="book-form" onSubmit={handelSubmit}>
      <div className="space-y-2">
        <label htmlFor="lws-bookName">Book Name</label>
        <input
          onChange={handelChange}
          required
          className="text-input"
          value={name}
          type="text"
          id="lws-bookName"
          name="name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lws-author">Author</label>
        <input
          onChange={handelChange}
          value={author}
          required
          className="text-input"
          type="text"
          id="lws-author"
          name="author"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lws-thumbnail">Image Url</label>
        <input
          onChange={handelChange}
          value={thumbnail}
          required
          className="text-input"
          type="text"
          id="lws-thumbnail"
          name="thumbnail"
        />
      </div>

      <div className="grid grid-cols-2 gap-8 pb-4">
        <div className="space-y-2">
          <label htmlFor="lws-price">Price</label>
          <input
            onChange={handelChange}
            value={price}
            required
            className="text-input"
            type="number"
            id="lws-price"
            name="price"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lws-rating">Rating</label>
          <input
            onChange={handelChange}
            value={rating}
            required
            className="text-input"
            type="number"
            id="lws-rating"
            name="rating"
            min="1"
            max="5"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          onChange={handelChange}
          checked={featured}
          id="lws-featured"
          type="checkbox"
          name="featured"
          className="w-4 h-4"
        />
        <label htmlFor="lws-featured" className="ml-2 text-sm">
          {" "}
          This is a featured book{" "}
        </label>
      </div>
      {isError && (
        <div>
          <p>There was an error ocurd while editing book</p>
        </div>
      )}
      <button
        disabled={isLoading}
        type="submit"
        className="submit"
        id="lws-submit"
      >
        Edit Book
      </button>
    </form>
  );
}
