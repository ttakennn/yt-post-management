import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';

export default function LoadingSkeletonPostDetails() {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 10 }}>
      <Paper sx={{ padding: 2, borderRadius: 1.5 }} elevation={3}>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box sx={{ borderRadius: 2.5, margin: 1.5, flex: 1 }}>
            <Typography variant="h4" component="h2">
              <Skeleton variant="text" />
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              color="textSecondary"
            >
              <Skeleton variant="circular" width={20} />
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              <Skeleton variant="text" width={50} />
            </Typography>
            <Typography variant="h6">
              <Skeleton variant="text" />
            </Typography>
            <Typography variant="body1">
              <Skeleton variant="text" />
            </Typography>
          </Box>
          <Box sx={{ marginLeft: 1 }}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: 250,
                height: 250,
                [theme.breakpoints.down('xs')]: {
                  width: 150,
                  height: 150,
                },
                [theme.breakpoints.down('sm')]: {
                  width: 200,
                  height: 200,
                },
              }}
            />
          </Box>
        </Box>
        <Divider sx={{ mt: 2, mb: 2 }} />

        <Box sx={{ borderRadius: 2.5, margin: 1.5, flex: 1 }}>
          <Typography gutterBottom variant="h6">
            You might also like this posts.
          </Typography>
          <Grid container spacing={2}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{ cursor: 'pointer', padding: 2, mt: 2 }}
                  key={index}
                >
                  <Typography gutterBottom variant="h6">
                    <Skeleton variant="text" />
                  </Typography>
                  <Typography gutterBottom variant="h6" color="textSecondary">
                    <Skeleton variant="circular" width={20} />
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    <Skeleton variant="text" />
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    <Skeleton variant="text" width={50} />
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    <Skeleton variant="text" />
                  </Typography>
                  <Skeleton
                    variant="rectangular"
                    sx={{ width: '100%', height: 150 }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
