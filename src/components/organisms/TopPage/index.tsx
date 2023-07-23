import { memo } from 'react';

import Head from '../../atoms/Head';

const TopPage = () => {
  return (
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
      <div className="absolute bottom-0 right-0 bg-white py-24 sm:py-32">
        <img className="w-2/5 sm:w-1/4 ml-auto" src="/images/og_image.webp" alt="logo" />
      </div>
    </>
  );
};

export default memo(TopPage);
