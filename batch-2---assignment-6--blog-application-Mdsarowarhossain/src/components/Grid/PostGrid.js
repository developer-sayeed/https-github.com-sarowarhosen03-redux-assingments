import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsAsync } from "../../features/Posts/PostsSlice";
import POstGridItem from "./POstGridItem";

export default function PostGrid() {
  const usedisptech = useDispatch();
  const state = useSelector((state) => state);
  const { posts, isLoading, isError, error } = state.posts;
  const { sortBy, postType } = state.filter;

  useEffect(() => {
    usedisptech(postsAsync());
  }, [usedisptech]);

  const sortPost = (postlist, text) => {
    if (text !== "") {
      let sortlist;
      if (text === "newest") {
        sortlist = postlist.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      } else if(text==='most_liked') {
        sortlist = postlist.sort((a, b) => {
          return b.likes -  a.likes;
        });
      }

      return sortlist.map((post) => <POstGridItem key={post.id} post={post} />);
    }
    return postlist.map((post) => <POstGridItem key={post.id} post={post} />);
  };

  //desie what to render
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
  if (!isLoading && !isError && posts.length === 0) {
    content = (
      <div>
        <h2>No Post Found</h2>
      </div>
    );
  }

  if (!isLoading && !isError && posts.length > 0) {
    let postList;
    if (!postType) {
      postList = posts.map((post) => post);
      // postList = posts.map
    } else {
      postList = posts.filter((post) => post.isSaved);
    }
    content = sortPost(postList, sortBy);
  }
  return (
    <main className="post-container" id="lws-postContainer">
      {content}
    </main>
  );
}
