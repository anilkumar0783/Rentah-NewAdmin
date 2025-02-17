const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://24.199.104.72/api" 
    : "http://24.199.104.72/api";

    export const getListingsApi = async (skip , limit ) => {
      try {
        console.log("Fetching listings from API...",skip,limit);
        const response = await fetch(`${BASE_URL}/listings-admin?skip=${skip}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("API Response:", data);
        return data; // Assuming API now returns { status, message, data, totalCount }
      } catch (error) {
        console.error("Error fetching listings:", error);
        throw error;
      }
  };
  
