import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true, // ⬅️ Send cookies on every request
});

// OPTIONAL: Handle common error globally (e.g., 401)
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry // prevent infinite loop
    ) {
      originalRequest._retry = true;

      try {
        await apiClient.get("/auth/refresh"); // <-- sets new token in cookie
        return apiClient(originalRequest); // retry original request
      } catch (refreshError) {
        console.log(refreshError);
        console.error("Token refresh failed.");
        // optionally redirect to login
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
