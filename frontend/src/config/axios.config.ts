import axios from "axios";
import envConfig from "./env.config";

export const axiosConfig = axios.create({
  baseURL: envConfig.base_url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export default axiosConfig;
