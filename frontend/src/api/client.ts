import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    toast.error(err.response?.data || "Error");
    return Promise.reject(err);
  }
);

export default api;