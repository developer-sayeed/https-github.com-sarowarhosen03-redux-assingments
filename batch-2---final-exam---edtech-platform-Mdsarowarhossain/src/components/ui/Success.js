import React from 'react'

const Success = ({message}) => {
    return (
        <div
          className="bg-green-100 border block border-green-700 text-green-700 px-4 py-2 rounded relative"
          role="alert"
        >
          <span className="block mx-3 sm:inline">{message}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        
          </span>
        </div>
      );
}

export default Success