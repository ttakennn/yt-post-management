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
  updatePost(id: string, updatePost: Post): Promise<any> {
    const url = POST_API.POSTS;
    return axiosClient.patch(`${url}/${id}`, updatePost);
  },
  deletePost(id: string): Promise<any> {
    const url = POST_API.POSTS;
    return axiosClient.delete(`${url}/${id}`);
  },
  likePost(id: string): Promise<any> {
    const url = POST_API.POSTS;
    return axiosClient.patch(`${url}/${id}/likePost`);
  },
};

export default postApi;
