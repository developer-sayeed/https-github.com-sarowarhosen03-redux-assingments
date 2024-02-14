import React from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/edit/editForm";
import { useGetTaskQuery } from "../features/taskManager/taskManagerApi";

export default function EditTask() {
  const {id}= useParams();
  const { data: task, isLoading, isError } = useGetTaskQuery(id);

  //  decide what to render
  let content = null;
  if (isLoading) content = <p>loading .......</p>;
  else if (!isLoading && isError)
    content = <p>Their was an error ocuaurd on Fetch data</p>;
  else if (!isLoading && !isError && task?.id) {
    content = <EditForm task={task} />;
  }

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Edit Task Information
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          {content}
        </div>
      </main>
    </div>
  );
}
