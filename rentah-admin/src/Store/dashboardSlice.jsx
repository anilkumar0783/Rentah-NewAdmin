import { createSlice } from "@reduxjs/toolkit";
import { dashboardApi } from "./dashboardApi";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        dashboardApi.endpoints.getDashboardDetails.matchPending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        dashboardApi.endpoints.getDashboardDetails.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addMatcher(
        dashboardApi.endpoints.getDashboardDetails.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error;
        }
      );
  },
});

export default dashboardSlice.reducer;
