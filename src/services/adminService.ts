// src/services/adminService.ts
import axiosInstance from "../utils/AxiosInstance";
import logAxiosError from "../utils/LogAxiosError";

export const getAdminDashboard = async () => {
  try {
    const response = await axiosInstance.get("/admin/dashboard");
    return response.data.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getAdminProfile = async () => {
 try{
  const response = await axiosInstance.get("/admin/profile");
  return response.data;
 }catch(error: any){
  throw error.response?.data || error;
 }
}

export const updateMealPlan = async () => {
  try{
    const response = await axiosInstance.put("/admin/update-mealplan");
    return response.data;
  }catch(error: any){
      throw error.response?.data || error;
  }
}

export const getUserById = async (id?: string) => {
  try {
    const response = await axiosInstance.get(`/admin/users/${id}`);
    return response.data;
  } catch (error: any) {
    logAxiosError(error, "Get User");
    throw error.response?.data || error;
  }
};
export const assignNutritionist = async (clientId: string, nutritionistId: string) => {
  const response = await axiosInstance.patch(`/admin/assign-nutritionist`, {
    clientId,
    nutritionistId,
  });
  return response.data.client;
};

export const getClientProfile = async(clientId: string) => {
  const response = await axiosInstance.get(`/admin/client/${clientId}`);
  console.log(response);
  return response.data;
}

