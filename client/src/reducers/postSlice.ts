import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import postApi from "src/api/post-api";
import { ACTIONS, REDUCERS } from "src/constant";
import { Post } from "src/interfaces";

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
      .addCase(createPosts.pending, (state, action) => {
        console.log("createPosts pending: ", action);
        state.loading = true;
      })
      .addCase(createPosts.fulfilled, (state, action: PayloadAction<Post>) => {
        console.log("createPosts: ", action);
        state.loading = false;
        if (action.payload) {
          state.data.push(action.payload);
        }
      })
      .addCase(createPosts.rejected, (state, action: PayloadAction<any>) => {
        console.log("createPosts error: ", action);
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export default postsSlice.reducer;