import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { creatJobAsync } from "../features/Jobs/jobSlice";

export default function AddJob() {
  const dispetch = useDispatch();

  const [formData, setFormData] = useState({
    title: "Select Job",
    type: " Select Job Type",
    salary: "",
    deadline: "",
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

  const handelFormSubmit =async (e) => {

    try {
      e.preventDefault();
      await dispetch(creatJobAsync(formData)).unwrap();
      navigat("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="lg:pl-[14rem] mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <h1 className="mb-10 text-center lws-section-title">Add New Job</h1>

        <div className="max-w-3xl mx-auto">
          <form className="space-y-6" onSubmit={handelFormSubmit}>
            <div className="fieldContainer">
              <label
                htmlFor="lws-JobTitle"
                className="text-sm font-medium text-slate-300"
              >
                Job Title
              </label>
              <select
                onChange={(e) => handelFormDataChange("title", e.target.value)}
                id="lws-JobTitle"
                value={title}
                name="lwsJobTitle"
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
                value={type}
                name="lwsJobType"
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
                  value={salary}
                  type="number"
                  name="lwsJobSalary"
                  id="lws-JobSalary"
                  required
                  className="!rounded-l-none !border-0"
                  placeholder="20,00,000"
                  onChange={(e) =>
                    handelFormDataChange("salary", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-JobDeadline">Deadline</label>
              <input
                value={deadline}
                type="date"
                name="lwsJobDeadline"
                id="lws-JobDeadline"
                onChange={(e) =>
                  handelFormDataChange("deadline", e.target.value)
                }
                required
              />
            </div>
            <div>
              {error && (
                <p style={{ color: "red" }}>
                  error ocaurd while adding new Job
                </p>
              )}
            </div>

            <div className="text-right">
              <button
                type="submit"
                id="lws-submit"
                className="cursor-pointer btn btn-primary w-fit"
              >
                Add New Job
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
