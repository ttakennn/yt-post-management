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
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Container maxWidth="md">
            <Toolbar disableGutters={true}>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu-icon">
                <Menu />
              </IconButton>

              <Typography variant="h5">Post Management</Typography>

              <CustomPostButton title="Post" />

              <Typography align="right" component="div" sx={{ flexGrow: 1 }}>
                Guest,
                <IconButton size="small" edge="start" color="inherit" aria-label="login-icon">
                  <Face6 />
                </IconButton>
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}
