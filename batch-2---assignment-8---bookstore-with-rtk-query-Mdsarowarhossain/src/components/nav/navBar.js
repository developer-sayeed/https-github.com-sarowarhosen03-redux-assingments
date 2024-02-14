import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { filterBook } from "../../features/filter/filteConfig";
export default function NavBar() {
  const usedisptch = useDispatch();
  const [filterTextInput, setFilteTestInput] = useState("");
  const handelSearch = (e) => {
    e.preventDefault();
    usedisptch(filterBook(filterTextInput));
  };
  const habdelChange = (e) => {
    setFilteTestInput(e.target.value);
    if (e.target.value === "") usedisptch(filterBook(""));
  };
  return (
    <nav className="py-4 2xl:px-6">
      <div className="container flex items-center justify-between">
        <img
          src={logo}
          width="150px"
          alt="logo.svg"
          className="object-contain"
        />

        <ul className="hidden md:flex items-center space-x-6">
          <Link
            className="font-semibold cursor-pointer"
            to="/"
            id="lws-bookStore"
          >
            <li>Book Store</li>
          </Link>
          <Link className="cursor-pointer" to="/addBook" id="lws-addBook">
            <li>Add Book</li>
          </Link>
        </ul>

        <form className="flex items-center" onSubmit={handelSearch}>
          <div className="group relative rounded-md bg-white">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-primary"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              ></path>
            </svg>
            <input
              value={filterTextInput}
              type="text"
              onChange={habdelChange}
              placeholder="Filter books..."
              className="search"
              id="lws-search"
            />
          </div>
        </form>
      </div>
    </nav>
  );
}
