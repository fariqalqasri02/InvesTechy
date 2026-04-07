import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/projects");
      return response.data ?? [];
    } catch (error) {
      return rejectWithValue(error.data?.message || error.message);
    }
  },
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/projects", payload);
      return response.data;
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
      return response.data;
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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.data?.message || error.message);
    }
  },
);
