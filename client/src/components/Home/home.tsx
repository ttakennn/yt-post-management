import { Container } from '@mui/material';
import { useEffect } from 'react';
import Posts from 'src/features/Posts/Posts';
import { useAppDispatch } from 'src/hooks/useTypeSelector';
import { getPosts } from 'src/reducers/postSlice';

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <Container maxWidth="md" sx={{ pt: 10, pb: 3 }}>
      <Posts />
    </Container>
  );
}
