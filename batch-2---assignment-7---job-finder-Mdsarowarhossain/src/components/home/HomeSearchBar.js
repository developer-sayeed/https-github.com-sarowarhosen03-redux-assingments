import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  onSearch, updateSort } from "../../features/Jobs/jobSlice";

export default function HomeSearchBar() {
  const usedispetch = useDispatch();
  const {searhText,sortText} = useSelector(state=>state.jobs)
  const [serchText, setSerchText] = useState(searhText);

  const handelSort = (e) => {
    usedispetch(updateSort(e.target.value));
  };
  const handelSearch = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      usedispetch(onSearch(serchText));
    }
    if (e.target.value === "") {
      usedispetch(onSearch(serchText));
    }
  };

  
  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <h1 className="lws-section-title">All Available Jobs</h1>
      <div className="flex gap-4">
        <div className="search-field group flex-1">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
          onChange={(e)=>setSerchText(e.target.value)}
            value={serchText}
            type="text"
            placeholder="Search Job"
            className="search-input"
            id="lws-searchJob"
            onKeyUp={handelSearch}
          />
        </div>
        <select
        value={sortText}
          id="lws-sort"
          name="sort"
          autoComplete="sort"
          className="flex-1"
          onChange={handelSort}
        >
          <option>Default</option>
          <option>Salary (Low to High)</option>
          <option>Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
}
