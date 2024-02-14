import React from "react";

export default function Error({ message }) {
  return (
    <div
      className="bg-red-100 border block border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block mx-3 sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
    
      </span>
    </div>
  );
}
