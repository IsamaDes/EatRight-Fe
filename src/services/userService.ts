
// userService.ts
import axiosInstance from "../utils/AxiosInstance";

// Get current user function
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me", {
    withCredentials: true,
  });
  return response.data;
};

// Update user profile
export const updateUserProfile = async (data: any) => {
  try{
    const response = await axiosInstance.patch("/users/update-profile", data, {
    withCredentials: true,
  });
  return response.data;
  } catch (err: any) {
    throw err.response?.data || err;
  }
};