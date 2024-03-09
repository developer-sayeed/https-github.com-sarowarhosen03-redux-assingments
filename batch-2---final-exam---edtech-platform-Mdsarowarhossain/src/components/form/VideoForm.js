import React, { useEffect, useState } from "react";

import {
  useAddVideoMutation,
  useEditVideoMutation,
} from "../../features/admin/adminApi";
import Error from "../ui/Error";
import { SmallLoader } from "../ui/SmallLoader";
import Success from "../ui/Success";

const VideoForm = ({ control, videoData }) => {
  //define the locl state
  const [formdata, setFormdata] = useState({
    title: videoData?.title || "",
    description: videoData?.description || "",
    url: videoData?.url || "",
    duration: videoData?.duration || "",
    views: videoData?.views || "",
  });
  const { title, description, url, duration, views } = formdata;

  //set the mutation
  const [
    addVideo,
    { isLoading: addIsLoading, isError: addIsError, isSuccess: addIsSuccess },
  ] = useAddVideoMutation();
  const [
    editVideo,
    {
      isLoading: editIsLoading,
      isError: editIsError,
      isSuccess: editIsSuccess,
    },
  ] = useEditVideoMutation();

  const handelchange = (e) => {
    setFormdata((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (addIsSuccess) {
      control();
    }
  }, [addIsSuccess]);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (videoData?.id) {
      editVideo({ id: videoData?.id, data: { ...formdata } });
    } else {
      addVideo({ ...formdata, createdAt: new Date().toISOString() });
    }
  };

  return (
    <div className=" p-4 space-y-3 h-full w-full bg-slate-600 font-serif">
      <div className="text-slate-300 font-bold my-1 lg:text-2xl"> </div>
      <form className="mt-8 space-y-6 px-2" onSubmit={handelSubmit}>
        {/*      Video title */}
        <div className="input-body">
          <div className="space-y-3">
            <label htmlFor="title" className="input-label">
              Video Title
            </label>

            <input
              value={title}
              onChange={handelchange}
              id="title"
              name="title"
              type="text"
              required
              className="login-input"
              placeholder="Video Title"
            />
          </div>
        </div>
        {/*      Video url */}
        <div className="input-body">
          <div className="space-y-3">
            <label htmlFor="url" className="input-label">
              Video Url
            </label>

            <input
              value={url}
              onChange={handelchange}
              id="url"
              name="url"
              type="url"
              required
              className="login-input"
              placeholder="Video Url"
            />
          </div>
        </div>
        <div className="flex gap-x-2 justify-between">
          {/* video duration */}
          <div className="input-body">
            <div className="space-y-3">
              <label htmlFor="duration" className="input-label">
                Video duration
              </label>

              <input
                value={duration}
                onChange={handelchange}
                id="duration"
                name="duration"
                type="text"
                required
                className="login-input"
                placeholder="Video duration"
              />
            </div>
          </div>
          {/* video views */}
          <div className="input-body items-center">
            <div className="space-y-3">
              <label htmlFor="views" className="input-label">
                Video views
              </label>

              <input
                value={views}
                onChange={handelchange}
                id="views"
                name="views"
                type="text"
                required
                className="login-input"
                placeholder="Video views"
              />
            </div>
          </div>
        </div>

        <div className="input-body">
          <div className="space-y-3">
            <label htmlFor="descriptionn" className="input-label">
              Video description
            </label>

            <textarea
              value={description}
              onChange={handelchange}
              name="description"
              id="description"
              required
              rows={8}
              className="login-input"
              placeholder="Video description"
            ></textarea>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <button
            disabled={addIsLoading || editIsLoading}
            type="submit"
            className="bg-cyan-600 lg:my-2 mx-3 rounded-lg px-4 py-2 hover:bg-gray-700 border-separate transition-all hover:text-white text-xl lg:text-xl"
          >
            {videoData?.id ? "Edit" : "Add"}
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

export default React.memo(VideoForm);
