import { AxiosInstance } from "axios";

export interface Post {
  _id?: string | null;
  userId?: string;
  creator: string;
  title: string;
  message: string;
  tags: string[];
  selectedFile: File | string | null;
  fileName?: string;
  createdAt?: string;
  likeCount?: string[];
  comments?: CommentProps[];
}

export interface PostRequest {
  status: string;
  message: string;
}

export interface PostSearch {
  data: Post[],
  currentPage: number;
  totalPage: number;
}

export interface CommentProps {
  name: string;
  message: string;
  createdAt: string;
}

export interface PostProps {
  axiosInstance: AxiosInstance
}