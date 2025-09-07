import api from "@/config/axios.config";
import type { LoginFormType } from "@/types/login";
import type { RegisterFormType } from "@/types/register";
import type { AxiosResponse } from "axios";

export const logoutApi = async () => {
  const response = await api.get("/api/v1/user/logout");
  return response.data;
};

export const loginApi = async (data: LoginFormType) => {
  const response = await api.post("/api/v1/user/login", data);
  return (response as AxiosResponse).data;
};

export const registerApi = async (data: RegisterFormType) => {
  const response = await api.post("/api/v1/user/register", data);
  return (response as AxiosResponse).data;
};
