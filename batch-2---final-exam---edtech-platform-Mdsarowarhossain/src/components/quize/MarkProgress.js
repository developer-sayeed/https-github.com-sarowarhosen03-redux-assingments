import React from 'react'

const MarkProgress = ({mark}) => {
  return (
<div className="relative w-20 h-20 ml-2">
  <svg className="absolute inset-0" viewBox="0 0 24 24">
    <circle
      className="stroke-current text-red-500"
      strokeWidth="4"
      fill="transparent"
      r="10"
      cx="12"
      cy="12"
    />
    {mark > 0 && (
      <circle
        className="stroke-current text-green-500"
        strokeWidth="4"
        fill="transparent"
        r="10"
        cx="12"
        cy="12"
        style={{
          strokeDasharray: `${Math.PI * 20}px`,
          strokeDashoffset: `${(100 - mark) / 100 * Math.PI * 20}px`,
          strokeLinecap: "round",
        }}
      />
    )}
    {mark < 100 && (
      <circle
        className="stroke-current text-red-500"
        strokeWidth="4"
        fill="transparent"
        r="10"
        cx="12"
        cy="12"
        style={{
          strokeDasharray: `${Math.PI * 20}px`,
          strokeDashoffset: `${-mark / 100 * Math.PI * 20}px`,
          strokeLinecap: "round",
        }}
      />
    )}
  </svg>
  <span className="flex justify-center items-center h-full text-xl font-bold">
    {mark + " %"}
  </span>
</div>

  
  )
}

export default MarkProgress