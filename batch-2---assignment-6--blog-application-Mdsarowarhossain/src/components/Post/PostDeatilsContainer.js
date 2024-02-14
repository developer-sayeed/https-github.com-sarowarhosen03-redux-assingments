import React, { useEffect } from "react";
import RealatedPosts from "./RealatedPosts";
import PostDeateals from "./Postdeatels";
import { useDispatch, useSelector } from "react-redux";
import { postAsync } from "../../features/post/postSlice";
import { useParams } from "react-router-dom";

export default function PostDeatilsContainers() {
  const { postId } = useParams();
  const { isLoading, isError, error, post } = useSelector(
    (state) => state.post
  );

  const usedisptech = useDispatch();
  useEffect(() => {
    usedisptech(postAsync({ id: postId }));
  }, [usedisptech, postId]);

  //deside what to render
  let content;
  //deside related post render or not

  if (isLoading) {
    content = (
      <div>
        <h2>Loading ...</h2>
      </div>
    );
  }
  if (!isLoading && isError) {
    content = (
      <div>
        <h2>{error}</h2>
      </div>
    );
  }
  if (!isLoading && !isError && post.id === undefined) {
    content = (
      <div>
        <h2>No Post Found</h2>
      </div>
    );
  }

  if (!isLoading && !isError && post.id !== undefined) {
    content = <PostDeateals post={post} />;
   
  }

  return (
    <section className="post-page-container">
      {content}

      <RealatedPosts tags={post?.tags||[]} id={post?.id} />
    </section>
  );
}
