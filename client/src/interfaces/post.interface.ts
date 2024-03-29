export interface Post {
  _id?: string | null;
  creator: string;
  title: string;
  message: string;
  tags: string;
  selectedFile: File | string | null;
  fileName?: string;
  createdAt?: string;
  likeCount?: number;
}

export interface PostRequest {
  status: string;
  message: string;
}