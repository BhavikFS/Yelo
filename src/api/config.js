// axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://164.52.197.9:8080",
});

api.interceptors.request.use(
  (config) => {
    let data = localStorage.getItem("data"); // Assuming the token is stored in localStorage
    data = JSON.parse(data);
    console.log(data, "data");
    if (data?.jwt) {
      config.headers["Authorization"] = `Bearer ${data?.jwt}`;
    }
    config.headers["Accept"] = "*/*";
    config.headers["Accept-Language"] = "en-US,en;q=0.9";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Modify response data here
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear();
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }
    // Handle errors globally
    return Promise.reject(error);
  }
);

export default api;
