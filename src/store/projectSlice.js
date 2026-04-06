import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectList: [],
  currentProject: null,
  status: "idle", // drafting | waiting_input | completed
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projectList = action.payload;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setProjects, setCurrentProject, updateStatus } = projectSlice.actions;
export default projectSlice.reducer;