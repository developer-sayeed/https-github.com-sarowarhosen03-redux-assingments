import React from "react";

export default function ViewAssignment({ assignment, control }) {
  const { title, status, repo_link, totalMark } = assignment;

  return (
    <div className=" p-4 space-y-3  font-serif">
      <h1 className="text-2xl font-bold ">
        <span className="text-cyan">এসাইনমেন্ট</span>
        <span>
          {" "}
          Mark{" :- "}
          {status === "pending" ? status : totalMark}
        </span>
      </h1>
      <div className="text-slate-300 font-bold my-1 lg:text-2xl">{title} </div>
      <form className="mt-8 space-y-6 px-2">
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
              readOnly={true}
              value={repo_link}
              id="repo-url"
              name="repo-url"
              type="url"
              autoComplete="email"
              required
              className="login-input p-3 rounded-t-md placeholder:text-slate-300"
              placeholder="Github Repository Link"
            />
          </div>
        </div>

        <div className="w-full flex justify-between">
          <button
            onClick={control}
            type="reset"
            className="bg-orange-600 items-end lg:mx-2 mx-3 rounded-lg px-4 py-2 hover:bg-gray-700 border-spacing-0 transition-all hover:text-white text-xl lg:text-xl"
          >
            Close
          </button>
        </div>

        {/* {isError && <Error message="Invalid email or password" />}
         */}
      </form>
    </div>
  );
}
