/* eslint-disable no-return-await */
import { lazy, Suspense } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Head from './components/atoms/Head';
import GlobalFooter from './components/organisms/GlobalFooter';
import GlobalHeader from './components/organisms/GlobalHeader';

const IllustrationPage = lazy(async () => await import('./components/organisms/IllustrationPage'));
const About = lazy(async () => await import('./components/organisms/About'));
const Shops = lazy(async () => await import('./components/organisms/Shops'));
const PageNotFound = lazy(async () => await import('./components/organisms/404'));

function App() {
  const routes = [
    <Route
      key="illustration"
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
    key="shops"
    path="/shops"
    element={
      <>
        <Head
          title="Shops | Yui Shimamura Illustration Site"
          description="Yui Shimamura の公式ショップページです。ここでは、魅力的なイラストを使用したオリジナルのLINEスタンプやグッズを購入することができます。Yui Shimamura の魅力あふれるイラストを身近に感じるためのオンラインストアです。是非、ご覧ください。"
          keywords="Yui Shimamura, イラストレーター, ショップ, LINEスタンプ, 購入, グッズ, イラスト, オンラインストア"
          ogTitle="Shops | Yui Shimamura Illustration Site"
          ogDescription="Yui Shimamura の公式ショップページです。ここでは、魅力的なイラストを使用したオリジナルのLINEスタンプやグッズを購入することができます。Yui Shimamura の魅力あふれるイラストを身近に感じるためのオンラインストアです。是非、ご覧ください。"
          ogType="website"
          ogUrl="https://yuishimamura.com/shops/"
          ogImage="https://yuishimamura.com/public/images/og_image.webp"
          ogImageHeight="200"
          ogImageWidth="200"
          ogSiteName="Yui Shimamura Illustration Site"
        />
        <Shops />
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

  return (
    <BrowserRouter basename="/">
      <GlobalHeader />
      <section className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
        <Suspense fallback={<>Loading...</>}>
          <Routes>{routes}</Routes>
        </Suspense>
      </section>
      <GlobalFooter />
    </BrowserRouter>
  );
}

export default App;
