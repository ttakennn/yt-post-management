import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSkeletonPostDetails from 'src/components/skeleton/loading-skeleton-post-details';
import { useAppDispatch, useAppSelector } from 'src/hooks/useTypeSelector';
import { Post } from 'src/interfaces';
import { getPostById, getPostBySearch } from 'src/reducers/postSlice';

export interface IPostDetailsProps {}

export default function PostDetails(props: IPostDetailsProps) {
  const [suggestPosts, setSuggestPosts] = useState<Post[]>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    post,
    data: postList,
    loading,
  } = useAppSelector((state) => state.posts);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getPostById({ id }));
    }
  }, [id]);

  useEffect(() => {
    if (post?._id) {
      dispatch(
        getPostBySearch({
          searchQuery: { page: 1, title: '', tags: post?.tags },
        }),
      );
    }
  }, [post]);

  useEffect(() => {
    if (postList.length) {
      const result = postList.filter(({ _id }) => _id !== post._id);
      setSuggestPosts(result);
    }
  }, [postList]);

  const openPost = (id: string) => {
    if (id) {
      navigate(`/post/${id}`);
    }
  };

  if (!post._id) {
    return null;
  }

  if (loading) {
    return <LoadingSkeletonPostDetails />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 10 }}>
      <Paper sx={{ padding: 2, borderRadius: 1.5 }} elevation={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          }}
        >
          <Box sx={{ borderRadius: 2.5, margin: 1.5, flex: 1 }}>
            <Typography variant="h4" component="h2">
              {post.title}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="h2"
              color="textSecondary"
            >
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {post.message}
            </Typography>
            <Typography variant="h6">Created By: {post.creator}</Typography>
            <Typography variant="body1">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: '100%', sm: '100%', md: '400px' },
              height: { xs: 'auto', sm: 'auto', md: '300px' },
            }}
          >
            <img
              style={{
                borderRadius: 2.5,
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
              src={post.selectedFile as string}
              alt={post.title}
            />
          </Box>
        </Box>
        <Divider sx={{ mt: 2, mb: 2 }} />

        {!!setSuggestPosts.length && (
          <Box sx={{ borderRadius: 2.5, margin: 1.5, flex: 1 }}>
            <Typography gutterBottom variant="h6">
              You might also like this posts.
            </Typography>
            <Grid container spacing={2}>
              {suggestPosts.map(
                ({
                  title,
                  tags,
                  creator,
                  message,
                  likeCount,
                  selectedFile,
                  _id,
                }) => (
                  <Grid item xs={12} sm={6} md={4} key={_id}>
                    <Paper
                      onClick={() => openPost(_id ?? '')}
                      sx={{ cursor: 'pointer', padding: 2, mt: 2 }}
                      key={_id}
                    >
                      <Typography gutterBottom variant="h6">
                        {title}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        color="textSecondary"
                      >
                        {tags.map((tag) => `#${tag} `)}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        {creator}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        style={{
                          display: '-webkit-box',
                          maxWidth: '200px',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {message}
                      </Typography>
                      <Typography gutterBottom variant="subtitle1">
                        Likes: {likeCount?.length ?? 0}
                      </Typography>
                      <img
                        alt={title}
                        src={selectedFile as string}
                        style={{
                          width: '100%',
                          height: '180px',
                          objectFit: 'cover',
                        }}
                      />
                    </Paper>
                  </Grid>
                ),
              )}
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
