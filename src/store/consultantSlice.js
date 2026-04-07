import { createSlice } from "@reduxjs/toolkit";
import { fetchConsultants } from "./consultantThunk";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const consultantSlice = createSlice({
  name: "consultant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConsultants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConsultants.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchConsultants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load consultants.";
      });
  },
});

export default consultantSlice.reducer;
