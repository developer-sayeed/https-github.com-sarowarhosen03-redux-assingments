import React, { useEffect, useState } from "react";

import {
  useAddAssignmentsMutation,
  useEditAssignmentMutation,
} from "../../features/admin/adminApi";
import Success from "../ui/Success";
import Error from "../ui/Error";
import { SmallLoader } from "../ui/SmallLoader";
import { useSelector } from "react-redux";
import { selectAllUnassignedVideos } from "../../features/admin/adminSelector";


const AssignmentForm = ({ assingmentData, control }) => {

  //geting the video list without have any assingment
  let videoList = useSelector(selectAllUnassignedVideos);

  //local from data
  const [formData, setFormData] = useState({
    title: assingmentData?.title || "",
    totalMark: assingmentData?.totalMark || "",
    video_title: assingmentData?.video_title || "",
  });
  const { title, totalMark, video_title } = formData;

  //Intitalize the Mutations
  const [
    editAssignment,
    {
      isLoading: editIsLoading,
      isError: editIsError,
      isSuccess: editIsSuccess,
    },
  ] = useEditAssignmentMutation();
  const [
    addAssignments,
    { isLoading: addIsLoading, isError: addIsError, isSuccess: addIsSuccess },
  ] = useAddAssignmentsMutation();


  //handaling input change
  const handelchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handaling form submit
  const handelSubmit = (e) => {
    e.preventDefault();
    let video = videoList.find((video) => video.title === video_title); //find the Selected video
    if (assingmentData?.id) {
      //want to edit assignment
      editAssignment({
        id: assingmentData.id,
        data: {
          ...formData,
          video_id: video?.id || assingmentData.video_id,
        },
      });
    } else {
      //going to add assignment
      addAssignments({
        ...formData,
        video_id: video?.id,
      });
    }
  };

  //close modal afte add success
  useEffect(() => {
    if (addIsSuccess) {
      control();
    }
  }, [addIsSuccess]);

  return (
    <div className=" p-4 space-y-3 h-full w-full bg-slate-600 font-serif">
      <div className="text-slate-300 font-bold my-1 lg:text-2xl"> </div>
      <form className="mt-8 space-y-6 px-2" onSubmit={handelSubmit}>
        {/*      Assignment title */}
        <div className="input-body">
          <div className="space-y-3">
            <label htmlFor="title" className="input-label">
              Assignment Title
            </label>

            <input
              value={title}
              onChange={handelchange}
              id="title"
              name="title"
              type="text"
              required
              className="login-input"
              placeholder="Assignment Title"
            />
          </div>
        </div>
        {/* totalMark */}
        <div className="input-body">
          <div className="space-y-3">
            <label htmlFor="totalMark" className="input-label">
              Mark
            </label>

            <input
              value={totalMark}
              onChange={handelchange}
              id="totalMark"
              name="totalMark"
              type="number"
              required
              className="login-input"
              placeholder="Assignment Mark"
            />
          </div>
        </div>

        {/*      Video Title */}
        <div className="input-body">
          <div className="space-y-3">
            <label htmlFor="video_title" className="input-label">
              Video
            </label>
            <select
              onChange={handelchange}
              name="video_title"
              value={video_title}
              id="video_title"
              className="login-input"
              required
            >
              <option value="" hidden>
                {videoList.length === 0 && !assingmentData?.id
                  ? "No Video Found Without Assignment Add Video First"
                  : "Select Video"}
              </option>
              {assingmentData?.title && (
                <option>{assingmentData?.video_title}</option>
              )}

              {videoList.map((video, index) => (
                <option key={index}>{video?.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <button
            disabled={addIsLoading || editIsLoading}
            type="submit"
            className="bg-cyan-600 lg:my-2 mx-3 rounded-lg px-4 py-2 hover:bg-gray-700 border-separate transition-all hover:text-white text-xl lg:text-xl"
          >
            {assingmentData?.id ? "Edit" : "Add"}
          </button>
          {editIsSuccess && <Success message="Succesfully saved" />}
          {(addIsLoading || editIsLoading) && <SmallLoader />}
          {(editIsError || addIsError) && (
            <Error message="There was an Erro Ocurd " />
          )}
          <button
            onClick={control}
            type="button"
            className="bg-orange-600 items-end lg:mx-2 mx-3 rounded-lg px-4 py-2 hover:bg-gray-700 border-spacing-0 transition-all hover:text-white text-xl lg:text-xl"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentForm;
