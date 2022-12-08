import {
  loginFailure,
  loginStart,
  loginSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
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

export const forgotPass = async (email) => {
  try {
    const res = await axios.post("/auth/forgot-pass", { email: email });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const resetPass = async (password, userId, token) => {
  try {
    const res = await axios.post(`/auth/reset-pass/${userId}/${token}`, {
      newPw: password,
    });
    return res;
  } catch (err) {
    return err.response;
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(`/auth/${id}`, user);
    dispatch(updateUserSuccess(res.data));
    return res;
  } catch (err) {
    dispatch(updateUserFailure(err.response.data));
    return err;
  }
};

export const updateKey = async (id) => {
  try {
    const res = await axios.put(`/auth/${id}`, { key: true });
    return res;
  } catch (err) {
    return err;
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    return res;
  } catch (err) {
    dispatch(loginFailure());
    return err;
  }
};

export const register = async (user) => {
  try {
    const res = await axios.post("/auth/register", user);
    return res;
  } catch (err) {
    return err;
  }
};

export const getUser = async (username, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get(`/auth/?username=${username}`);
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const getEntry = async (username, month, year, dispatch) => {
  dispatch(getEntriesStart());
  try {
    const res = await axios.get(`/entries/${username}/${year}/${month}`);
    dispatch(getEntriesSuccess(res.data));
  } catch (err) {
    dispatch(getEntriesFailure());
  }
};

export const deleteEntry = async (id, key, dispatch) => {
  dispatch(deleteEntriesStart());
  try {
    const res = await axios.delete(`/entries/${id}`, {
      data: { admin_key: key },
    });
    dispatch(deleteEntriesSuccess({ id: id }));
    return res.data;
  } catch (err) {
    dispatch(deleteEntriesFailure());
    return err.response.data;
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
    return res;
  } catch (err) {
    dispatch(addEntriesFailure());
    return err;
  }
};
