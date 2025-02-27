import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired, trying to refresh...");

      try {
        await axiosInstance.get(
          "/auth/refreshToken",
          {},
          { withCredentials: true }
        );

        return axiosInstance(error.config);
      } catch (refreshError) {
        console.error("Refresh token failed. Logging out...");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
