import { Container } from '@mui/material';
import PostSearch from 'src/features/Posts/PostSearch';
import Posts from 'src/features/Posts/Posts';
import { useAppSelector } from 'src/hooks/useTypeSelector';

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const { currentPage, totalPage } = useAppSelector((state) => state.posts);

  return (
    <Container maxWidth="md" sx={{ pt: 10, pb: 3 }}>
      <Posts />
      <PostSearch currentPage={currentPage} totalPage={totalPage} />
    </Container>
  );
}
