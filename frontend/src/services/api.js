import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach token automatically to every request
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// Handle expired/invalid token globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// ================= AUTH =================

// Login
export const loginUser = (data) => API.post("/auth/login", data);

// Register
export const registerUser = (data) => API.post("/auth/register", data);

// ================= INTERVIEW =================

// Start interview
export const startInterview = (topic) => API.post("/interview/start", { topic });

// Get current question
export const getCurrentQuestion = (sessionId) =>
  API.get(`/interview/${sessionId}/question`);

// Submit answer
export const submitAnswer = (sessionId, answer) =>
  API.post(`/interview/${sessionId}/answer`, { answer });

// End interview
export const endInterview = (sessionId) =>
  API.post(`/interview/${sessionId}/end`);

// Dashboard summary
export const getDashboardSummary = () => API.get("/interview/dashboard/summary");

export default API;
