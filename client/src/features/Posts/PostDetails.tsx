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
import moment from 'moment';
import { stringAvatar } from 'src/Utils';
import { Post } from 'src/interfaces';

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
}

export default function PostDetails({ post }: IPostDetailsProps) {
  console.log('post details: ', post);
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
          <IconButton aria-label="edit-card">
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
          padding: '0 16px 8px 0',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button size="small" color="primary">
          <ThumbUpAlt fontSize="small" /> &nbsp; {post.likeCount}
        </Button>
        <Button size="small" color="primary">
          <DeleteOutline fontSize="small" /> &nbsp; Delete
        </Button>
      </CardActions>
    </Card>
  );
}
