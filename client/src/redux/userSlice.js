import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    isFetching: false,
    currentUser: null,
    error: null,
  },

  reducers: {
    fetchingStart: (initialState) => {
      initialState.isFetching = true;
    },

    fetchingSuccess: (initialState, action) => {
      initialState.currentUser = action.payload;
      initialState.isFetching = false;
    },

    fetchingFailure: (initialState, action) => {
      initialState.error = action.payload;
      initialState.isFetching = false;
    },
  },
});

export const { fetchingStart, fetchingSuccess, fetchingFailure } =
  userSlice.actions;

export default userSlice.reducer;
