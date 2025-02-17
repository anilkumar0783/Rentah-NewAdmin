import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://24.199.104.72/api" 
    : "http://24.199.104.72/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getListings: builder.query({
      query: () => "/listings-admin",
    }),
  }),
});

export const { useGetListingsQuery } = api; // Export hook
