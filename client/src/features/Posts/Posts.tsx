import { Grid } from '@mui/material';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from 'src/hooks/useTypeSelector';
import PostDetails from './PostDetails';

export interface IPostProps {}

export default function Posts(props: IPostProps) {
  const { data: postList } = useAppSelector((state) => state.posts);

  console.log('PostList: ', postList);

  return (
    <Grid
      sx={{ display: 'flex', alignItems: 'center' }}
      container
      alignItems="stretch"
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 12, sm: 12, md: 12 }}
    >
      {postList.map((post) => (
        <Grid item key={post._id} xs={12} sm={6} md={4}>
          <PostDetails post={post} />
        </Grid>
      ))}
    </Grid>
  );
}
