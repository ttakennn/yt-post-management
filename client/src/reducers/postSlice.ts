import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import postApi from "src/api/post-api";
import { ACTIONS, REDUCERS } from "src/constant";
import { Post, PostSearch, SearchProps } from "src/interfaces";

export const getPostById = createAsyncThunk<Post[], { id: string }>(ACTIONS.GET_POST_BY_ID, async ({ id }) => {
  const response = await postApi.getPostById(id);
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

export const updatePost = createAsyncThunk<Post, { id: string, updatePost: Post }>(
  ACTIONS.UPDATE_POSTS, async ({ id, updatePost }, thunkApi) => {
    try {
      const response = await postApi.updatePost(id, updatePost);

      return response?.data || [];
    } catch (error: any) {
      const errorMessage = error.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const deletePost = createAsyncThunk<string, { id: string | null }>(
  ACTIONS.DELETE_POSTS, async ({ id }, thunkApi) => {
    try {
      if (id === null) {
        return thunkApi.rejectWithValue("Failed to delete post");
      }

      await postApi.deletePost(id);

      return id;
    } catch (error: any) {
      const errorMessage = error.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const likePost = createAsyncThunk<Post, { id: string | null }>(
  ACTIONS.LIKE_POSTS, async ({ id }, thunkApi) => {
    try {
      if (id === null) {
        return thunkApi.rejectWithValue("Failed to like post");
      }

      const response = await postApi.likePost(id);

      return response?.data || [];
    } catch (error: any) {
      const errorMessage = error.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const getPostBySearch = createAsyncThunk<PostSearch, { searchQuery: SearchProps }
>(ACTIONS.GET_POST_BY_SEARCH, async ({ searchQuery }) => {
  const response = await postApi.getPostsBySearch(searchQuery);

  return (response?.data as PostSearch) || [];
})

const initialState = {
  loading: false,
  error: null,
  data: [] as Post[],
  post: {} as Post,
  currentPage: 1,
  totalPage: 0,
}

const postsSlice = createSlice({
  name: REDUCERS.POSTS,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostById.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        if (action.payload.length) {
          state.post = action.payload[0];
        }
      })
      .addCase(createPosts.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        if (action.payload) {
          state.data.push(action.payload);
        }
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.data = state.data.map((post: Post) =>
          post._id === action.payload._id ? action.payload : post
        )
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.data = state.data.filter((post: Post) => post._id !== action.payload);
      })
      .addCase(likePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.data = state.data.map((post: Post) =>
          post._id === action.payload._id ? action.payload : post
        )
      })
      .addCase(getPostBySearch.fulfilled, (state, action: PayloadAction<PostSearch>) => {
        state.loading = false;
        const { data, currentPage, totalPage } = action.payload;
        state.data = data;
        state.currentPage = currentPage;
        state.totalPage = totalPage;
      })
      .addMatcher((action) => action.type.endsWith('pending'), (state, action) => {
        state.loading = true;
      })
      .addMatcher((action) => action.type.endsWith('rejected'), (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export default postsSlice.reducer;