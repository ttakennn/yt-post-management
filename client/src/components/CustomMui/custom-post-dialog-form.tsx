import { yupResolver } from '@hookform/resolvers/yup';
import { Edit, ErrorOutlineOutlined, PostAdd } from '@mui/icons-material';
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
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/hooks/useTypeSelector';
import { Post, PostRequest } from 'src/interfaces/post.interface';
import { createPosts, updatePost } from 'src/reducers/postSlice';
import * as yup from 'yup';
import CustomMuiFileInput from './custom-mui-file-input';
import CustomTextField from './custom-text-field';
import { base64ToFile } from 'src/Utils/file';
import CustomMuiChipsInput from './custom-mui-chips-input';

export interface CustomPostDialogFormProps {
  isOpen: boolean;
  children?: React.ReactNode;
  onHandleSnackBar?: (status: PostRequest) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postEdit?: Post;
}

export default function CustomPostDialogForm(props: CustomPostDialogFormProps) {
  const { isOpen, setOpen, onHandleSnackBar, postEdit } = props;
  const [fileValue, setFileValue] = useState({
    base64String: '',
    fileName: '',
  });

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.posts);

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
    tags: yup.array().required('Please enter tags'),
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
      tags: [],
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
    newPost = {
      ...newPost,
      selectedFile: fileValue.base64String,
      fileName: fileValue.fileName,
    };

    let result = null;
    if (postEdit?._id) {
      result = await dispatch(
        updatePost({ id: postEdit._id, updatePost: newPost }),
      );
    } else {
      result = (await dispatch(createPosts(newPost))) as any;
    }

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
        setFileValue({ base64String: base64String, fileName: file.name });
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (postEdit?._id) {
      console.log('Post edit: ', postEdit);
      reset({
        _id: postEdit._id,
        creator: postEdit.creator,
        title: postEdit.title,
        message: postEdit.message,
        tags: postEdit.tags,
        selectedFile: base64ToFile(
          postEdit.selectedFile as string,
          postEdit?.fileName ?? '',
        ),
      });

      setFileValue({
        base64String: postEdit.selectedFile as string,
        fileName: postEdit?.fileName ?? '',
      });
    }
  }, [postEdit]);

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
            <Grid item>{postEdit ? 'Updating' : 'Creating'} a Post</Grid>
            <Grid item>
              <Box sx={{ pt: 1 }}>
                {postEdit && <Edit color="secondary" />}
                {!postEdit && <PostAdd color="primary" />}
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
            sx={{ mt: 1, mb: 1.5 }}
          />
          <CustomTextField
            name="title"
            label="Title"
            control={control}
            size="small"
            sx={{ mb: 1.5 }}
          />
          <CustomTextField
            name="message"
            label="Message"
            control={control}
            size="small"
            sx={{ mb: 1.5 }}
          />
          <CustomMuiChipsInput name="tags" control={control} sx={{ mb: 1.5 }} />
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
            {postEdit ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
