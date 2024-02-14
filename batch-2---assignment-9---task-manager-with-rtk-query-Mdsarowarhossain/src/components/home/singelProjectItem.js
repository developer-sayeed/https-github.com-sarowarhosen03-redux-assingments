import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { projectSelected } from "../../features/taskManager/taskManagerSlice";

export default function SingelProjectItem({ project }) {
  const [pstatus, setPStatus] = useState(true);
  const dispetch = useDispatch();

  const handelChange = (e) => {

    setPStatus(prev=>!prev)
    dispetch(projectSelected(project.id));
  };
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        checked={pstatus}
        className={project.colorClass}
        onChange={handelChange}
        
      />
      <p className="label">{project.projectName}</p>
    </div>
  );
}
