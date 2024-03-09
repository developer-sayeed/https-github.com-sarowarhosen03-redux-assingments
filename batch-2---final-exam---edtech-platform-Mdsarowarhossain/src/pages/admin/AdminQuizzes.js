import React, { useState } from "react";
import { useDispatch } from "react-redux";

import AdminQuizItem from "../../components/AdminQuizItem";
import { adminApi, useGetQuizesQuery } from "../../features/admin/adminApi";
import { useGetVideosQuery } from "../../features/student/studentApi";
import ContentLoader from "../../components/ui/ContentLoader";
import Error from "../../components/ui/Error";
import Modal from "../../components/ui/Modal";
import QuizeForm from "../../components/form/QuizeForm";
const AdminQuizzes = () => {
  document.title = `${process.env.SITE_TITLE} | Admin Manage Quizzes`;
  const dispetch = useDispatch();
  const [opend, setOpend] = useState(false);
  const [quizeData, setQuizeData] = useState({});

  const controlModal = () => setOpend((prev) => !prev);

  //handel delete
  const handleDelete = (id) => {
    dispetch(adminApi.endpoints.deleteQuiz.initiate(id));
  };

  //get addingments from api
  const { data: quizes, isLoading, isError } = useGetQuizesQuery();
  const { data: videos, isError: visError } = useGetVideosQuery();

  //handel the loading and error state and decide what to render
  let loadingState, tableContent;
  if (isLoading) loadingState = <ContentLoader />;
  else if ((!isLoading && isError) || visError)
    loadingState = <Error message="Error Ocurd while fetching Data" />;
  else if (!isLoading && !isError && quizes.length === 0)
    loadingState = <Error message="No Data Found" />;
  if (!isLoading && !isError && quizes.length > 0) {
    loadingState = null;
    tableContent = quizes.map((quize) => (
      <AdminQuizItem
        key={quize.id}
        setQuizeData={setQuizeData}
        control={controlModal}
        quize={quize}
        handleDelete={handleDelete}
      />
    ));
  }

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <button
              onClick={() => {
                setQuizeData({});
                controlModal();
              }}
              className="btn ml-auto"
            >
              Add Quiz
            </button>
          </div>
          {loadingState}
          <Modal control={controlModal} fullHeight={true} open={opend}>
            <QuizeForm videos={videos} control={controlModal} quizeData={quizeData} />
          </Modal>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Question</th>
                  <th className="table-th">Video</th>
                  <th className="table-th justify-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-600/50">
                {tableContent}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminQuizzes;
