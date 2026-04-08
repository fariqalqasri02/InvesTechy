import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import {
  clearPendingProjectOverride,
  getProjectId,
  normalizeProject,
  normalizeProjectList,
  savePendingProjectOverride,
  saveProjectOverride,
} from "../services/projectNormalizer";

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/projects");
      return normalizeProjectList(response.data ?? []);
    } catch (error) {
      return rejectWithValue(error.data?.message || error.message);
    }
  },
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (payload, { rejectWithValue }) => {
    try {
      if (payload?.projectName?.trim()) {
        savePendingProjectOverride({
          projectName: payload.projectName.trim(),
          industry: payload.industry,
          location: payload.location,
          plan: payload.plan,
        });
      }

      const response = await api.post("/projects", payload);
      const project = normalizeProject(response.data);
      const projectId = getProjectId(project);

      if (projectId && payload?.projectName?.trim()) {
        saveProjectOverride(projectId, {
          projectName: payload.projectName.trim(),
          createdAt: project?.createdAt,
        });
        clearPendingProjectOverride();
      }

      return normalizeProject({
        ...project,
        projectName: payload?.projectName?.trim() || project?.projectName,
      });
    } catch (error) {
      return rejectWithValue(error.data?.message || error.message);
    }
  },
);

export const fetchProjectDraft = createAsyncThunk(
  "project/fetchProjectDraft",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      return normalizeProject(response.data);
    } catch (error) {
      return rejectWithValue(error.data?.message || error.message);
    }
  },
);

export const fetchProjectById = createAsyncThunk(
  "project/fetchProjectById",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/projects/${projectId}`);
      return normalizeProject(response.data);
    } catch (error) {
      return rejectWithValue(error.data?.message || error.message);
    }
  },
);

export const updateProjectDraft = createAsyncThunk(
  "project/updateProjectDraft",
  async ({ projectId, payload }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/projects/${projectId}`, payload);
      return normalizeProject(response.data);
    } catch (error) {
      return rejectWithValue(error.data?.message || error.message);
    }
  },
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      await api.delete(`/projects/${projectId}`);
      return projectId;
    } catch (error) {
      return rejectWithValue(error.data?.message || error.message);
    }
  },
);
