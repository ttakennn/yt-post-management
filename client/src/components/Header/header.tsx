import { Add, Face6, Menu } from '@mui/icons-material';
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import * as React from 'react';
import { Props } from 'src/interfaces';
import CustomPostButton from '../CustomMui/custom-create-post-button';
import UserProfile from './user-profile';
import { useAppSelector } from 'src/hooks/useTypeSelector';
import { useDrawer } from 'src/hooks/useDrawer';
import { Link } from 'react-router-dom';

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header(props: Props) {
  const auth = useAppSelector((state) => state.auth.data);
  const { CustomDrawerTemplate, showDrawer } = useDrawer();
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Container maxWidth="md">
            <Toolbar disableGutters={true}>
              <IconButton
                onClick={() => showDrawer()}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu-icon"
                sx={{
                  display: {
                    xs: 'inline',
                    sm: 'none',
                  },
                }}
              >
                <Menu />
              </IconButton>

              <Typography
                component={Link}
                to="/"
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mr: 2,
                  fontSize: {
                    xs: '1.2rem',
                    sm: '1.5rem',
                  },
                  color: 'white',
                }}
              >
                Post Management
              </Typography>

              {auth?.userProfile && <CustomPostButton title="Post" />}

              <UserProfile />
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      {CustomDrawerTemplate}
    </React.Fragment>
  );
}
