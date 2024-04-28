import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import MainLayout from './components/MainLayout/main-layout';
import { useEffect } from 'react';
import { usePostLoader } from './hooks/usePostLoader';

function App() {
  const { fetchPostData } = usePostLoader();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isPostSearch = location.pathname === '/posts/search';

    if (isPostSearch) {
      const searchDecoded = decodeURIComponent(location.search);
      const searchParams = new URLSearchParams(searchDecoded);

      const title = searchParams.get('title');
      const tags = searchParams.get('tags');
      const page = searchParams.get('page');

      const payloadSeach = {
        page: Number(page),
        title: title ?? '',
        tags: tags?.split(',') || [],
      };

      const fetchData = async () => {
        await fetchPostData(payloadSeach);
      };

      fetchData();
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/posts/search?page=1&title=&tags=', { replace: true });
    }
  }, [navigate, location]);

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default App;
