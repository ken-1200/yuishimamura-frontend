import { lazy, Suspense, useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import AdminHeader from './components/organisms/AdminHeader';
import GlobalFooter from './components/organisms/GlobalFooter';
import GlobalHeader from './components/organisms/GlobalHeader';

const TopPage = lazy(async () => await import('./components/organisms/TopPage'));
const Gallery = lazy(async () => await import('./components/organisms/Gallery'));
const Profile = lazy(async () => await import('./components/organisms/Profile'));
const AdminPage = lazy(async () => await import('./components/organisms/AdminPage'));
const UploadImages = lazy(async () => await import('./components/organisms/UploadImages'));
const EditImages = lazy(async () => await import('./components/organisms/EditImages'));
const PageNotFound = lazy(async () => await import('./components/organisms/404'));

const Root = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const routes = [
    <Route key="top_page" path="/" element={<TopPage />} />,
    <Route key="gallery" path="/gallery" element={<Gallery />} />,
    <Route key="profile" path="/profile" element={<Profile />} />,
    <Route key="admin" path="/admin" element={<AdminPage />} />,
    <Route key="upload_images" path="/admin/upload_images" element={<UploadImages />} />,
    <Route key="edit_images" path="/admin/edit_images" element={<EditImages />} />,
    <Route key="not_found" path="*" element={<PageNotFound />} />,
  ];

  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [locationPathName, setLocationPathName] = useState<string>('');

  const handleWindowHeightResize = () => {
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    const reservedPathName = ['/gallery', '/admin', '/admin/upload_images', '/admin/edit_images'];

    window.addEventListener('resize', handleWindowHeightResize);

    // 予約したパスに対しては、何もしない
    if (reservedPathName.indexOf(currentPath) !== -1) {
      setLocationPathName(currentPath);
    } else {
      setLocationPathName('*');
    }

    return () => {
      window.removeEventListener('resize', handleWindowHeightResize);
    };
  }, [currentPath]);

  return (
    <div
      className="relative"
      css={css`
        height: ${locationPathName === '*' ? windowHeight + 'px' : '100%'};
      `}
    >
      {['/admin', '/admin/upload_images', '/admin/edit_images'].includes(locationPathName) ? (
        <AdminHeader />
      ) : (
        <GlobalHeader />
      )}
      <section className="py-6 px-8 sm:p-6 md:py-10 md:px-10">
        <Suspense fallback={<>Loading...</>}>
          <Routes>{routes}</Routes>
        </Suspense>
      </section>
      <GlobalFooter style={locationPathName === '*' ? 'absolute bottom-0 left-0' : ''} />
    </div>
  );
};

const App = () => (
  <HelmetProvider>
    <BrowserRouter basename="/">
      <Root />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
