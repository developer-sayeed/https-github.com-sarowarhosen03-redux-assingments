import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetProjectsQuery,
  useGetTeamInfoQuery,
  useUpdateTaskMutation,
} from "../../features/taskManager/taskManagerApi";
import Error from "../ui/error";

export default function EditForm({ task }) {
  const [error, setError] = useState("");
  const { data: projects } = useGetProjectsQuery();
  const { data: team } = useGetTeamInfoQuery();
  const [updateTask, { isSuccess, isError }] = useUpdateTaskMutation();
  const naviget = useNavigate();
  useEffect(() => {
    if (isSuccess) naviget("/");
  }, [isSuccess, naviget]);
  useEffect(() => {
    if (isError) setError("Error Ocard while updating");
  }, [isError]);

  const [formdata, setFormdata] = useState({
    taskName: task.taskName,
    teamMember:
      task.teamMember.name ,
    projectName: task.project.projectName,
    deadline: task.deadline,
  });
  const { taskName, teamMember, projectName, deadline } = formdata;
  const handelChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    //get the team and project info
    if (projects.length > 0 && team.length > 0) {
      const project = projects.find(
        (p) => p.projectName === formdata.projectName
      );
      const updatedTeam = team.find((t) => t.name === formdata.teamMember);

      updateTask({
        id: task.id,
        data: {
          taskName,
          teamMember: updatedTeam,
          project: project,
          deadline,
          status: task.status,
        },
      });
    } else {
      setError("Error Ocard while updating");
    }
  };

  return (
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
          <option>Saad Hasan</option>
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
  );
}
