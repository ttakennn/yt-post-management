import { POST_API } from 'src/constant';
import axiosClient from './axiosClient';
import { Post, SearchProps } from 'src/interfaces';

const postApi = {
  getPostById(id: string) {
    const url = POST_API.POSTS;
    return axiosClient.get(`${url}/${id}`);
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
  getPostsBySearch(searchQuery: SearchProps): Promise<any> {
    const url = `${POST_API.POSTS}/search?page=${searchQuery.page || 1}&title=${
      searchQuery.title || ''
    }&tags=${searchQuery.tags}`;

    return axiosClient.get(url);
  },
  commentPost(id: string, name: string, comment: string): Promise<any> {
    const url = `${POST_API.POSTS}`;
    return axiosClient.post(`${url}/${id}/commentPost`, { name, comment });
  },
};

export default postApi;
