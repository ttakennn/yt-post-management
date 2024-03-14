import { ErrorOutlineOutlined, PostAdd } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  LinearProgress,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CustomTextField from './custom-text-field';
import { Post, PostRequest } from 'src/interfaces/post.interface';
import CustomMuiFileInput from './custom-mui-file-input';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/useTypeSelector';
import { createPosts } from 'src/reducers/postSlice';
import { PayloadAction } from '@reduxjs/toolkit';

export interface ICustomPostDialogProps {
  isOpen: boolean;
  children?: React.ReactNode;
  onHandleSnackBar?: (status: PostRequest) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type CreatePostsAction = PayloadAction<
  Post,
  string,
  { arg: Post; requestId: string; requestStatus: 'fulfilled' }
>;

export default function CustomPostDialog(props: ICustomPostDialogProps) {
  const { isOpen, setOpen, onHandleSnackBar } = props;
  const [fileStringValue, setFileStringValue] = useState('');

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.posts);

  console.log('error: ', error);

  const schema = yup.object().shape({
    creator: yup
      .string()
      .required('Please enter creator')
      .min(5, 'Creator is too short'),
    title: yup.string().required('Please enter title'),
    message: yup
      .string()
      .required('Please enter message')
      .min(5, 'Message is too short'),
    tags: yup.string().required('Please enter tags'),
    selectedFile: yup
      .mixed()
      .test('fileSize', 'File is too large', (file) => {
        if (!file) return true;

        return (file as File).size <= 1024 * 1024 * 10; // 10MB limit
      })
      .test('fileType', 'Unsupported file type', (file) => {
        if (!file) return true;

        return ['image/jpeg', 'image/png'].includes((file as File)?.type);
      })
      .required('Please update a file') as yup.Schema<File | string | null>,
  });

  const { reset, control, handleSubmit } = useForm<Post>({
    defaultValues: {
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: null,
    },
    resolver: yupResolver(schema),
  });

  const handleClose = (event: any, reason?: string) => {
    console.log('reason: ', reason);
    if (reason && ['backdropClick', 'escapeKeyDown'].includes(reason)) {
      return;
    }

    setOpen(false);
  };

  const onSubmit = async (newPost: Post) => {
    newPost = { ...newPost, selectedFile: fileStringValue };
    console.log('newPost: ', newPost);

    const result = (await dispatch(createPosts(newPost))) as any;
    const hasError = result?.error?.message ?? '';

    if (!hasError) {
      reset();
      setOpen(false);

      if (onHandleSnackBar) {
        onHandleSnackBar({
          status: 'SUCCESS',
          message: `'${newPost.creator}' post has been created successfully!`,
        });
      }
    }
  };

  const handleFileInputChange = (file: any) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        setFileStringValue(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
        }}
      >
        {loading && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}

        <DialogTitle>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>Creating a Post</Grid>
            <Grid item>
              <Box sx={{ pt: 1 }}>
                <PostAdd color="primary" />
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {!!error && (
            <DialogContentText
              sx={{
                color: 'red',
                display: 'flex',
                direction: 'row',
                alignContent: 'center',
              }}
            >
              <ErrorOutlineOutlined color="error" sx={{ mr: 1 }} /> {error}
            </DialogContentText>
          )}

          <CustomTextField
            name="creator"
            label="Creator"
            control={control}
            size="small"
            margin="normal"
          />
          <CustomTextField
            name="title"
            label="Title"
            control={control}
            size="small"
            margin="normal"
          />
          <CustomTextField
            name="message"
            label="Message"
            control={control}
            size="small"
            margin="normal"
          />
          <CustomTextField
            name="tags"
            label="Tags"
            control={control}
            size="small"
            margin="normal"
          />
          <CustomMuiFileInput
            name="selectedFile"
            control={control}
            onChange={handleFileInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={(evt) => handleClose(evt)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
