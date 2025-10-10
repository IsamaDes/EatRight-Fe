import axios, { AxiosResponse, AxiosError } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set userID globally for all requests
export const setUserContext = (userId: string) => {
  axiosInstance.defaults.params = {
    ...axiosInstance.defaults.params,
    user_id: userId,
  };
};

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.error('Unauthorized! Redirecting to login.');
      } else if (status === 403) {
        console.error(
          "Forbidden! You don't have permission to access this resource."
        );
      } else if (status === 500) {
        console.error('Server Error! Please try again later.');
      }
    } else {
      console.error('Network error! Please check your connection.');
    }
    return Promise.reject(error);
  }
);

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.warn('⚠️ No access token found in localStorage!');
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
