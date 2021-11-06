import { createSlice } from "@reduxjs/toolkit";

const entrySlice = createSlice({
  name: "entries",
  initialState: {
    entries: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //Get
    getEntriesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getEntriesSuccess: (state, action) => {
      state.isFetching = false;
      state.entries = action.payload;
    },
    getEntriesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Delete
    deleteEntriesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteEntriesSuccess: (state, action) => {
      state.isFetching = false;
      state.entries.splice(
        state.entries.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    deleteEntriesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Update
    updateEntriesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateEntriesSuccess: (state, action) => {
      state.isFetching = false;
      state.entries[
        state.entries.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.Entries;
    },
    updateEntriesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Add
    addEntriesStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addEntriesSuccess: (state, action) => {
      state.isFetching = false;
      state.entries.push(action.payload);
    },
    addEntriesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
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
} = entrySlice.actions;
export default entrySlice.reducer;