// src/lib/api.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"; // ajustar conforme backend

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// opcional: interceptors para auth / erros
api.interceptors.response.use(
  res => res,
  err => {
    // padroniza erro
    return Promise.reject(err?.response?.data || err);
  }
);

export default api;
