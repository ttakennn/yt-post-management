import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/useTypeSelector';
import { CommentProps, Post } from 'src/interfaces';
import { commentPost } from 'src/reducers/postSlice';

export interface IPostCommentsProps {
  post: Post;
}

export default function PostComments({ post }: IPostCommentsProps) {
  const [comment, setComment] = useState('');
  const commentRef = useRef<HTMLDivElement>(null);

  const [commentList, setCommentList] = useState<CommentProps[]>(
    post?.comments ?? [],
  );

  const { data: user } = useAppSelector((state) => state.auth);
  const { loadingComment } = useAppSelector((state) => state.posts);

  const dispatch = useAppDispatch();

  const handleCommentClick = async () => {
    if (user.userProfile) {
      const payload = {
        id: post._id ?? null,
        name: user.userProfile.name,
        comment: comment,
      };

      const newPost = (await dispatch(
        commentPost(payload),
      )) as PayloadAction<Post>;

      const newCommentList = newPost?.payload?.comments ?? [];
      setCommentList(newCommentList);
      setComment('');
    }
  };

  useEffect(() => {
    commentRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [commentList]);

  return (
    <Box
      sx={{
        display: {
          xs: 'inline',
          sm: 'flex',
        },
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          height: '200px',
          overflow: 'auto',
          marginRight: '30px',
          flexGrow: 1,
        }}
      >
        <Box sx={{ width: '100%', position: 'sticky', top: 0, zIndex: 999 }}>
          <Typography
            gutterBottom
            variant="h6"
            sx={{
              backgroundColor: 'white',
              padding: 1,
              borderBottom: '1px solid lightgray',
            }}
          >
            Comments
          </Typography>
        </Box>
        <Box>
          {commentList.length > 0 &&
            commentList.map((comment, idx) => (
              <Typography key={idx} gutterBottom variant="subtitle1">
                <Stack direction="column">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, fontSize: '0.8rem' }}
                  >{`${comment.name}`}</Typography>

                  <Typography variant="subtitle2">
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="start"
                    >
                      <Chip size="small" label={comment.message} />
                      <Typography
                        component="div"
                        sx={{
                          display: 'contents',
                          fontFamily: 'ui-monospace',
                          fontSize: 'oblique',
                          color: 'hotpink',
                          textAlign: 'right',
                          padding: 1,
                        }}
                      >
                        {moment(comment.createdAt).format('HH:mm')}
                      </Typography>
                    </Stack>
                  </Typography>
                </Stack>
              </Typography>
            ))}
        </Box>

        <Box ref={commentRef}></Box>
      </Box>
      <Box
        sx={{
          width: { xs: '100%', sm: '50%' },
          display: 'flex',
          flexDirection: 'column',
          marginTop: 2,
          pointerEvents: user?.userProfile?.name ? 'visible' : 'none',
          opacity: user?.userProfile?.name ? 1 : 0.5,
        }}
      >
        <Typography gutterBottom variant="h6">
          Write a comment
        </Typography>
        <TextField
          fullWidth
          rows={4}
          variant="outlined"
          label="Comment"
          multiline
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          sx={{ mt: 1.5 }}
          fullWidth
          variant="contained"
          disabled={!comment}
          onClick={handleCommentClick}
        >
          {loadingComment && (
            <CircularProgress size={15} sx={{ mr: 1 }} color="secondary" />
          )}
          Comment
        </Button>
      </Box>
    </Box>
  );
}
