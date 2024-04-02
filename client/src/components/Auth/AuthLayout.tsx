import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthLoader } from 'src/hooks/useAuthLoader';

export interface IAuthLayoutProps {}

export default function AuthLayout(props: IAuthLayoutProps) {
  const { fetchAuthData } = useAuthLoader();

  useEffect(() => {
    fetchAuthData();
  }, [fetchAuthData]);

  return (
    <>
      <Outlet />
    </>
  );
}
