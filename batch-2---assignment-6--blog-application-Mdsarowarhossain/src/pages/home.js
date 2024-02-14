import React from "react";
import PostGrid from "../components/Grid/PostGrid";
import Filter from "../components/ui/Filter";

export default function Home() {
  return (
    <>
      <section className="wrapper">
        <Filter />
        <PostGrid />
      </section>
    </>
  );
}
