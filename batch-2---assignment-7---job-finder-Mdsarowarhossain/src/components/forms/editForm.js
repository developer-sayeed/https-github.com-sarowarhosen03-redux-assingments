import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateJobAsync } from "../../features/Jobs/jobSlice";

export default function EditForm({ job }) {
  const dispetch = useDispatch();

  const {
    title: iTitle,
    type: iType,
    salary: iSalary,
    deadline: iDeadline,
    id,
  } = job;
  const [formData, setFormData] = useState({
    title: iTitle,
    type: iType,
    salary: iSalary,
    deadline: iDeadline,
  });
  const [error, setError] = useState(false);
  const navigat = useNavigate();



  const { title, type, salary, deadline } = formData;

  const handelFormDataChange = (name, value) => {
    setFormData((oldFormData) => {
      return {
        ...oldFormData,
        [name]: value,
      };
    });
  };
  //habdel form submit

  const handelFormSubmit = async (e) => {
    try {
      e.preventDefault();
      await dispetch(updateJobAsync({ id, data: formData })).unwrap();
      navigat("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handelFormSubmit}>
      <div className="fieldContainer">
        <label
          htmlFor="lws-JobTitle"
          className="text-sm font-medium text-slate-300"
        >
          Job Title
        </label>
        <select
          id="lws-JobTitle"
          name="lwsJobTitle"
          value={title}
          onChange={(e) => handelFormDataChange("title", e.target.value)}
          required
        >
          <option value="" hidden>
            Select Job
          </option>
          {/* { remove  selected property for avoid warning  on console} */}
          <option>Software Engineer</option>
          <option>Software Developer</option>
          <option>Full Stack Developer</option>
          <option>MERN Stack Developer</option>
          <option>DevOps Engineer</option>
          <option>QA Engineer</option>
          <option>Product Manager</option>
          <option>Social Media Manager</option>
          <option>Senior Executive</option>
          <option>Junior Executive</option>
          <option>Android App Developer</option>
          <option>IOS App Developer</option>
          <option>Frontend Developer</option>
          <option>Frontend Engineer</option>
        </select>
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-JobType">Job Type</label>
        <select
          id="lws-JobType"
          name="lwsJobType"
          value={type}
          onChange={(e) => handelFormDataChange("type", e.target.value)}
          required
        >
          <option value="" hidden>
            Select Job Type
          </option>
          {/* { remove  selected property for avoid warning  on console} */}
          <option>Full Time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-JobSalary">Salary</label>
        <div className="flex border rounded-md shadow-sm border-slate-600">
          <span className="input-tag">BDT</span>
          <input
            type="number"
            name="lwsJobSalary"
            id="lws-JobSalary"
            required
            className="!rounded-l-none !border-0"
            placeholder="20,00,000"
            value={salary}
            onChange={(e) => handelFormDataChange("salary", e.target.value)}
          />
        </div>
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-JobDeadline">Deadline</label>
        <input
          type="date"
          name="lwsJobDeadline"
          id="lws-JobDeadline"
          required
          value={deadline}
          onChange={(e) => handelFormDataChange("deadline", e.target.value)}
        />
      </div>
      <div>{error && <p style={{color:'red'}}>error ocaurd while updating</p>}</div>
      <div className="text-right">
        <button
          type="submit"
          id="lws-submit"
          className="cursor-pointer btn btn-primary w-fit"
        >
          Edit
        </button>
      </div>
    </form>
  );
}
