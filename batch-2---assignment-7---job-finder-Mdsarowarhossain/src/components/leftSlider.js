import React from "react";
import { useDispatch } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import { handelTypeChange } from "../features/Jobs/jobSlice";

export default function LeftSlider() {
  const usedispetch = useDispatch();
  const handelType = (type) => {
    usedispetch(handelTypeChange(type));
  };

  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
                    onClick={() => handelType("")}
              to="/"
              className={`main-menu  ${useMatch("/") && "menu-active"}`}
              id="lws-alljobs-menu"
            >
              <i className="fa-solid fa-briefcase"></i>
              <span> All Available Jobs</span>
            </Link>
            <ul className="space-y-6 lg:space-y-2 ">
              <li>
                <button
                  className="sub-menu"
                  onClick={() => handelType("internship")}
                  id="lws-internship-menu"
                >
                  <i className="fa-solid fa-stop !text-[#FF5757]"></i>
                  Internship
                </button>
              </li>
              <li>
                <button
                  onClick={() => handelType("fulltime")}
                  className="sub-menu"
                  id="lws-fulltime-menu"
                >
                  <i className="fa-solid fa-stop !text-[#FF8A00]"></i>
                  Full Time
                </button>
              </li>
              <li>
                <button
                  className="sub-menu "
                  onClick={() => handelType("remote")}
                  id="lws-remote-menu"
                >
                  <i className="fa-solid fa-stop !text-[#56E5C4]"></i>
                  Remote
                </button>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="/addJob"
              className={`main-menu  ${useMatch("/addJob") && "menu-active"}`}
              id="lws-addJob-menu"
            >
              <i className="fa-solid fa-file-circle-plus"></i>
              <span>Add NewJob</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
