// src/services/clientService.ts
import axiosInstance from "../utils/AxiosInstance";


export const getClientProfile = async () => {
  try {
    const response = await axiosInstance.get("/client/profile");
    return response.data;
  } catch (error: any) {
    console.error("Client profile error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

