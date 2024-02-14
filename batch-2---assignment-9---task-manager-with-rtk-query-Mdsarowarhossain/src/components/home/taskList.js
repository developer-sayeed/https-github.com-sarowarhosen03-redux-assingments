import React from "react";
import { Link } from "react-router-dom";
import SingelTask from "./singelTask";
import { useGetTasksQuery } from "../../features/taskManager/taskManagerApi";
import { useSelector } from "react-redux";
import Error from "../ui/error";

export default function TaskList() {
  const { data: tasks, isLoading, isError } = useGetTasksQuery();
  const { searchText, projectList } = useSelector((state) => state.filter);
  //  decide what to render
  let content = null;
  if (isLoading) content = <p>loading .......</p>;
  else if (!isLoading && isError)
    content = <Error message={"Their was an error ocuaurd on Fetch Tasks"} />;
  else if (!isLoading && !isError && tasks?.length === 0)
    content = <Error message={"No Task Found"} />;
  else if (!isLoading && !isError && tasks?.length > 0) {
    content = tasks
      .filter((task) => projectList.includes(task.project.id))
      .filter((task) => {
        if (searchText !== "") {
          return task.taskName.toLowerCase().startsWith(searchText);
        }
        return task;
      })
      .map((t) => <SingelTask key={t.id} task={t} />);
  }

  return (
    <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
      <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
        <Link to="/addNew" className="lws-addnew group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 group-hover:text-indigo-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          <span className="group-hover:text-indigo-500">Add New</span>
        </Link>
      </div>

      <div className="lws-task-list">{content}</div>
    </main>
  );
}
