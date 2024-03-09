import React, { useState } from "react";

const AssignmentMarkItem = ({ onSave, assignmentMark }) => {
  const { title, student_name, repo_link, createdAt, status, totalMark, mark } =
    assignmentMark;
  const [fullmark, setFullMark] = useState(totalMark);
  const handelMark = () => {
    onSave(assignmentMark.id, { mark: fullmark, status: "published" });
  };
  return (
    <tr>
      <td className="table-td whitespace-pre-line">{title}</td>
      <td className="table-td whitespace-pre-line">{createdAt}</td>
      <td className="table-td ">{student_name}</td>
      <td className="table-td whitespace-pre-line">{repo_link}</td>
      <td className="table-td input-mark">
        {status === "pending" ? (
          <>
            <input
              value={fullmark}
              type="number"
              required
              onKeyUp={(e) => {
                if (e.key === "Enter") handelMark();
              }}
              max={totalMark}
              min="0"
              className="w-auto"
              onChange={(e) => setFullMark(e.target.value)}
            />
            <svg
              onClick={handelMark}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </>
        ) : (
          mark
        )}
      </td>
    </tr>
  );
};

export default React.memo(AssignmentMarkItem);
