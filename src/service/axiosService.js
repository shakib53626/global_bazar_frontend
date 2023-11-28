import axios from "axios";
import { useAuth } from "@/stores";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL + "/api",
});

axiosInstance.interceptors.request.use(
function (config) {
    const authInfo = useAuth();
    const auth = authInfo.user.data ? `Bearer ${authInfo.user.meta.token}` : "";
    config.headers['Authorization'] = auth;
    return config;
}, function (error) {
return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const authInfo = useAuth();
      authInfo.user = {};
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;