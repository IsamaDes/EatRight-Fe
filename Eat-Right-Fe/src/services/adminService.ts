// src/services/adminService.ts
import axiosInstance from "../utils/AxiosInstance";

export const getAdminDashboard = async () => {
  try {
    const response = await axiosInstance.get("/admin/dashboard");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
