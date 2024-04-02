import { useState } from 'react';
import CustomToast, { SeverityType } from 'src/components/Toast/custom-toast';

export const useToast = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<SeverityType>('success');

  const showToast = (message: string, severity: SeverityType) => {
    setMessage(message);
    setSeverity(severity);
    setOpenSnackBar(true);
  };

  const handleSnackBarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  const CustomToastTemplate = (
    <CustomToast
      open={openSnackBar}
      message={message}
      severity={severity}
      onClose={handleSnackBarClose}
    />
  );

  return { CustomToastTemplate, showToast };
};
