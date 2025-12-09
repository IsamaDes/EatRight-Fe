// import axiosInstance from "../utils/AxiosInstance";

// export interface User {
//   first_name: string;
//   last_name: string;
//   user_name: string;
//   email: string;
//   role: string;
//   profile_picture?: string;
// }

//     export const getCurrentUser = async () => {
//      const response = await axiosInstance.get("/users/me", {
//     withCredentials: true,
//   });
//    return response.data;
// }







// userService.ts
import axiosInstance from "../utils/AxiosInstance";

// Define the user profile interface
export interface UserProfile {
  id: string;
  userId: string;
  healthGoal: string | null;
  age: number | null;
  subscription: string | null;
  assignedNutritionistId: string | null;
}

// Define the main user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profile: UserProfile;
}



// Get current user function
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/users/me", {
    withCredentials: true,
  });
  return response.data;
};

// Update user profile
export const updateUserProfile = async (profileData: Partial<UserProfile>) => {
  const response = await axiosInstance.patch("/users/profile", profileData, {
    withCredentials: true,
  });
  return response.data;
};