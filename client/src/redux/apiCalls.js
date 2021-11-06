import {
  loginFailure,
  loginStart,
  loginSuccess,
  } from "./userRedux";
import {
  getEntriesStart,
  getEntriesSuccess,
  getEntriesFailure,
  deleteEntriesStart,
  deleteEntriesSuccess,
  deleteEntriesFailure,
  updateEntriesStart,
  updateEntriesSuccess,
  updateEntriesFailure,
  addEntriesStart,
  addEntriesSuccess,
  addEntriesFailure,
} from "./entryRedux";
import axios from "axios";

axios.defaults.withCredentials = true; //so its can set automatically the cookie i want
axios.defaults.baseURL = "http://localhost:4000/api";

export const logout = async () => {
  await axios.get("/auth/logout");
  window.localStorage.clear();
  window.location = "/login";
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getEntry = async (dispatch) => {
  dispatch(getEntriesStart());
  try {
    const res = await axios.get("/Entries");
    dispatch(getEntriesSuccess(res.data));
  } catch (err) {
    dispatch(getEntriesFailure());
  }
};

export const deleteEntry = async (id, dispatch) => {
  dispatch(deleteEntriesStart());
  try {
    await axios.delete(`/Entries/${id}`);
    dispatch(deleteEntriesSuccess({ id: id }));
  } catch (err) {
    dispatch(deleteEntriesFailure());
  }
};

export const updateEntry = async (id, Entries, dispatch) => {
  dispatch(updateEntriesStart());
  try {
    // update
    await axios.put(`/entries/${id}`, Entries);
    dispatch(updateEntriesSuccess({ id, Entries }));
  } catch (err) {
    dispatch(updateEntriesFailure());
  }
};

export const addEntry = async (entries, dispatch) => {
  dispatch(addEntriesStart());
  try {
    const res = await axios.post(`/entries`, entries);
    dispatch(addEntriesSuccess(res.data));
  } catch (err) {
    dispatch(addEntriesFailure());
  }
};
