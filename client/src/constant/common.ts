export const POST_API = {
  POSTS: 'posts',
}

export const AUTH_API = {
  SIGN_IN: 'user/signin',
  SIGN_UP: 'user/signup',
}

export const REDUCERS = {
  POSTS: 'posts',
  AUTH: 'auth',
}

export const ACTIONS = {
  GET_POST_BY_ID: "postsSlice/getPostById",
  CREATE_POSTS: "postsSlice/createPosts",
  UPDATE_POSTS: "postsSlice/updatePosts",
  DELETE_POSTS: "postsSlice/deletePosts",
  LIKE_POSTS: "postsSlice/likePosts",
  GET_POST_BY_SEARCH: "postsSlice/getPostBySearch",
  COMMENT_POST: "postsSlice/commentPost",

  SIGN_IN: 'auth/signin',
  SIGN_UP: 'auth/signup',
}

export const STORAGE = {
  USER_PROFILE: 'user-profile'
}