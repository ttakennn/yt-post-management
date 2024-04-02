import { Alert, AlertTitle, Snackbar } from '@mui/material';

export type SeverityType = 'error' | 'info' | 'success' | 'warning';

export interface ICustomToastProps {
  open: boolean;
  message: string;
  severity: SeverityType;
  onClose: () => void;
}

const CustomToast = (props: ICustomToastProps) => {
  const { open, message, severity, onClose } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        security={severity}
        variant="standard"
        sx={{ width: '100%' }}
      >
        <AlertTitle>{severity}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomToast;
