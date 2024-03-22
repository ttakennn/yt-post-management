import { POST_API } from 'src/constant';
import axiosClient from './axiosClient';
import { Post } from 'src/interfaces';

const postApi = {
  getPosts() {
    const url = POST_API.POSTS;
    return axiosClient.get(url);
  },
  createPost(newPost: Post): Promise<any> {
    const url = POST_API.POSTS;
    return axiosClient.post(url, newPost);
  },
};

export default postApi;
