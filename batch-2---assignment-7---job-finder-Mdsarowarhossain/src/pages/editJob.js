import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditForm from "../components/forms/editForm";
import { getEditJobAsync } from "../features/Jobs/jobSlice";

export default function EditJob() {
  const { id } = useParams();
  const dispetch = useDispatch();
  useEffect(() => {
    dispetch(getEditJobAsync(id));
  }, [dispetch, id]);

  const { isLoading, isError, editItem } = useSelector(
    (state) => state.jobs.editingItem
  );
  //decid what to render

  let content = null;
  if (isLoading) {
    content = (
      <p
        style={{
          color: "white",
        }}
      >
        Loading ......
      </p>
    );
  }
  if (!isLoading && isError) {
    content = (
      <p
        style={{
          color: "white",
        }}
      >
        Error ocaurd while getting the job data
      </p>
    );
  }
  if (!isLoading && !isError && editItem.id === undefined) {
    content = (
      <p
        style={{
          color: "white",
        }}
      >
        No Job Data Found
      </p>
    );
  }
  if (!isLoading && !isError && editItem.id !== undefined) {
    content = <EditForm job={editItem} />;
  }
  return (
 
      <div className="lg:pl-[14rem] mt-[5.8125rem]">
        <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
          <h1 className="mb-10 text-center lws-section-title">Edit Job</h1>
          {content}
          <div className="max-w-3xl mx-auto"></div>
        </main>
      </div>
   
  );
}
