import React from "react";
import Projects from "../components/home/projects";
import TeamList from "../components/home/teamList";
import TaskList from "../components/home/taskList";

export default function Home() {

  return (
    <div className="container relative">
      <div className="sidebar">
        {/* <!-- Projects List --> */}

        <Projects />
        {/* <!-- Team Members --> */}
        <TeamList />
      </div>

      <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
        <TaskList />
      </div>
    </div>
  );
}
