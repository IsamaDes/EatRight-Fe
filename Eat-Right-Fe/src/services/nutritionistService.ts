// src/services/nutritionistService.ts
import axiosInstance from "../utils/AxiosInstance";

export const getNutritionistProfile = async () => {
  try {
    const response = await axiosInstance.get("/nutritionist/profile");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export const getClientsForNutritionist = async () => {
  try {
    const response = await axiosInstance.get("/nutritionist/clients");
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
