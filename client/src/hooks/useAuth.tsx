import { removeAuth, saveAuth } from 'src/reducers/authSlice';
import { useAppDispatch } from './useTypeSelector';
import axiosClient from 'src/api/axiosClient';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const logout = async () => {
    dispatch(removeAuth());
    await axiosClient.get(`/user/logout`);
  };

  const getToken = async () => {
    const refreshTokenRes = await axiosClient.get(`/user/refresh-token`);
    const newAccessToken = refreshTokenRes.data.accessToken;

    dispatch(
      saveAuth({
        access_token: newAccessToken,
      }),
    );

    return newAccessToken;
  };

  return { logout, getToken };
};
