import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://eat-right-be.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;