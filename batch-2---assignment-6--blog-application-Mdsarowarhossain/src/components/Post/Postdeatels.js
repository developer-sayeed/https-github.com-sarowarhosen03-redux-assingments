import React from "react";
import { useDispatch } from "react-redux";
import { updatePostsAsync } from "../../features/post/postSlice";
import GetTagList from "../ui/getTagList.";
export default function Postdeatels({ post }) {
  const usedisptch = useDispatch();
  const { title, image, tags, description, likes, isSaved, id } = post;
  const adnewLike = (id, prev) => {
    usedisptch(
      updatePostsAsync({
        id,
        data: {
          likes: prev+1,
        },
        type:'likes'
      })
    );
  };
  const savePost = (id, prev) => {
    usedisptch(
      updatePostsAsync({
        id,
        data: {
          isSaved: !prev,
        },
        type:'save'
      })
    );
  };
  return (
    <main className="post">
      <img
        src={image}
        alt="githum"
        className="w-full rounded-md"
        id="lws-megaThumb"
      />
      <div>
        <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
          {title}
        </h1>
        <div className="tags" id="lws-singleTags">
          <GetTagList tags={tags} />
        </div>
        <div className="btn-group">
          {/* <!-- handle like on button click --> */}
          <button
            onClick={(e) => adnewLike(id, likes)}
            className="like-btn"
            id="lws-singleLinks"
          >
            <i className="fa-regular fa-thumbs-up"></i> {likes}
          </button>
          {/* <!-- handle save on button click --> */}
          {/* <!-- use ".active" class and "Saved" text  if a post is saved, other wise "Save" --> */}
          <button
              onClick={(e) => savePost(id, isSaved)}
            className={`${isSaved ? "active" : ""} save-btn`}
            id="lws-singleSavedBtn"
          >
            <i className="fa-regular fa-bookmark"></i>{" "}
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
        <div className="mt-6">
          <p>{description}</p>
        </div>
      </div>
    </main>
  );
}
