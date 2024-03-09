import React, { useEffect, useState } from "react";

import { useSubmitAssignmentMutation } from "../../features/student/studentApi";
import Error from "../ui/Error";
import { SmallLoader } from "../ui/SmallLoader";

export default function AssignmentSubmitForm({
  control,
  assignment,
  studentInfo,
  videoId,
}) {
  const [repolink, setRepolink] = useState("");

  const { title, id: assignment_id, totalMark } = assignment;
  const [submitAssignment, { isError, isSuccess, isLoading }] =
    useSubmitAssignmentMutation();
  const { name, id: student_id } = studentInfo;
  const handelSubmit = (e) => {
    e.preventDefault();
    const data = {
      student_id,
      student_name: name,
      assignment_id,
      title,
      createdAt: new Date().toISOString(),
      totalMark,
      mark: 0,
      repo_link: repolink,
      status: "pending",
    };
    submitAssignment({ data, videoId });
  };
  useEffect(() => {
    if (isSuccess) control();
  }, [isSuccess]);
  return (
    <div className=" p-4 space-y-3  font-serif">
      <h1 className="text-2xl font-bold ">
        <span className="text-cyan">এসাইনমেন্ট</span> জমা দিন
      </h1>
      <div className="text-slate-300 font-bold my-1 lg:text-2xl">{title} </div>
      <form className="mt-8 space-y-6 px-2" onSubmit={handelSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="space-y-3">
            <label
              htmlFor="repo-url"
              className="font-bold text-white tracking-wide"
            >
              গিটহাব রিপোসিটরি লিঙ্ক
              <span className="font-extrabold text-red-500  "> *</span>
            </label>

            <input
              onChange={(e) => setRepolink(e.target.value)}
              value={repolink}
              id="repo-url"
              name="repo-url"
              type="url"
              required
              className="login-input p-3 rounded-t-md placeholder:text-slate-300"
              placeholder="Github Repository Link"
            />
          </div>
        </div>

        <div className="w-full flex justify-between">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-cyan-600 lg:my-2 mx-3 rounded-lg px-4 py-2 hover:bg-gray-700 border-separate transition-all hover:text-white text-xl lg:text-xl"
          >
            Submit
          </button>
          {isLoading && <SmallLoader />}
          {isError && (
            <Error message="Erro Ocaurd While Submiting Assignment" />
          )}
          <button
            onClick={control}
            type="reset"
            className="bg-orange-600 items-end lg:mx-2 mx-3 rounded-lg px-4 py-2 hover:bg-gray-700 border-spacing-0 transition-all hover:text-white text-xl lg:text-xl"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}
