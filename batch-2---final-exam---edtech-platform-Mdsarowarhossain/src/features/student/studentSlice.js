import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quize: [],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setQuizes: (state, action) => {
      const { quize, showAnswer } = action.payload;
      state.quize = quize.map((q) => ({
        ...q,
        options: q.options.map((o) => ({
          ...o,
          checked: showAnswer ? o.isCorrect : false,
        })),
      }));
    },
    answer: (state, action) => {
      const { quizeId, optionId } = action.payload;
      const quize = state.quize.find((q) => q.id == quizeId);
      const option = quize.options.find((o) => o.id == optionId);
      option.checked = !option.checked;
    },
  },
});

export const { setQuizes, answer } = studentSlice.actions;
export default studentSlice.reducer;
