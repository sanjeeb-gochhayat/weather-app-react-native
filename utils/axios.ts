import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org',
});

export default axiosInstance;