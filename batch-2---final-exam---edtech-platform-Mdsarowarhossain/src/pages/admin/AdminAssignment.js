import React, { useEffect, useState } from "react";

import {
  adminApi,
  useGetAssignmentsQuery,
} from "../../features/admin/adminApi";
import { useGetVideosQuery } from "../../features/student/studentApi";
import ContentLoader from "../../components/ui/ContentLoader";
import Error from "../../components/ui/Error";
import AssignmentItem from "../../components/AssignmentItem";
import Modal from "../../components/ui/Modal";
import AssignmentForm from "../../components/form/AssignmentForm";
import { useDispatch } from "react-redux";
import { setUnAssingdVideos } from "../../features/admin/adminSlice";

const AdminAssignment = () => {
  document.title = `${process.env.SITE_TITLE} | Admin Manage Assignment`;

  const dispetch = useDispatch();
  const [opend, setOpend] = useState(false);
  const [assingmentData, setAssingmentData] = useState({});

  const controlModal = () => setOpend((prev) => !prev);

  //handel dlte
  const handleDelete = (id) => {
    dispetch(adminApi.endpoints.deleteAssignment.initiate(id));
  };

  //get addingments from api
  const {
    data: assingments,
    isLoading,
    isError,
    isSuccess,
  } = useGetAssignmentsQuery();
  const {
    data: videos,
    isError: visError,
    isSuccess: visSuccess,
  } = useGetVideosQuery();
  useEffect(() => {
    if (isSuccess && visSuccess) {
      const videoList = videos.filter((video) => {
        const isAssingd = assingments.find(
          (assignment) => assignment.video_id === video.id
        );
        return !isAssingd;
      });
      dispetch(setUnAssingdVideos(videoList));
    }
  }, [isSuccess, visSuccess, dispetch, assingments, videos]);

  //handel the loading and error state and decide what to render
  let loadingState, tableContent;
  if (isLoading) loadingState = <ContentLoader />;
  else if ((!isLoading && isError) || visError)
    loadingState = <Error message="Error Ocurd while fetching Data" />;
  else if (!isLoading && !isError && assingments.length === 0)
    loadingState = <Error message="No Data Found" />;
  if (!isLoading && !isError && assingments.length > 0) {
    loadingState = null;
    tableContent = assingments.map((assignment) => (
      <AssignmentItem
        key={assignment.id}
        setAssingmentData={setAssingmentData}
        control={controlModal}
        assignment={assignment}
        handleDelete={handleDelete}
      />
    ));
  }

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-full px-5 lg:px-20">
        {loadingState}
        <Modal control={controlModal} fullHeight={true} open={opend}>
          <AssignmentForm
            assingmentData={assingmentData}
            control={controlModal}
          />
        </Modal>
        <div className="px-3 py-20 bg-opacity-10">
          <div className="w-full flex">
            <button
              onClick={() => {
                setAssingmentData({});
                controlModal();
              }}
              className="btn ml-auto"
            >
              Add Assignment
            </button>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Title</th>
                  <th className="table-th">Video Title</th>
                  <th className="table-th">Mark</th>
                  <th className="table-th">Action</th>
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

export default AdminAssignment;
