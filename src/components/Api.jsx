import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// 🔹 Interceptor: Automatisch Token zum Header hinzufügen
Api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

// 🔹 Interceptor: Automatisch auf 401 (Unauthorized) reagieren
Api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.warn("❌ Nicht autorisiert - Weiterleitung zum Login");
        localStorage.removeItem("token"); // Token löschen
        window.location.href = "/login"; // Weiterleitung zur Login-Seite
      }
      return Promise.reject(error);
    }
);

export default Api;
