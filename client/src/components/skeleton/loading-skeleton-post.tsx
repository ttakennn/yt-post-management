import { Card, CardContent, CardHeader, Grid, Skeleton } from '@mui/material';

export default function LoadingSkeletonPost() {
  const SkeletonCard = (
    <Card
      sx={{
        maxWidth: 345,
      }}
    >
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        action={null}
        title={<Skeleton animation="wave" width="80%" height={10} />}
        subheader={<Skeleton animation="wave" width="40%" height={10} />}
      />
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
        <>
          <Skeleton
            sx={{ height: 10 }}
            animation="wave"
            style={{ marginBottom: 6 }}
          />
          <Skeleton sx={{ height: 10 }} animation="wave" width="80%" />
        </>
      </CardContent>
    </Card>
  );

  return (
    <Grid
      sx={{ display: 'flex', alignItems: 'center' }}
      container
      alignItems="stretch"
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 12, sm: 12, md: 12 }}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          {SkeletonCard}
        </Grid>
      ))}
    </Grid>
  );
}
