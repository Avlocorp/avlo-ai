import axios from "axios";
import config from "../../config";
import { storage } from "../../services";
const api = axios.create({
  baseURL: config.API_ROOT,
  timeout: 30000, // 30 seconds
});
console.log("error");

api.defaults.headers.common["Accept"] = "application/json";
api.interceptors.request.use(
  (configs) => {
    if (storage.get("token")) {
      configs.headers.Authorization = `Bearer ${storage.get("token")}`;
    }
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
