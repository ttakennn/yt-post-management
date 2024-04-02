import { configureStore } from '@reduxjs/toolkit'
import postsSlice from 'src/reducers/postSlice'
import authSlice from 'src/reducers/authSlice'

const rootReducer = {
  posts: postsSlice,
  auth: authSlice,
}

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;