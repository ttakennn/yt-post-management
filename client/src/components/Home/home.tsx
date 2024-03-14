import { Container } from '@mui/material';
import Post from 'src/features/Posts/Post';

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  return (
    <Container maxWidth="md" sx={{ pt: 10 }}>
      <Post />
    </Container>
  );
}
