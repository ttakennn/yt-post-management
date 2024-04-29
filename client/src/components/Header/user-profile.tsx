import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/useTypeSelector';
import { removeAuth } from 'src/reducers/authSlice';
import { useToastContext } from '../Toast/toast-provider';
import { useAuth } from 'src/hooks/useAuth';

export interface IUserProfileProps {}

export default function UserProfile(props: IUserProfileProps) {
  const dispatch = useAppDispatch();

  const { logout } = useAuth();

  const { data: auth } = useAppSelector((state) => state.auth);

  const showToast = useToastContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutUSer = async () => {
    await logout();

    showToast('Logout successfully!', 'info');
  };

  if (!auth.userProfile) {
    return (
      <Typography
        align="right"
        component="div"
        sx={{
          flexGrow: 1,
          typography: {
            xs: 'body1',
            sm: 'h4',
            md: 'h4',
            lg: 'h4',
            xl: 'h4',
          },
          fontWeight: { xs: 700 },
          display: {
            xs: 'none',
            sm: 'inline',
          },
        }}
      >
        <Button
          component={Link}
          to="/auth"
          variant="contained"
          color="secondary"
          size="small"
        >
          Sign In
        </Button>
      </Typography>
    );
  }

  return (
    <Typography
      align="right"
      component="div"
      sx={{
        flexGrow: 1,
        typography: {
          xs: 'body1',
          sm: 'h4',
          md: 'h4',
          lg: 'h4',
          xl: 'h4',
        },
        fontWeight: { xs: 700 },
        display: {
          xs: 'none',
          sm: 'inline',
        },
      }}
    >
      <Box sx={{ flexGrow: 0 }}>
        <Typography component="span" sx={{ mr: 1 }}>
          {auth?.userProfile?.name || ''}
        </Typography>
        <Tooltip title="User Profile">
          <IconButton onClick={handleOpenUserMenu}>
            <Avatar
              alt={auth.userProfile.name}
              src={auth.userProfile.picture}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key="Logout" onClick={handleCloseUserMenu}>
          <Typography textAlign="center" onClick={logoutUSer}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Typography>
  );
}
