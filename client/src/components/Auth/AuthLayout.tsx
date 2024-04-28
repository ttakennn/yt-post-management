import { Outlet } from 'react-router-dom';

export interface IAuthLayoutProps {}

export default function AuthLayout(props: IAuthLayoutProps) {
  return (
    <>
      <Outlet />
    </>
  );
}
