import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import postApi from "src/api/post-api";
import { ACTIONS, REDUCERS } from "src/constant";
import { Post } from "src/interfaces";

export const getPosts = createAsyncThunk(ACTIONS.GET_POSTS, async () => {
  const response = await postApi.getPosts();
  return response?.data || [];
});

export const createPosts = createAsyncThunk(ACTIONS.CREATE_POSTS,
  async (newPost: Post, thunkApi) => {
    try {

      const response = await postApi.createPost(newPost);

      console.log("createPosts api: ", response);
      return (response?.data as Post) || [];
    } catch (error) {
      let errorMessage = "Unknown error!";
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || "Unknown error!";
      }

      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  data: [] as Post[],
}

const postsSlice = createSlice({
  name: REDUCERS.POSTS,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        console.log("getPosts: ", action);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createPosts.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        if (action.payload) {
          state.data.push(action.payload);
        }
      })
      .addCase(createPosts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addMatcher((action) => action.type.endsWith('pending'), (state, action) => {
        state.loading = true;
      })
  }
})

export default postsSlice.reducer;