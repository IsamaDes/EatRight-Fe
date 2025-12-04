import axiosInstance from "../utils/AxiosInstance";

export interface User {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  role: string;
  profile_picture?: string;
}

    export const getCurrentUser = async () => {
     const response = await axiosInstance.get("/users/me", {
    withCredentials: true,
  });
   return response.data;
}