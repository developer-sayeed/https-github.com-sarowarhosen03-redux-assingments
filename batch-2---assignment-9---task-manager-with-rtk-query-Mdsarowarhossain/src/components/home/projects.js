import React from "react";
import { useGetProjectsQuery } from "../../features/taskManager/taskManagerApi";
import Error from "../ui/error";
import SingelProjectItem from "./singelProjectItem";
export default function Projects() {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  //  decide what to render
  let content = null;
  if (isLoading) content = <p>loading .......</p>;
  else if (!isLoading && isError)
    content = <Error message={"Their was an error ocuaurd on Fetch Projects"} />;
  else if (!isLoading && !isError && projects?.length === 0)
    content = <Error message={"No Project Found"} />;
  else if (!isLoading && !isError && projects?.length > 0) {
    content = projects.map((project) => (
      <SingelProjectItem key={project.id} project={project} />
    ));
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
