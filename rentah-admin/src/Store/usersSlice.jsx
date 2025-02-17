import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersApi } from "../Services/userService";

// Define an async thunk to fetch users
export const getUsers = createAsyncThunk(
  "users/fetchAll",
  async ({ skip, limit }) => {  // Accepting an object
    console.log("Fetching users with:", skip, limit);
    const response = await getUsersApi(skip, limit);
    return response;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    status: "idle",  // "idle" | "loading" | "succeeded" | "failed"
    error: null,
    totalCount: 0,  // Initialize totalCount
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        console.log("API Response Payload:", action.payload); // Log the entire payload
        state.status = "succeeded";
        state.data = action.payload.users || [];  // Ensure users are being correctly assigned
        
        // Ensure totalCount is calculated correctly
        state.totalCount = action.payload.totalCount || action.payload.users.length;  
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
