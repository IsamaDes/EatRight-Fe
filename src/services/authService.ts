// src/services/authService.ts
import Register from "../components/Register";
import axiosInstance from "../utils/AxiosInstance";
import logAxiosError from "../utils/LogAxiosError"

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
    logAxiosError(error, "REGISTER");
    throw error.response?.data || error;
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    console.log("📡 Axios Base URL:", axiosInstance.defaults.baseURL);
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    logAxiosError(error, "LOGIN");
    throw error.response?.data || error;
  }
};
