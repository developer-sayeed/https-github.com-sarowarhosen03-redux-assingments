import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/image/learningportal.svg";
import { adminLoggedOut, userLoggedOut } from "../../features/auth/authSlice";
import Cookies from "js-cookie";
import useAuth from "../../hooks/useAuth";
import { selectUser } from "../../features/student/studentSelectors";
export default function NavBar() {
  const { pathname } = useLocation();
  const naviget = useNavigate();
  const dispetch = useDispatch();
  const isLoggedIn = useAuth();
  const isAdmin = pathname.includes("admin");
  
  //get the current user from the redux store
  const user = useSelector((state) => selectUser(state, isAdmin));

  const handelLogout = () => {
    if (isAdmin) {
      Cookies.remove("adminAuth");
      dispetch(adminLoggedOut());
      naviget("/admin");
    } else {
      Cookies.remove("userAuth");
      dispetch(userLoggedOut());
      naviget("/");
    }
  };
  return (
    <div>
      {isLoggedIn && (
        <nav className="shadow-md">
          <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
            <img
              onClick={() => (isAdmin ? naviget("/admin") : naviget("/course"))}
              className="h-10"
              src={logo}
              alt="logo "
            />
            <div className="flex items-center gap-3">
              {!isAdmin && (
                <>
                  <NavLink
                    to="/course"
                    className="nav-btn border-cyan hover:bg-indigo-700 "
                  >
                    course
                  </NavLink>
                  <NavLink
                    to="/Leaderboard"
                    className="nav-btn border-cyan hover:bg-indigo-700"
                  >
                    Leaderboard
                  </NavLink>
                </>
              )}
              <h2 className="font-bold ">{user.name}</h2>
              <button
                onClick={handelLogout}
                className="nav-btn border-cyan hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
