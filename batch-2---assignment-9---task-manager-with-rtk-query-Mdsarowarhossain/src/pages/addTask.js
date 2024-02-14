import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../components/ui/error";
import {
  useAddTaskMutation,
  useGetProjectsQuery,
  useGetTeamInfoQuery,
} from "../features/taskManager/taskManagerApi";

export default function AddTask() {
  const [error, setError] = useState("");
  const [formdata, setFormdata] = useState({
    taskName: "",
    teamMember: "",
    projectName: "",
    deadline: "",
  });
  const [addTask, { isSuccess }] = useAddTaskMutation();
  const { data: projects } = useGetProjectsQuery();
  const { data: team } = useGetTeamInfoQuery();

  const { taskName, teamMember, projectName, deadline } = formdata;

  const naviget = useNavigate();
  useEffect(() => {
    if (isSuccess) naviget("/");
  }, [isSuccess, naviget]);

  const handelChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    //get the team and project info
    if (projects?.length > 0 && team?.length > 0) {
      const project = projects.find(
        (p) => p.projectName === formdata.projectName
      );
      const updatedTeam = team.find((t) => t.name === formdata.teamMember);

      addTask({
        taskName,
        teamMember: updatedTeam,
        project: project,
        deadline,
      });
    } else {
      setError("Error Ocard while Adding");
    }
  };

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form className="space-y-6" onSubmit={handelSubmit}>
            <div className="fieldContainer">
              <label htmlFor="lws-taskName">Task Name</label>
              <input
                value={taskName}
                onChange={handelChange}
                type="text"
                name="taskName"
                id="lws-taskName"
                required
                placeholder="Implement RTK Query"
              />
            </div>

            <div className="fieldContainer">
              <label>Assign To</label>
              <select
                onChange={handelChange}
                name="teamMember"
                value={teamMember}
                id="lws-teamMember"
                required
              >
                <option value="" hidden>
                  Select Job
                </option>
                <option>Sumit Saha</option>
                <option >Saad Hasan</option>
                <option>Akash Ahmed</option>
                <option>Md Salahuddin</option>
                <option>Riyadh Hassan</option>
                <option>Ferdous Hassan</option>
                <option>Arif Almas</option>
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-projectName">Project Name</label>
              <select
                onChange={handelChange}
                id="lws-projectName"
                value={projectName}
                name="projectName"
                required
              >
                <option value="" hidden>
                  Select Project
                </option>
                <option>Scoreboard</option>
                <option>Flight Booking</option>
                <option>Product Cart</option>
                <option>Book Store</option>
                <option>Blog Application</option>
                <option>Job Finder</option>
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-deadline">Deadline</label>
              <input
                onChange={handelChange}
                type="date"
                name="deadline"
                value={deadline}
                id="lws-deadline"
                required
              />
            </div>
        
      {error !== "" && <Error message={error} />}
            <div className="text-right">
              <button type="submit" className="lws-submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
