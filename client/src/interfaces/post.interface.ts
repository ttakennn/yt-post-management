export interface Post {
  _id?: string | null;
  userId?: string;
  creator: string;
  title: string;
  message: string;
  tags: string;
  selectedFile: File | string | null;
  fileName?: string;
  createdAt?: string;
  likeCount?: string[];
}

export interface PostRequest {
  status: string;
  message: string;
}