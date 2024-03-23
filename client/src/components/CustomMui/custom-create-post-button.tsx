import { Add } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Snackbar } from '@mui/material';
import { useState } from 'react';
import CustomPostDialogForm from './custom-post-dialog-form';
import { PostRequest } from 'src/interfaces';

export interface ICustomPostButtonProps {
  title: string;
  childrent?: React.ReactNode;
}

export default function CustomPostButton(props: ICustomPostButtonProps) {
  const { title } = props;

  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState('');

  const onHandleSnackBarChange = (postRequest: PostRequest) => {
    if (postRequest.status === 'SUCCESS') {
      setOpenSnackBar(true);
      setMessageSnackBar(postRequest.message);
    }
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

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={openSnackBar}
        autoHideDuration={3000}
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
    </>
  );
}
