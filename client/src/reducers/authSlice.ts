import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "src/api/auth-api";
import { ACTIONS, REDUCERS } from "src/constant";
import { Auth, AuthForm, EmailProfile } from "src/interfaces";

const getAuthData = (token: string, result: EmailProfile) => {
  let authData = {
    access_token: token,
    userProfile: result,
  } as Auth;

  return authData;
}

export const signup = createAsyncThunk<Auth, { formData: AuthForm }>(
  ACTIONS.SIGN_UP,
  async ({ formData }, thunkApi) => {
    try {
      const { data } = await authApi.signup(formData);
      const authData = getAuthData(data.token, data.result);

      return authData;
    } catch (error: any) {
      const errorMessage = error?.message || 'Unknown error';
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);

export const signin = createAsyncThunk<Auth, { formData: AuthForm }>(
  ACTIONS.SIGN_IN,
  async ({ formData }, thunkApi) => {
    try {
      const { data } = await authApi.signin(formData);
      const authData = getAuthData(data.token, data.result);

      return authData;
    } catch (error: any) {
      const errorMessage = error?.message || 'Unknown error';
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);


const fulfilledListType = [signup.fulfilled.type, signin.fulfilled.type];
const pendingListType = [signup.pending.type, signin.pending.type];
const rejectedListType = [signup.rejected.type, signin.rejected.type];

const initialState = {
  loading: false,
  error: null,
  data: {} as Auth
}

const authSlice = createSlice({
  name: REDUCERS.AUTH,
  initialState: initialState,
  reducers: {
    saveAuth: (state, action: PayloadAction<Auth>) => {
      state.data = { ...state.data, ...action.payload };
    },
    removeAuth: (state) => {
      state.data = {} as Auth;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => fulfilledListType.includes(action.type), (state, action: PayloadAction<Auth>) => {
          state.loading = false;
          const authData = action.payload;
          state.data = { ...state.data, ...authData };
        }
      )
      .addMatcher(
        (action) => pendingListType.includes(action.type), (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => rejectedListType.includes(action.type), (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

  }
})

export const { saveAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;