// src/services/authService.ts
import axiosInstance from "../utils/AxiosInstance";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    console.error("Register error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
