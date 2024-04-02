import {
  ThumbUpAlt,
  ThumbUpAltOutlined,
  ThumbUpOutlined,
} from '@mui/icons-material';
import { useAppSelector } from 'src/hooks/useTypeSelector';
import { Post } from 'src/interfaces';

export interface ILikePostProps {
  post: Post;
}

export default function LikePost({ post }: ILikePostProps) {
  const auth = useAppSelector((state) => state.auth.data);

  if (post?.likeCount && post?.likeCount.length > 0) {
    return post.likeCount.find((like) => like === auth.userProfile?._id) ? (
      <>
        <ThumbUpAlt fontSize="small" />
        &nbsp; {post.likeCount?.length}{' '}
        {post.likeCount?.length === 1 ? 'Like' : 'Likes'}
      </>
    ) : (
      <>
        <ThumbUpOutlined fontSize="small" />
        &nbsp; {post.likeCount?.length}{' '}
        {post.likeCount?.length === 1 ? 'Like' : 'Likes'}
      </>
    );
  }

  return (
    <>
      <ThumbUpAltOutlined fontSize="small" />
      &nbsp; Like
    </>
  );
}
