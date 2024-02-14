import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { taskSearch } from "../../features/taskManager/taskManagerSlice";
export default function NavBar() {
  const dispetch = useDispatch();
  const [searcText, setSearcText] = useState("");
  useEffect(() => {
    dispetch(taskSearch(searcText));
  }, [searcText, dispetch]);
  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:searcText-blue-500"></i>
          <input
            style={{
              color: "black",
            }}
            value={searcText}
            type="text"
            onChange={(e) => setSearcText(e.target.value)}
            placeholder="Search Task"
            className="search-input"
            id="lws-searchTask"
          />
        </div>
      </div>
    </nav>
  );
}
