const getLeaderBoard = (data, myuserid) => {
  const { studentList, assignmentMarks, quizeMarks } = data;

  const initialList = studentList.reduce((acc, student, index, array) => {
    let attend = false; //check if student attend any of the quiz or assignment

    if (student.id === myuserid) attend = true; //logged in user should be show on the leaderboard

    const totalQuizPoints = quizeMarks.reduce((quizAcc, quiz) => {
      if (quiz.student_id === student.id) {
        if (!attend) attend = true;
        return quizAcc + quiz.mark;
      }
      return quizAcc;
    }, 0);

    const totalAssignmentPoints = assignmentMarks.reduce(
      (assignmentAcc, assignment) => {
        if (assignment.student_id === student.id) {
          if (!attend) attend = true;
          return assignmentAcc + assignment.mark;
        }
        return assignmentAcc;
      },
      0
    );

    const totalPoints = totalQuizPoints + totalAssignmentPoints;

    if (attend)
      acc.push({
        studentId: student.id,
        name: student.name,
        totalQuizPoints,
        totalAssignmentPoints,
        totalPoints,
      });

    return acc;
  }, []);

  // Sort the leaderboard array by totalPoints in descending order
  initialList.sort((a, b) => b.totalPoints - a.totalPoints);

  //give rank to the students
  let userRank = 1;
  const leaderboard = initialList.reduce((prev, student, index) => {
    if (prev[index - 1] && prev[index - 1].totalPoints !== student.totalPoints)
      userRank++;
    prev.push({
      ...student,
      rank: userRank,
    });

    return prev;
  }, []);

  //find llogged in user postion and user data
  const myUserData = leaderboard.find(
    (student) => student.studentId === myuserid
  );

  // Limit the leaderboard array to a maximum of 20 elements
  const limitedLeaderboard = leaderboard.slice(0, 20);
  return [myUserData, limitedLeaderboard];
};
export default getLeaderBoard;
