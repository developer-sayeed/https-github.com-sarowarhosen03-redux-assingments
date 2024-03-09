import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import {
  useGetQuizeDetailsQuery,
  useSubmitQuizeMutation,
} from "../../features/student/studentApi";
import ContentLoader from "../../components/ui/ContentLoader";
import Error from "../../components/ui/Error";
import QuizItem from "../../components/quize/QuizItem";
import { answer, setQuizes } from "../../features/student/studentSlice";
import { calcullateQuizeScore } from "../../utils/calcullateQuizeScore";
import { SmallLoader } from "../../components/ui/SmallLoader";
import {
  selectQuiz,
  selectUser,
} from "../../features/student/studentSelectors";
import MarkProgress from "../../components/quize/MarkProgress";

export default function Quiz() {
  document.title = `${process.env.SITE_TITLE} | Quiz`;
  const [searchParams] = useSearchParams();
  const naviget = useNavigate();
  const [skip, setSkip] = useState(true);
  const [mark, setMark] = useState(0);
  const dispetch = useDispatch();
  const quizeState = useSelector(selectQuiz, shallowEqual);

  const { name, id: studentId } = useSelector((state) =>
    selectUser(state, false)
  );

  const videoId = searchParams.get("videoId") || undefined;
  let quizeContent = null;

  //define the query and mutation
  const {
    data: queizeData,
    isLoading,
    isError,
    isSuccess,
  } = useGetQuizeDetailsQuery(
    { studentId: studentId, videoId: Number(videoId) },
    { skip }
  );
  const [
    submitQuize,
    { isLoading: qsIsloading, isError: qsIsError, isSuccess: qsIsSuccess },
  ] = useSubmitQuizeMutation();

  const { quize, quizeMark } = queizeData || {};

  //on answer
  const onAnswer = (e) => {
    if (quizeMark?.length === 0) {
      //prevernt the user to change the answer
      const { value } = e.target;
      const [quizeId, optionId] = value.split("_");
      dispetch(answer({ quizeId, optionId }));
    }
  };

  const onQuizeSubmit = (e) => {
    const confirmed = window.confirm(
      "Are you sure you want submit the quize answer?"
    );
    if (confirmed) {
      const score = calcullateQuizeScore(quizeState);
      const data = {
        student_id: studentId,
        student_name: name,
        video_id: Number(videoId),
        video_title: quizeState[0].video_title,
        totalQuiz: quizeState.length,
        totalCorrect: score / 5,
        totalWrong: quizeState.length - score / 5,
        totalMark: quizeState.length * 5,
        mark: score,
      };

      submitQuize(data);
    }
  };

  //redirect to leaderboard after quize submited
  useEffect(() => {
    if (qsIsSuccess) naviget("/leaderboard");
  }, [qsIsSuccess, naviget]);

  //start fetching data after geting the vieoid
  useEffect(() => {
    setSkip(false);
  }, [searchParams]);

  // do action after the data is fetched
  useEffect(() => {
    if (isSuccess && quizeMark?.length > 0) {
      setMark((quizeMark[0].mark / quizeMark[0].totalMark) * 100);
      dispetch(setQuizes({ quize, showAnswer: true }));
    } else if (isSuccess && quize?.length > 0) {
      dispetch(setQuizes({ quize, showAnswer: false }));
    }
  }, [isSuccess, quizeMark, dispetch, quize]);

  // handel the loading and error
  if (isLoading) {
    quizeContent = <ContentLoader />;
  }
  if (!isLoading && isError) {
    quizeContent = (
      <Error message="Error Ocard while fetching quizes from server" />
    );
  }

  //handel the quize content
  if (isSuccess && quize?.length === 0) {
    quizeContent = (
      <h2 className="font-bold text-2xl text-center ">
        No Quiz Found For This Video
      </h2>
    );
  } else if (isSuccess && quize?.length > 0) {
    quizeContent = (
      <>
        <div className="mb-8 my-2">
          <h1 className="text-2xl font-bold">
            Quizzes for "{quize[0]?.video_title}"
          </h1>
          <p className="text-sm my-1 text-slate-200">
            Each question contains 5 Mark
          </p>
        </div>

        {quizeState?.map((q, index) => (
          <QuizItem onAnswer={onAnswer} key={index} quize={q} />
        ))}
      </>
    );
  }

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        {/* show Mark if alreadt done the quize */}
        {quizeMark?.length > 0 && (
          <div className="flex ml-2 space-x-[8rem] mb-5 h-auto  ">
            <div className=" h-full font-bold space-y-1 text-xl">
              <p>Total Mark: {quizeMark[0].totalMark}</p>
              <p>Your Mark: {quizeMark[0].mark}</p>
              <p>Total Quize: {quizeMark[0].totalQuiz}</p>
              <p>You Correct: {quizeMark[0].totalCorrect}</p>
            </div>
            <MarkProgress mark={mark} />
          </div>
        )}
        {/* quize content */}

        {quizeContent}

        {qsIsloading && <SmallLoader />}
        <button
          onClick={() => naviget(-1)}
          className="px-4 mt-4 py-2 rounded-full bg-green-600  hover:opacity-90 active:opacity-100 active:scale-95 "
        >
          Go Back
        </button>
        {qsIsError && <Error message="Erro Ocard While Submit The Quize" />}
        {quizeMark?.length === 0 && quize?.length > 0 && (
          <button
            disabled={qsIsloading}
            onClick={onQuizeSubmit}
            className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
          >
            Submit
          </button>
        )}
      </div>
    </section>
  );
}
