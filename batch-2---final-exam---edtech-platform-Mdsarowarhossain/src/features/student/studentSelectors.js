export const selectUser = (state, isAdmin) => {
  if (isAdmin) return state.auth.admin.user;
  return state.auth.user.user;
};

//select the full user from the redux store
export const selectUserInfo = (state, isAdmin) => {
  if (isAdmin) return state.auth.admin;
  return state.auth.user;
};

//select the quiz state from the redux store

export const selectQuiz = (state) => state.student.quize;
