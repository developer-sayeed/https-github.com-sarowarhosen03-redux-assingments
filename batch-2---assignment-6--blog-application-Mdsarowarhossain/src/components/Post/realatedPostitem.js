import React from "react";
import { Link } from "react-router-dom";
import GetTagList from "../ui/getTagList.";

export default function RealatedPostitem({ post }) {
  const { title, image, id, tags, createdAt } = post;
  return (
    <div className="card">
      <Link to={`/post/${id}`}>
        <img src={image} className="card-image" alt="" />
      </Link>
      <div className="p-4">
        <Link
          to={`/post/${id}`}
          className="text-lg post-title lws-RelatedPostTitle"
        >
          {title}
        </Link>
        <div className="mb-0 tags">
          <GetTagList tags={tags} />
        </div>
        <p>{createdAt}</p>
      </div>
    </div>
  );
}
