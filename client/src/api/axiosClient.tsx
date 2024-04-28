import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export default axiosClient;
