import { memo } from 'react';

import Head from '../../atoms/Head';

const About = () => {
  return (
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
      <h1>404 Not Found</h1>
      <p>We&rsquo;re sorry, but the page you requested could not be found.</p>
    </>
  );
};

export default memo(About);
