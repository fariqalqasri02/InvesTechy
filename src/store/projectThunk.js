import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

const extractResponseData = (response) => {
  if (response?.data?.data) {
    return response.data.data;
  }

  if (response?.data) {
    return response.data;
  }

  return response;
};

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/projects");
      return extractResponseData(response) ?? [];
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
      return extractResponseData(response);
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
      return extractResponseData(response);
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
      return extractResponseData(response);
    } catch (error) {
      return rejectWithValue(error.data?.message || error.message);
    }
  },
);

export const fetchAdminDashboard = createAsyncThunk(
  "project/fetchAdminDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/dashboard");
      return response?.data ?? response;
    } catch (error) {
      return rejectWithValue(error.data?.message || error.message);
    }
  },
);
