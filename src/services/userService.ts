
import axiosInstance from "../utils/AxiosInstance";

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};


export const updateUserProfile = async (data: any) => {
  try{
    const response = await axiosInstance.patch("/users/update-profile", data);
  return response.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};