import { useEffect } from 'react';
import { useAppSelector } from './useTypeSelector';
import axiosClient from 'src/api/axiosClient';

export const useAxios = () => {
  const { data: auth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const reqInterceptor = axiosClient.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.access_token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    const resInterceptor = axiosClient.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error), // handle refresh token
    );

    return () => {
      axiosClient.interceptors.request.eject(reqInterceptor);
      axiosClient.interceptors.response.eject(resInterceptor);
    };
  }, [auth]);

  return axiosClient;
};
