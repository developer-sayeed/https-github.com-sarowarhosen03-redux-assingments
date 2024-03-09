import React, { useEffect, useState } from "react";
import {
  useAddQuizeMutation,
  useEditQuizMutation,
} from "../../features/admin/adminApi";
import Success from "../ui/Success";
import { SmallLoader } from "../ui/SmallLoader";
import Error from "../ui/Error";

const QuizeForm = ({ quizeData, control, videos }) => {
  //dclear local states
  const initiOptions = [
    { id: 1, option: "", isCorrect: false },
    { id: 2, option: "", isCorrect: false },
    { id: 3, option: "", isCorrect: false },
    { id: 4, option: "", isCorrect: false },
  ];
  const [quize, setQuize] = useState({
    question: quizeData?.question || "",
    video_title: quizeData?.video_title || "",
    options: quizeData?.options || initiOptions,
  });

  const { question, video_title, options } = quize;

  //initialize mutations
  const [
    editQuiz,
    {
      isLoading: editIsLoading,
      isError: editIsError,
      isSuccess: editIsSuccess,
    },
  ] = useEditQuizMutation();
  const [
    addQuize,
    { isLoading: addIsLoading, isError: addIsError, isSuccess: addIsSuccess },
  ] = useAddQuizeMutation();

  const handelchange = (e) => {
    setQuize((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handelOptionChange = (e) => {
    //if it is select field parse the value to boolean
    const value =
      e.target.name === "isCorrect"
        ? JSON.parse(e.target.value)
        : e.target.value;

        const newOptions = [...options];
        newOptions[e.target.id - 1] = {
          ...newOptions[e.target.id - 1],
          [e.target.name]: value,
        }

    setQuize((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const video_id = videos.find((video) => video.title === video_title).id;
    if (quizeData?.id) {
      editQuiz({ id: quizeData.id, data: { ...quize, video_id } });
    } else {
      addQuize({ ...quize, video_id });
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
        {/*      Quize question */}
        <div className="input-body">
          <div className="space-y-3">
            <label htmlFor="question" className="input-label">
              Question
            </label>

            <input
              value={question}
              onChange={handelchange}
              id="question"
              name="question"
              type="text"
              required
              className="login-input"
              placeholder="Quize question"
            />
          </div>
        </div>
        {/* video_title */}
        <div className="input-body">
          <div className="space-y-3">
            <label htmlFor="video_title" className="input-label">
              Quize Video
            </label>

            <select
              value={video_title}
              onChange={handelchange}
              id="video_title"
              name="video_title"
              required
              className="login-input"
              placeholder="Quize video "
            >
              <option value="" hidden>
                Selecet a Video
              </option>
              {videos.map((video, index) => (
                <option key={index} id={index} value={video.title}>
                  {video.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* options */}
        <div className="input-body">
          <div className="space-y-3">
            <label htmlFor="options" className="input-label">
              Options
            </label>

            <div className="flex flex-col space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex  space-x-2">
                  <input
                    value={option.option}
                    onChange={handelOptionChange}
                    id={option.id}
                    name="option"
                    type="text"
                    required
                    className="login-input w-4/3"
                    placeholder="Option"
                  />
                  <select
                    value={option.isCorrect}
                    onChange={handelOptionChange}
                    id={option.id}
                    name="isCorrect"
                    required
                    className="login-input w-1/3"
                  >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <button
            disabled={addIsLoading || editIsLoading}
            type="submit"
            className="bg-cyan-600 lg:my-2 mx-3 rounded-lg px-4 py-2 hover:bg-gray-700 border-separate transition-all hover:text-white text-xl lg:text-xl"
          >
            {quizeData?.id ? "Edit" : "Add"}
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

export default QuizeForm;
