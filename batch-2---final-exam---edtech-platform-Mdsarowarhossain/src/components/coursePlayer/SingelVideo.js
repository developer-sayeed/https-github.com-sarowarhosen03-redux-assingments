import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  useGetAssigmentDetailsQuery,
  useGetQuizeDetailsQuery,
} from "../../features/student/studentApi";
import AssignmentSubmitForm from "../form/AssignmentSubmitForm";
import Error from "../ui/Error";
import Modal from "../ui/Modal";
import ViewAssignment from "./ViewAssingment";
import { selectUser } from "../../features/student/studentSelectors";

export default function SingelVideo({ video }) {
document.title = video?.title || "Loading...";

  const { id, title, url, description, createdAt } = video;
  const [skip, setSkip] = useState(true);
  
  const studentInfo = useSelector((state) => selectUser(state, false));

  //dclear states for modal
  const [opened, setOpened] = useState(false);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  //setup the query
  const {
    data: assingmentData,
    isLoading,
    isError,
    isSuccess,
  } = useGetAssigmentDetailsQuery(
    { studentId: studentInfo.id, videoId: id },
    { skip }
  );
  const { assignementMark, assignment } = assingmentData || {};

  const {
    data: quizeData,
    isLoading: qisLoading,
    isError: qisError,
    isSuccess: qisSuccess,
  } = useGetQuizeDetailsQuery(
    { studentId: studentInfo?.id, videoId: id },
    { skip }
  );
  const { quize, quizeMark } = quizeData || {};

  //start the query after the id is get from the search perams
  useEffect(() => {
    if (id !== undefined) setSkip(false);
  }, [id]);

  let assignmentBtn, quizeBtn;


  //dcide the assignment button
  if (isSuccess && assignment?.length === 0) {
    assignmentBtn = (
      <>
        <button
          disabled={true}
          className="px-3 font-bold py-1 border border-orange-500 text-red rounded-full text-sm  hover:text-orange-600"
        >
          এসাইনমেন্ট নেই
        </button>
      </>
    );
  } else if (isSuccess && assignementMark?.length > 0) {
    assignmentBtn = (
      <>
        <button
          onClick={() => setOpened(true)}
          className="px-3 font-bold py-1 border border-orange-300 text-yellow-100 rounded-full text-sm bg-orange-400  hover:text-white"
        >
          এসাইনমেন্ট জমা দিয়েছেন
        </button>

        <Modal open={opened} control={controlModal}>
          <ViewAssignment
            control={controlModal}
            assignment={assignementMark[0]}
          />
        </Modal>
      </>
    );
  } else if (isSuccess && assignementMark?.length === 0) {
    assignmentBtn = (
      <>
        <button
          onClick={() => setOpened(true)}
          className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
        >
          এসাইনমেন্ট
        </button>
        <Modal open={opened} control={controlModal}>
          <AssignmentSubmitForm
            control={controlModal}
            assignment={assignment[0]}
            videoId={id}
            studentInfo={studentInfo}
          />
        </Modal>
      </>
    );
  }

  
  //decide the quiz button
  if (qisSuccess && quize?.length === 0) {
    quizeBtn = (
      <button
        disabled={true}
        className="px-3 font-bold py-1 border border-red-600 text-red-500 rounded-full text-sm "
      >
        কুইজে নেই
      </button>
    );
  } else if (qisSuccess && quizeMark?.length > 0) {
    quizeBtn = (
      <Link
        to={`/quiz?videoId=${id}`}
        className="px-3 font-bold py-1 border border-green-600 text-green-500 rounded-full text-sm hover:bg-green-500 hover:text-white"
      >
        কুইজের উত্তর দেখুন
      </Link>
    );
  } else if (qisSuccess && quizeMark?.length === 0) {
    quizeBtn = (
      <Link
        to={`/quiz?videoId=${id}`}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        কুইজে অংশগ্রহণ করুন
      </Link>
    );
  }

  //handel the assingmet submit

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <iframe
        width="100%"
        className="aspect-video"
        src={url || ""}
        title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      ></iframe>

      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
          {title || ""}
        </h1>
        <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
          Uploaded on {createdAt || ""}
        </h2>

        <div className="flex gap-4">
          {assignmentBtn}
          {((!isLoading && isError) || (!qisLoading && qisError)) && (
            <Error message={"Error ocuard While Fetvhing Data from Searver"} />
          )}
          {quizeBtn}
        </div>
        <p className="mt-4 text-sm text-slate-400 leading-6">
          {description || ""}
        </p>
      </div>
    </div>
  );
}
