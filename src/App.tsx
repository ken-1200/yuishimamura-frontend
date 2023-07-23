/* eslint-disable no-undef */
import { lazy, Suspense, useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import GlobalFooter from './components/organisms/GlobalFooter';
import GlobalHeader from './components/organisms/GlobalHeader';

const TopPage = lazy(async () => await import('./components/organisms/TopPage'));
const IllustrationPage = lazy(async () => await import('./components/organisms/IllustrationPage'));
const About = lazy(async () => await import('./components/organisms/About'));
const UploadImages = lazy(async () => await import('./components/organisms/UploadImages'));
const EditImages = lazy(async () => await import('./components/organisms/EditImages'));
const PageNotFound = lazy(async () => await import('./components/organisms/404'));

const Root = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const routes = [
    <Route key="top_page" path="/" element={<TopPage />} />,
    <Route key="illustrations" path="/illustrations" element={<IllustrationPage />} />,
    <Route key="about" path="/about" element={<About />} />,
    <Route key="upload_images" path="/upload_images" element={<UploadImages />} />,
    <Route key="edit_images" path="/edit_images" element={<EditImages />} />,
    <Route key="not_found" path="*" element={<PageNotFound />} />,
  ];

  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const [locationPathName, setLocationPathName] = useState<string>('');

  const handleWindowHeightResize = () => {
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    const reservedPathName = ['/illustrations', '/upload_images', '/edit_images'];

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
      <GlobalHeader />
      <section className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
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
