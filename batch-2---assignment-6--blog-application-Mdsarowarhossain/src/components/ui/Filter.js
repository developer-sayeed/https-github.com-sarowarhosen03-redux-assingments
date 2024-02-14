import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { habdelFilterchange } from "../../features/filter/filterSlice";

export default function Filter() {
  const usedispetch = useDispatch();
  const { sortBy, postType } = useSelector((state) => state.filter);
  const habdelChage = (e) => {
    const value =
      e.target.name === "filter" ? e.target.id === "lws-saved" : e.target.value;
    let payload = {
      name: e.target.name,
      value,
    };

    usedispetch(habdelFilterchange(payload));
  };

  return (
    <aside>
      <div className="sidebar-items">
        <div className="sidebar-content">
          <h4>Sort</h4>
          <select
            onChange={habdelChage}
            value={sortBy}
            name="sort"
            id="lws-sort"
            className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
          >
            <option value="">Default</option>
            <option value="newest">Newest</option>
            <option value="most_liked">Most Liked</option>
          </select>
        </div>
        <div className="sidebar-content">
          <h4>Filter</h4>
          <div className="radio-group">
            {/* <!-- handle filter on button click --> */}
            <div>
              <input
                onChange={habdelChage}
                type="radio"
                name="filter"
                id="lws-all"
                checked={!postType}
                className="radio"
              />
              <label htmlFor="lws-all">All</label>
            </div>
            <div>
              <input
                onChange={habdelChage}
                type="radio"
                name="filter"
                checked={postType}
                id="lws-saved"
                className="radio"
              />
              <label htmlFor="lws-saved">Saved</label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
