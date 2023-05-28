import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-col gap-4 px-4 max-w-screen-md">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
