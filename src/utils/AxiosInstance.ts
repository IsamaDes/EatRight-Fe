import axios from 'axios';

const axiosInstance = axios.create({
   baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://eat-right-be.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosInstance;