import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { pink } from '@mui/material/colors';
import CustomInputAuth from '../CustomMui/custom-input-auth';
import { useEffect, useState } from 'react';
import { Auth as AuthProps, AuthForm, EmailProfile } from 'src/interfaces';
import { useAppDispatch, useAppSelector } from 'src/hooks/useTypeSelector';
import { saveAuth, signin, signup } from 'src/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useToastContext } from '../Toast/toast-provider';

const initState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
} as AuthForm;

export default function Auth() {
  const [firstRender, setFirstRender] = useState(true);
  const [isSignup, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState(initState);

  const showToast = useToastContext();

  const dispatch = useAppDispatch();
  const { data: auth, loading } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isSignup) {
      await dispatch(signup({ formData }));
    } else {
      await dispatch(signin({ formData }));
    }
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleShowRepeatPassword = () =>
    setShowRepeatPassword((prevShowRepeatPassword) => !prevShowRepeatPassword);

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const onGoogleLogin = async (response: any) => {
    if (response.credential) {
      const decoded = jwtDecode(response.credential) as EmailProfile;

      console.log(decoded);

      const payload = {
        access_token: response.credential,
        userProfile: {
          _id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
        },
      } as AuthProps;

      dispatch(saveAuth(payload));
      showToast('Login successfully!', 'success');
    }
  };

  useEffect(() => {
    if (auth.access_token && auth.userProfile) {
      navigate('/');
      showToast('Login successfully!', 'success');
    }
  }, [auth.access_token, auth.userProfile, navigate]);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  if (firstRender) {
    return <CircularProgress />;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 2,
        margin: 'auto',
        marginTop: 4,
        marginBottom: 4,
      }}
    >
      <Avatar sx={{ mr: 1, mb: 1, bgcolor: pink[500] }}>
        <LockOutlined />
      </Avatar>
      <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
      <form
        style={{ width: '100%', marginTop: '24px' }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <Grid container spacing={2}>
          {isSignup && (
            <>
              <CustomInputAuth
                name="firstName"
                label="First Name"
                handleChange={handleChange}
                autoFocus={true}
                half={true}
              />

              <CustomInputAuth
                name="lastName"
                label="Last Name"
                handleChange={handleChange}
                half={true}
              />
            </>
          )}

          <CustomInputAuth
            name="email"
            label="Email"
            handleChange={handleChange}
            autoFocus={true}
            type="email"
          />

          <CustomInputAuth
            name="password"
            label="Password"
            handleChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            handleShowPassword={handleShowPassword}
          />

          {isSignup && (
            <CustomInputAuth
              name="confirmPassword"
              label="Repeat Password"
              handleChange={handleChange}
              type={showRepeatPassword ? 'text' : 'password'}
              handleShowPassword={handleShowRepeatPassword}
            />
          )}
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 2 }}
        >
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Button>

        <GoogleLogin
          onSuccess={onGoogleLogin}
          onError={() => console.log('Login failed')}
        />

        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Button onClick={switchMode}>
              {isSignup
                ? 'You already have an account! Sign In'
                : 'Dont have an account yet? Sign Up'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
