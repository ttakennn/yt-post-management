import { Outlet } from 'react-router-dom';
import MainLayout from './components/MainLayout/main-layout';
import { useAuthLoader } from './hooks/useAuthLoader';
import { useEffect } from 'react';

function App() {
  const { fetchAuthData } = useAuthLoader();

  useEffect(() => {
    fetchAuthData();
  }, []);

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default App;
