import { setLoading, setResult } from "./aiSlice";
import api from "../../services/api";

export const askAI = (question) => async (dispatch) => {
  dispatch(setLoading(true));
  
  const res = await api.post("/ai", { question });
  
  dispatch(setResult(res.data));
  dispatch(setLoading(false));
};