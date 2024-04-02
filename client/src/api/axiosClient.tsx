import axios from 'axios';
import { STORAGE } from 'src/constant';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// interceptor
axiosClient.interceptors.request.use((req) => {
  const userProfileStorage = localStorage.getItem(STORAGE.USER_PROFILE);

  if (userProfileStorage) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(userProfileStorage).access_token
    }`;
  }

  return req;
});

export default axiosClient;
