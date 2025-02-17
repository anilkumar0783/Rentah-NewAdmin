import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getListingsApi } from "../Services/listService";

export const getListings = createAsyncThunk(
  "listings/fetchAll",
  async ({ skip, limit} ) => {  // Accepting an object
    console.log("Fetching listings with:", skip, limit);
    const response = await getListingsApi(skip, limit);
    return response;
  }
);


const listingSlice = createSlice({
  name: "listings",
  initialState: {
    data: [],
    // totalCount: 0,
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {}, // If you need additional reducers, add them here
  extraReducers: (builder) => {
    builder
      .addCase(getListings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getListings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.totalCount = action.payload.data.length+state.totalCount  ;
      })
      .addCase(getListings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default listingSlice.reducer;
