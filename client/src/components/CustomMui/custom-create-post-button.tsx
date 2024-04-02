import { Add } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Snackbar } from '@mui/material';
import { useState } from 'react';
import CustomPostDialogForm from './custom-post-dialog-form';
import { PostRequest } from 'src/interfaces';
import { useToastContext } from '../Toast/toast-provider';

export interface ICustomPostButtonProps {
  title: string;
  childrent?: React.ReactNode;
}

export default function CustomPostButton(props: ICustomPostButtonProps) {
  const { title } = props;

  const [openDialog, setOpenDialog] = useState(false);
  const showToast = useToastContext();

  const onHandleSnackBarChange = (postRequest: PostRequest) => {
    if (postRequest.status === 'SUCCESS') {
      showToast(postRequest.message, 'success');
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpenDialog(true)}
        variant="contained"
        color="secondary"
        startIcon={<Add />}
        sx={{ ml: 1 }}
      >
        {title}
      </Button>

      <CustomPostDialogForm
        isOpen={openDialog}
        setOpen={setOpenDialog}
        onHandleSnackBar={onHandleSnackBarChange}
      />
    </>
  );
}
