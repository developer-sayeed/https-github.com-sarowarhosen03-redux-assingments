import React from 'react'

export default function GetTagList({tags}) {
  return (
    <>
        {tags.map((tag, index) => (
        <span key={index}>
          #{tag+''}
          {tags.length - 1 === index ? "" : ","}
        </span>
      ))}
    </>

  )
}
