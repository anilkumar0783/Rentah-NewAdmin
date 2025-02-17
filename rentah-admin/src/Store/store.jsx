import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import listingReducer from "./listingSlice";
import usersReducer from "./usersSlice";
import { api } from "../Services/api";
import { authApi } from "../Services/authService";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    listings: listingReducer, 
    users:usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, authApi.middleware),
});

export default store;
