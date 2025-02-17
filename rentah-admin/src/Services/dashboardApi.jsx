import { api } from "./api";

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    
    getDashboardDetails: builder.query({
        query: () => "/users/admin-dashboard",
        providesTags: ["Dashboard"],
        keepUnusedDataFor: 10,  // Cache API response for 10 seconds
        refetchOnMountOrArgChange: false, // Avoid unnecessary re-fetch
      }),
  }),
});

export const { useGetDashboardDetailsQuery } = dashboardApi;
