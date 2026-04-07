import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchConsultants = createAsyncThunk(
  "consultant/fetchConsultants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/consultants");
      return response.data ?? [];
    } catch (error) {
      return rejectWithValue(error.data?.message || error.message);
    }
  },
);
