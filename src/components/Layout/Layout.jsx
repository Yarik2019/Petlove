import { Suspense } from 'react';
import Header from '../Header/Header.jsx';
import { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader.jsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const isLoader = false;
  return (
    <main>
      <Header />
      {isLoader ? (
        <Loader />
      ) : (
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      )}
      <Toaster />
    </main>
  );
};
export default Layout;
