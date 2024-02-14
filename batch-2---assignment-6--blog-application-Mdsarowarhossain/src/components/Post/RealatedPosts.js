import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { realatedPostsAsync } from "../../features/realatedPost/RealatedPostsslice";
import RealatedPostitem from "./realatedPostitem";

export default function RealatedPosts({ tags, id }) {
  const usedispetch = useDispatch();
  const { isLoading, isError, error, reallatedPosts } = useSelector(
    (state) => state.realatedPost
  );
  useEffect(() => {
    usedispetch(realatedPostsAsync({ tags, id }));
  }, [tags, id, usedispetch]);

  //deside what to render
  let content;

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

  if (!isLoading && !isError) {
    content = reallatedPosts.map((post) => (
      <RealatedPostitem key={post.id} post={post} />
    ));
  }

  return (
    <aside>
      <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">
        Related Posts
      </h4>
      <div className="space-y-4 related-post-container">{content}</div>
    </aside>
  );
}
