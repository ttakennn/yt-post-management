import { Alert, AlertTitle, Grid, Snackbar } from '@mui/material';
import { useState } from 'react';
import CustomPostDialogForm from 'src/components/CustomMui/custom-post-dialog-form';
import { useAppSelector } from 'src/hooks/useTypeSelector';
import { Post } from 'src/interfaces';
import PostDetails from './PostDetails';

export interface IPostProps {}

export default function Posts(props: IPostProps) {
  const [open, setOpen] = useState(false);
  const [postEdit, setPostEdit] = useState({
    _id: '',
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  } as Post);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState('');

  const { data: postList } = useAppSelector((state) => state.posts);

  const onEditPostChange = (post: Post) => {
    console.log('onEditPostChange: ', post);
    setPostEdit(post);
    setOpen(true);
  };

  const onLikePostChange = (post: Post) => {
    console.log('onLikePostChange: ', post);
    setOpenSnackBar(true);
    setMessageSnackBar('Like success!');
  };

  const handleSnackBarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
    <Grid
      sx={{ display: 'flex', alignItems: 'center' }}
      container
      alignItems="stretch"
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 12, sm: 12, md: 12 }}
    >
      {postList.map((post) => (
        <Grid item key={post._id} xs={12} sm={6} md={4}>
          <PostDetails
            post={post}
            onEditPost={onEditPostChange}
            onLikePost={onLikePostChange}
          />
        </Grid>
      ))}

      <CustomPostDialogForm
        postEdit={postEdit}
        isOpen={open}
        setOpen={setOpen}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={openSnackBar}
        autoHideDuration={1000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          security="success"
          variant="standard"
          sx={{ width: '100%' }}
        >
          <AlertTitle>Success</AlertTitle>
          {messageSnackBar}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
