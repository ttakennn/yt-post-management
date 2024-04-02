import { ExitToApp, LockOpenRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/useTypeSelector';
import { removeAuth } from 'src/reducers/authSlice';

export interface ICustomDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CustomDrawer({ open, onClose }: ICustomDrawerProps) {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.data);

  const logoutUser = () => {
    dispatch(removeAuth());
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} onClick={onClose}>
      {auth?.userProfile?._id && (
        <>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              alt={auth.userProfile.name}
              src={auth.userProfile.picture}
              sx={{ margin: 'auto', mt: 2 }}
            />
            <Typography variant="h6">{auth.userProfile.name}</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {auth.userProfile.email}
            </Typography>
          </Box>
          <Divider />
          <List
            sx={{
              position: 'absolute',
              bottom: theme.spacing(2),
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <ListItem onClick={logoutUser}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </>
      )}

      {!auth?.userProfile?._id && (
        <List>
          <ListItem component={Link} to="/auth">
            <ListItemIcon>
              <LockOpenRounded />
            </ListItemIcon>
            <ListItemText primary="Sign In" />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <Drawer open={open} onClose={onClose}>
      {DrawerList}
    </Drawer>
  );
}
