import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectList: [],
  searchText: "",
};

const taskManagerSlice = createSlice({
  name: "taskFilter",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projectList = action.payload.map((project) => project.id);
    },
    projectSelected: (state, action) => {
      let itemPostion = state.projectList.indexOf(action.payload);
      if (itemPostion !== -1) {
        state.projectList.splice(itemPostion, 1);
        return;
      }
      state.projectList.push(action.payload);
    },
    taskSearch: (state, action) => {
      state.searchText = action.payload.toLowerCase();
    },
  },
});

export const { projectSelected, setProjects, taskSearch } =
  taskManagerSlice.actions;
export default taskManagerSlice.reducer;
