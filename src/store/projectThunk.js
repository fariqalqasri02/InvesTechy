import { setProjects, setCurrentProject } from "./projectSlice";
import api from "../../services/api";

// GET PROJECT LIST
export const fetchProjects = () => async (dispatch) => {
  const res = await api.get("/projects");
  dispatch(setProjects(res.data));
};

// CREATE PROJECT (AI TRIGGER)
export const createProject = (data) => async (dispatch) => {
  const res = await api.post("/projects", data);
  dispatch(setCurrentProject(res.data));
};