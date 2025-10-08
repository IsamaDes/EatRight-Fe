// src/services/authService.ts
import axiosInstance from "../utils/AxiosInstance";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client" | "nutritionist";
}

export interface RegisterResponse {
  message: string;
  verificationToken: string;
  user?: { name: string; email: string; role: string };
}


interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axiosInstance.post<RegisterResponse>("/auth/register", data);
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
