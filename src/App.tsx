/* eslint-disable no-undef */
import { lazy, Suspense, useState, useEffect } from 'react';

import { css } from '@emotion/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Head from './components/atoms/Head';
import GlobalFooter from './components/organisms/GlobalFooter';
import GlobalHeader from './components/organisms/GlobalHeader';

const TopPage = lazy(async () => await import('./components/organisms/TopPage'));
const IllustrationPage = lazy(async () => await import('./components/organisms/IllustrationPage'));
const About = lazy(async () => await import('./components/organisms/About'));
const UploadImages = lazy(async () => await import('./components/organisms/UploadImages'));
const EditImages = lazy(async () => await import('./components/organisms/EditImages'));
const PageNotFound = lazy(async () => await import('./components/organisms/404'));

const App = () => {
  const routes = [
    <Route
      key="top_page"
      path="/"
      element={
        <>
          <Head
            title="Top | Yui Shimamura Illustration Site"
            description="Yui Shimamuraは、独自の芸術スタイルと創造的なアプローチで知られる才能あるイラストレーターです。彼女の魅力的なイラストレーションを探索し、想像力と美しさに満ちた世界に没入しましょう。Yuiの作品のインスピレーションやアーティストの旅を知ることができます。最新のイラストに関する情報を入手するには、Instagramでフォローしてください。公式のYui Shimamura Illustration Siteを訪れて、彼女のポートフォリオをご覧いただけます。"
            keywords="Yui Shimamura, イラストレーション, イラスト, 作品集"
            ogTitle="Top | Yui Shimamura Illustration Site"
            ogDescription="Yui Shimamuraは、独自の芸術スタイルと創造的なアプローチで知られる才能あるイラストレーターです。彼女の魅力的なイラストレーションを探索し、想像力と美しさに満ちた世界に没入しましょう。Yuiの作品のインスピレーションやアーティストの旅を知ることができます。最新のイラストに関する情報を入手するには、Instagramでフォローしてください。公式のYui Shimamura Illustration Siteを訪れて、彼女のポートフォリオをご覧いただけます。"
            ogType="website"
            ogUrl="https://yuishimamura.com/"
            ogImage="https://yuishimamura.com/public/images/og_image.webp"
            ogImageHeight="200"
            ogImageWidth="200"
            ogSiteName="Yui Shimamura Illustration Site"
          />
          <TopPage />
        </>
      }
    />,
    <Route
      key="illustrations"
      path="/illustrations"
      element={
        <>
          <Head
            title="Illustrations | Yui Shimamura Illustration Site"
            description="Yui Shimamuraは、独自の芸術スタイルと創造的なアプローチで知られる才能あるイラストレーターです。彼女の魅力的なイラストレーションを探索し、想像力と美しさに満ちた世界に没入しましょう。Yuiの作品のインスピレーションやアーティストの旅を知ることができます。最新のイラストに関する情報を入手するには、Instagramでフォローしてください。公式のYui Shimamura Illustration Siteを訪れて、彼女のポートフォリオをご覧いただけます。"
            keywords="Yui Shimamura, イラストレーション, イラスト, 作品集"
            ogTitle="Illustrations | Yui Shimamura Illustration Site"
            ogDescription="Yui Shimamuraは、独自の芸術スタイルと創造的なアプローチで知られる才能あるイラストレーターです。彼女の魅力的なイラストレーションを探索し、想像力と美しさに満ちた世界に没入しましょう。Yuiの作品のインスピレーションやアーティストの旅を知ることができます。最新のイラストに関する情報を入手するには、Instagramでフォローしてください。公式のYui Shimamura Illustration Siteを訪れて、彼女のポートフォリオをご覧いただけます。"
            ogType="website"
            ogUrl="https://yuishimamura.com/illustrations/"
            ogImage="https://yuishimamura.com/public/images/og_image.webp"
            ogImageHeight="200"
            ogImageWidth="200"
            ogSiteName="Yui Shimamura Illustration Site"
          />
          <IllustrationPage />
        </>
      }
    />,
    <Route
      key="about"
      path="/about"
      element={
        <>
          <Head
            title="About | Yui Shimamura Illustration Site"
            description="Yui Shimamuraは、独自の芸術スタイルと創造性で知られる才能あるイラストレーターです。魅力的なイラストレーションがあなたを想像力と美しさに満ちた世界へと誘います。最新のプロジェクトや展覧会に関する情報は、Instagramをフォローしてください。"
            keywords="Yui Shimamura, イラストレーター, 芸術, クリエイティビティ, イラストレーション, 想像力, 美しさ, ポートフォリオ, プロジェクト, 展覧会, Instagram"
            ogTitle="About | Yui Shimamura Illustration Site"
            ogDescription="Yui Shimamuraは、独自の芸術スタイルと創造性で知られる才能あるイラストレーターです。魅力的なイラストレーションがあなたを想像力と美しさに満ちた世界へと誘います。最新のプロジェクトや展覧会に関する情報は、Instagramをフォローしてください。"
            ogType="website"
            ogUrl="https://yuishimamura.com/about/"
            ogImage="https://yuishimamura.com/public/images/og_image.webp"
            ogImageHeight="200"
            ogImageWidth="200"
            ogSiteName="Yui Shimamura Illustration Site"
          />
          <About />
        </>
      }
    />,
    <Route
      key="upload_images"
      path="/upload_images"
      element={
        <>
          <Head
            title="UploadImages | Yui Shimamura Illustration Site"
            description=""
            keywords=""
            ogTitle="UploadImages | Yui Shimamura Illustration Site"
            ogDescription=""
            ogType="website"
            ogUrl="https://yuishimamura.com/upload_images/"
            ogImage="https://yuishimamura.com/public/images/og_image.webp"
            ogImageHeight="200"
            ogImageWidth="200"
            ogSiteName="Yui Shimamura Illustration Site"
          />
          <UploadImages />
        </>
      }
    />,
    <Route
      key="edit_images"
      path="/edit_images"
      element={
        <>
          <Head
            title="EditImages | Yui Shimamura Illustration Site"
            description=""
            keywords=""
            ogTitle="EditImages | Yui Shimamura Illustration Site"
            ogDescription=""
            ogType="website"
            ogUrl="https://yuishimamura.com/edit_images/"
            ogImage="https://yuishimamura.com/public/images/og_image.webp"
            ogImageHeight="200"
            ogImageWidth="200"
            ogSiteName="Yui Shimamura Illustration Site"
          />
          <EditImages />
        </>
      }
    />,
    <Route
      key="not_found"
      path="*"
      element={
        <>
          <Head
            title="404 | NotFound"
            description="Page NotFound"
            keywords="Yui Shimamura, イラストレーション, イラスト, 作品集"
            ogTitle="404 | NotFound"
            ogDescription="Page NotFound"
            ogType="website"
            ogUrl="https://yuishimamura.com/"
            ogImage="https://yuishimamura.com/public/images/og_image.webp"
            ogImageHeight="200"
            ogImageWidth="200"
            ogSiteName="Yui Shimamura Illustration Site"
          />
          <PageNotFound />
        </>
      }
    />,
  ];

  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [locationPathName, setLocationPathName] = useState<string>('');

  const handleWindowHeightResize = () => {
    setWindowHeight(window.innerHeight);
  };
  // const handleWindowWidthResize = () => {
  //   setWindowWidth(window.innerWidth);
  // };

  useEffect(() => {
    const reservedPathName = ['/illustrations', '/upload_images', '/edit_images'];

    window.addEventListener('resize', handleWindowHeightResize);
    // window.addEventListener('resize', handleWindowWidthResize);

    // 予約したパスに対しては、何もしない
    if (reservedPathName.indexOf(window.location.pathname) !== -1) {
      setLocationPathName(window.location.pathname);
    } else {
      setLocationPathName('*');
    }

    return () => {
      window.removeEventListener('resize', handleWindowHeightResize);
      // window.removeEventListener('resize', handleWindowWidthResize);
    };
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter basename="/">
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
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
