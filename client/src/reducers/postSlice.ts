import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import postApi from "src/api/post-api";
import { ACTIONS, REDUCERS } from "src/constant";
import { Post, PostProps, PostSearch, SearchProps } from "src/interfaces";

export const getPostById = createAsyncThunk<Post[], { id: string, postProps: PostProps }>(ACTIONS.GET_POST_BY_ID, async ({ id, postProps }) => {
  const response = await postApi.getPostById(id, postProps.axiosInstance);
  return response?.data || [];
});

export const createPosts = createAsyncThunk<Post, { newPost: Post, postProps: PostProps }>(ACTIONS.CREATE_POSTS,
  async ({ newPost, postProps }, thunkApi) => {
    try {

      const response = await postApi.createPost(newPost, postProps.axiosInstance);

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

export const updatePost = createAsyncThunk<Post, { id: string, updatePost: Post, postProps: PostProps }>(
  ACTIONS.UPDATE_POSTS, async ({ id, updatePost, postProps }, thunkApi) => {
    try {
      const response = await postApi.updatePost(id, updatePost, postProps.axiosInstance);

      return response?.data || [];
    } catch (error: any) {
      const errorMessage = error.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const deletePost = createAsyncThunk<string, { id: string | null, postProps: PostProps }>(
  ACTIONS.DELETE_POSTS, async ({ id, postProps }, thunkApi) => {
    try {
      if (id === null) {
        return thunkApi.rejectWithValue("Failed to delete post");
      }

      await postApi.deletePost(id, postProps.axiosInstance);

      return id;
    } catch (error: any) {
      const errorMessage = error.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const likePost = createAsyncThunk<Post, { id: string | null, postProps: PostProps }>(
  ACTIONS.LIKE_POSTS, async ({ id, postProps }, thunkApi) => {
    try {
      if (id === null) {
        return thunkApi.rejectWithValue("Failed to like post");
      }

      const response = await postApi.likePost(id, postProps.axiosInstance);

      return response?.data || [];
    } catch (error: any) {
      const errorMessage = error.message;
      return thunkApi.rejectWithValue(errorMessage);
    }
  }
);

export const getPostBySearch = createAsyncThunk<PostSearch, { searchQuery: SearchProps, postProps: PostProps }
>(ACTIONS.GET_POST_BY_SEARCH, async ({ searchQuery, postProps }) => {
  const response = await postApi.getPostsBySearch(searchQuery, postProps.axiosInstance);

  return (response?.data as PostSearch) || [];
})

export const commentPost = createAsyncThunk<Post, { id: string | null, name: string, comment: string, postProps: PostProps }
>(ACTIONS.COMMENT_POST, async ({ id, name, comment, postProps }, thunkApi) => {
  try {
    if (id === null) {
      return thunkApi.rejectWithValue("Fail to comment post - id is null");
    }

    const response = await postApi.commentPost(id, name, comment, postProps.axiosInstance);

    return (response?.data as Post) || []
  } catch (error: any) {
    const errorMesage = error.message;
    return thunkApi.rejectWithValue(errorMesage);
  }
});

const pendingListType = [
  getPostById.pending.type,
  createPosts.pending.type,
  updatePost.pending.type,
  deletePost.pending.type,
  likePost.pending.type,
  getPostBySearch.pending.type,
];

const rejectedListType = [
  getPostById.rejected.type,
  createPosts.rejected.type,
  updatePost.rejected.type,
  deletePost.rejected.type,
  likePost.rejected.type,
  getPostBySearch.rejected.type,
]

const initialState = {
  loading: false,
  loadingComment: false,
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
      .addCase(commentPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.loadingComment = false;
        state.data = state.data.map((post: Post) =>
          post._id === action.payload._id ? action.payload : post
        )
      })
      .addCase(commentPost.pending, (state, action) => {
        state.loadingComment = true;
      })
      .addCase(commentPost.rejected, (state, action) => {
        state.loadingComment = false;
      })
      .addMatcher((action) => pendingListType.includes(action.type), (state, action) => {
        state.loading = true;
      })
      .addMatcher((action) => rejectedListType.includes(action.type), (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export default postsSlice.reducer;