import {
  DeleteOutline,
  Edit,
  LocalOffer,
  ThumbUpAlt,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Typography,
  styled,
} from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import moment from 'moment';
import { stringAvatar } from 'src/Utils';
import LikePost from 'src/components/LikePost/like-post';
import { useAppDispatch, useAppSelector } from 'src/hooks/useTypeSelector';
import { Post } from 'src/interfaces';
import { deletePost, likePost } from 'src/reducers/postSlice';

// const CustomCardContent = styled(CardContent)`
//   > p {
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     overflow: hidden;
//   }
// `;

const CustomCardContent = styled(CardContent)(({ theme }) => ({
  '> p': {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

export interface IPostDetailsProps {
  post: Post;
  onEditPost?: (post: Post) => void;
  onLikePost?: () => void;
}

export default function PostDetails({
  post,
  onEditPost,
  onLikePost,
}: IPostDetailsProps) {
  const confirm = useConfirm();

  const dispatch = useAppDispatch();
  const { data: auth } = useAppSelector((state) => state.auth);

  const onPostEditChange = (post: Post) => {
    if (onEditPost) {
      onEditPost(post);
    }
  };

  const onDeleteChange = (id: string) => {
    confirm({
      title: `Are you sure delete this post?`,
    })
      .then(() => dispatch(deletePost({ id: id })))
      .catch(() => console.log('Cancel delete!'));
  };

  const handleLikePost = async (post: Post) => {
    await dispatch(likePost({ id: post?._id ?? '' }));

    if (onLikePost) {
      onLikePost();
    }
  };

  const showIcon = (isEdit: boolean) => {
    const authId = auth?.userProfile?._id ?? null;
    if (authId && post?.userId === authId) {
      const display = `inline-${isEdit ? 'block' : 'flex'}`;
      return display;
    }

    return 'none';
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '16px',
        position: 'relative',
      }}
    >
      <CardHeader
        avatar={<Avatar sizes="small" {...stringAvatar(post.creator)} />}
        action={
          <IconButton
            aria-label="edit-card"
            onClick={() => onPostEditChange(post)}
            sx={{ display: showIcon(true) }}
          >
            <Edit fontSize="small" />
          </IconButton>
        }
        title={post.creator}
        subheader={moment(post.createdAt).fromNow()}
      />
      <CardMedia
        sx={{
          height: 0,
          paddingTop: '56.25%',
          backgroundColor: 'rgba(0, 0,0, 0.5)',
          backgroundBlendMode: 'darken',
        }}
        image={post.selectedFile as string}
      ></CardMedia>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '20px',
        }}
      >
        <Typography variant="body2" color="textSecondary" component="div">
          {post.tags?.split(',').map((item) => (
            <Chip
              size="small"
              key={item}
              label={`${item}`}
              icon={<LocalOffer />}
              sx={{ marginRight: '4px' }}
            />
          ))}
        </Typography>
      </Box>
      <Typography sx={{ padding: '0 16px' }} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CustomCardContent>
        <Typography variant="body2" color="text.secondary">
          {post.message}
        </Typography>
      </CustomCardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          size="small"
          color="primary"
          onClick={() => handleLikePost(post)}
          disabled={!auth?.userProfile?._id}
        >
          <LikePost post={post} />
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => onDeleteChange(post?._id ?? '')}
          sx={{ display: showIcon(false) }}
        >
          <DeleteOutline fontSize="small" /> &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  );
}
