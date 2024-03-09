import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  document.title = "404 Not Found";
  return (
    <div className="flex flex-col justify-center h-screen items-center text-3xl font-bold">
      <h1 className="mb-4">404 Not Found</h1>
      <Link
        to={"/"}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Go Back To Home
      </Link>
    </div>
  );
};

export default NotFound;
