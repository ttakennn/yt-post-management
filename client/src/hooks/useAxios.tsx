import { useEffect } from 'react';
import { useAppSelector } from './useTypeSelector';
import axiosClient from 'src/api/axiosClient';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from 'src/components/Toast/toast-provider';

export const useAxios = () => {
  const { logout, getToken } = useAuth();
  const { data: auth } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const showToast = useToastContext();

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
      async (error) => {
        const configRequest = error?.config;
        if (error?.response?.status === 401 && !configRequest?._retry) {
          configRequest._retry = true;

          try {
            const newAccessToken = await getToken();
            configRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            return axiosClient(configRequest);
          } catch (error: any) {
            const status = error?.response?.status ?? '';
            if (status === 403) {
              await logout();

              showToast('Session Expired.', 'error');
              navigate('/auth');
            }
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosClient.interceptors.request.eject(reqInterceptor);
      axiosClient.interceptors.response.eject(resInterceptor);
    };
  }, [auth]);

  return axiosClient;
};
