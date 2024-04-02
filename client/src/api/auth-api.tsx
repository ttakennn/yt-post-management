import { AuthForm, AuthResponse } from 'src/interfaces/auth.interface';
import { AUTH_API } from 'src/constant';
import axiosClient from './axiosClient';

const authApi = {
  signin(formData: AuthForm): Promise<any> {
    const url = AUTH_API.SIGN_IN;
    return axiosClient.post(url, formData);
  },
  signup(formData: AuthForm): Promise<AuthResponse> {
    const url = AUTH_API.SIGN_UP;
    return axiosClient.post(url, formData);
  },
};

export default authApi;
