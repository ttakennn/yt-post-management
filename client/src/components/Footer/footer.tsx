import { AppBar, Container, Toolbar, Typography } from '@mui/material';

export default function Footer() {
  return (
    <AppBar position="static" color="primary" style={{ bottom: 0, zIndex: 1000 }}>
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            &copy; 2024 Post Management Application
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
