import { POST_API } from 'src/constant';
import { Post, SearchProps } from 'src/interfaces';
import { AxiosInstance } from 'axios';

const postApi = {
  getPostById(id: string, axiosInstance: AxiosInstance) {
    const url = POST_API.POSTS;
    return axiosInstance.get(`${url}/${id}`);
  },
  createPost(newPost: Post, axiosInstance: AxiosInstance): Promise<any> {
    const url = POST_API.POSTS;
    return axiosInstance.post(url, newPost);
  },
  updatePost(
    id: string,
    updatePost: Post,
    axiosInstance: AxiosInstance,
  ): Promise<any> {
    const url = POST_API.POSTS;
    return axiosInstance.patch(`${url}/${id}`, updatePost);
  },
  deletePost(id: string, axiosInstance: AxiosInstance): Promise<any> {
    const url = POST_API.POSTS;
    return axiosInstance.delete(`${url}/${id}`);
  },
  likePost(id: string, axiosInstance: AxiosInstance): Promise<any> {
    const url = POST_API.POSTS;
    return axiosInstance.patch(`${url}/${id}/likePost`);
  },
  getPostsBySearch(
    searchQuery: SearchProps,
    axiosInstance: AxiosInstance,
  ): Promise<any> {
    const url = `${POST_API.POSTS}/search?page=${searchQuery.page || 1}&title=${
      searchQuery.title || ''
    }&tags=${searchQuery.tags}`;

    return axiosInstance.get(url);
  },
  commentPost(
    id: string,
    name: string,
    comment: string,
    axiosInstance: AxiosInstance,
  ): Promise<any> {
    const url = `${POST_API.POSTS}`;
    return axiosInstance.post(`${url}/${id}/commentPost`, { name, comment });
  },
};

export default postApi;
