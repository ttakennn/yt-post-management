import { configureStore } from '@reduxjs/toolkit'
import postsSlice from 'src/reducers/postSlice'

const rootReducer = {
  posts: postsSlice,
}

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;