import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        console.log("Login request initiated with credentials:", credentials);
        return {
          url: "/admins/login",
          method: "POST",
          body: credentials,
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          console.log("Login successful:", response.data);

          // Store login details in localStorage if response is successful
          if (response.data.status === true) {
            localStorage.setItem("token", response.data.token);
            const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
            localStorage.setItem("expirationTime", expirationTime);
            localStorage.setItem("adminId", response.data.admin._id);
            localStorage.setItem("adminImage", response.data.admin.adminImage);
            localStorage.setItem(
              "adminName",
              response.data.admin.firstName + " " + response.data.admin.lastName
            );
            localStorage.setItem("loginstatus", "1");
            localStorage.removeItem("rights");
            localStorage.setItem("adminType", response.data.admin.adminType);
            localStorage.setItem("rights", JSON.stringify(response.data.admin.rights));

            console.log("Login details saved to localStorage");
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    getProfile: builder.query({
      query: () => {
        console.log("Fetching profile...");
        return "auth/profile";
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          console.log("Profile data received:", response.data);
        } catch (error) {
          console.error("Profile fetch failed:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
