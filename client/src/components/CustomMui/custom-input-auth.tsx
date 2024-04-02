import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';

export interface ICustomInputAuthProps {
  name: string;
  label: string;
  type?: string;
  half?: boolean;
  autoFocus?: boolean;
  handleChange?: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  handleShowPassword?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function CustomInputAuth(props: ICustomInputAuthProps) {
  const {
    name,
    label,
    type,
    half,
    autoFocus,
    handleChange,
    handleShowPassword,
  } = props;
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        variant="outlined"
        onChange={handleChange}
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === 'password' || name === 'confirmaPassword'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Grid>
  );
}
