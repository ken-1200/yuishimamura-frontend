import { memo } from 'react';

import Head from '../../atoms/Head';

const TopPage = () => {
  return (
    <>
      <Head
        title="Top | Yui Shimamura Illustration Site"
        description="Yui Shimamura Illustration Siteのトップページです。最新情報は、Instagramをチェック&フォローしてください。"
        keywords="ゆい, しまむらゆい, しまむら, Yui Shimamura, イラストレーター, イラスト, オーダーイラスト, 作品集"
        ogTitle="Top | Yui Shimamura Illustration Site"
        ogDescription="Yui Shimamura Illustration Siteのトップページです。最新情報は、Instagramをチェック&フォローしてください。"
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
