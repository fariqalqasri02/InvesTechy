import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import analysisReducer from "./analysisSlice";
import aiReducer from "./aiSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    analysis: analysisReducer,
    ai: aiReducer,
  },
});