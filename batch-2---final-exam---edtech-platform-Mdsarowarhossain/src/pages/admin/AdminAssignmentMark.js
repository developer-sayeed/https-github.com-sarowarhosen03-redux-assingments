import React, { useEffect, useState } from "react";
import {
  adminApi,
  useGetAssignmentMarkQuery,
} from "../../features/admin/adminApi";
import ContentLoader from "../../components/ui/ContentLoader";
import Error from "../../components/ui/Error";
import AssignmentMarkItem from "../../components/AssignmentMarkItem";
import { useDispatch } from "react-redux";

const AdminAssignmentMark = () => {
  document.title = `${process.env.SITE_TITLE} | Admin Manage Assignment Marks`;

  const dispatch = useDispatch();
  const {
    data: assignmentMarks,
    isLoading,
    isError,
  } = useGetAssignmentMarkQuery();

  const onSave = (id, data) => {
    dispatch(adminApi.endpoints.editAssignmentMark.initiate({ id, data }));
  };
  const [type, setType] = useState("all");
  const [totalPending, setTotalPending] = useState(0);

  //handaling loading and error state
  let LoadingState = null,
    tableContent = null;
  if (isLoading) LoadingState = <ContentLoader />;
  else if (!isLoading && isError) LoadingState = <Error />;
  else if (!isLoading && !isError && assignmentMarks.length === 0)
    LoadingState = <Error message="No Assignment Mark list Found" />;
  else if (!isLoading && !isError && assignmentMarks.length > 0) {
    LoadingState = null;

    tableContent = assignmentMarks
      .filter((mark) => {
        if (type !== "all") {
          return mark.status === type;
        }
        return true;
      })
      .map((assignmentMark, index) => (
        <AssignmentMarkItem
          key={index}
          assignmentMark={assignmentMark}
          onSave={onSave}
        />
      ));
  }
  useEffect(() => {
    if (assignmentMarks?.length > 0) {
      let pendings = assignmentMarks.reduce((prev, current) => {
        if (current.status === "pending") return prev++;

        return prev;
      }, 0);
      setTotalPending(pendings);
    }
  }, [assignmentMarks]);
  return (
    <section className="py-6 bg-primary">
      {LoadingState}
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <ul className="assignment-status  cursor-pointer">
            <li
              onClick={() => setType("all")}
              className={`${type === "all" && "bg-indigo-900"}`}
            >
              Total <span>{assignmentMarks?.length}</span>
            </li>
            <li
              onClick={() => setType("pending")}
              className={`${type === "pending" && "bg-green-900"}`}
            >
              Pending <span>{totalPending || ""}</span>
            </li>
            <li
              onClick={() => setType("published")}
              className={`${type === "published" && "bg-yellow-700"}`}
            >
              Mark Sent{" "}
              <span>{assignmentMarks?.length - totalPending || ""}</span>
            </li>
          </ul>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Assignment</th>
                  <th className="table-th">Date</th>
                  <th className="table-th">Student Name</th>
                  <th className="table-th">Repo Link</th>
                  <th className="table-th">Mark</th>
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

export default AdminAssignmentMark;
