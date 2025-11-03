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

// Interceptor para adicionar token JWT nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// opcional: interceptors para auth / erros
api.interceptors.response.use(
  res => res,
  err => {
    // Se o token expirou ou é inválido, redireciona para login
    if (err?.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("username");
      window.location.href = "/home";
    }
    // padroniza erro
    return Promise.reject(err?.response?.data || err);
  }
);

export default api;
