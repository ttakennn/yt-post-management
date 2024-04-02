import { STORAGE } from "src/constant";
import { useAppDispatch } from "./useTypeSelector"
import { saveAuth } from "src/reducers/authSlice";
import { Auth } from "src/interfaces";

export const useAuthLoader = () => {
  const dispatch = useAppDispatch();

  const fetchAuthData = () => {
    const userProfile = localStorage.getItem(STORAGE.USER_PROFILE);
    if (userProfile) {
      const authData = JSON.parse(userProfile) as Auth;
      dispatch(saveAuth(authData));
    }
  }

  return { fetchAuthData };
}