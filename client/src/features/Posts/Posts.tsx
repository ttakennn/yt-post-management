import { Alert, AlertTitle, Grid, Snackbar } from '@mui/material';
import { useState } from 'react';
import CustomPostDialogForm from 'src/components/CustomMui/custom-post-dialog-form';
import { useAppSelector } from 'src/hooks/useTypeSelector';
import { Post } from 'src/interfaces';
import PostDetails from './PostDetails';
import { useToastContext } from 'src/components/Toast/toast-provider';

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

  const { data: postList } = useAppSelector((state) => state.posts);

  const showToast = useToastContext();

  const onEditPostChange = (post: Post) => {
    console.log('onEditPostChange: ', post);
    setPostEdit(post);
    setOpen(true);
  };

  const onLikePostChange = () => {
    showToast('Like success!', 'success');
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
    </Grid>
  );
}
