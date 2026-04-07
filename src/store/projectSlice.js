import { createSlice } from "@reduxjs/toolkit";
import {
  createProject,
  fetchProjectDraft,
  fetchProjects,
} from "./projectThunk";

const initialState = {
  projectList: [],
  currentProject: null,
  currentDraft: null,
  status: "idle",
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearProjectError: (state) => {
      state.error = null;
    },
    resetCurrentProject: (state) => {
      state.currentProject = null;
      state.currentDraft = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projectList = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load projects.";
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "drafting";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.status = "idle";
        state.error = action.payload || "Failed to create project.";
      })
      .addCase(fetchProjectDraft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectDraft.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDraft = action.payload;
        state.status = action.payload?.status?.toLowerCase?.() || state.status;
      })
      .addCase(fetchProjectDraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load project draft.";
      });
  },
});

export const { clearProjectError, resetCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
