import React from "react";

export default function LeaderBoardTable({ leaderboard, myid }) {
  return (
    <div className="my-8">
      <h3 className="text-lg font-bold">Top 20 Result</h3>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr className={`border-b  border-slate-600/50`}>
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          {leaderboard.map((student) => (
            <tr
              key={student.studentId}
              className={`border-b  ${
                myid == student?.studentId
                  ? "border-2 border-cyan"
                  : "border-slate-600/50"
              } `}
            >
              <td className="table-td text-center">{student.rank}</td>
              <td className="table-td text-center">{student.name}</td>
              <td className="table-td text-center">
                {student.totalQuizPoints}
              </td>
              <td className="table-td text-center">
                {student.totalAssignmentPoints}
              </td>
              <td className="table-td text-center">{student.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
