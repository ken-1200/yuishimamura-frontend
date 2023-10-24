/* eslint-disable no-undef */
import { useState, memo, useEffect } from 'react';

import Head from '../../atoms/Head';
import ImagePreview from '../../atoms/ImagePreview';

const Gallery = () => {
  const [illustrations, setIllustrations] = useState<Array<{ id: number; idx: number; src: string; alt: string }>>([]);

  useEffect(() => {
    fetch('/images.json')
      .then((response) => response.json())
      .then((json) => {
        setIllustrations(json.images);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Head
        title="Gallery | Yui Shimamura Illustration Site"
        description="Yui Shimamura Illustration Siteのイラストレーションページです。最新情報は、Instagramをチェック&フォローしてください。"
        keywords="ゆい, しまむらゆい, しまむら, Yui Shimamura, イラストレーター, イラスト, オーダーイラスト, 作品集, イラストレーション, イラストレーションページ"
        ogTitle="Gallery | Yui Shimamura Illustration Site"
        ogDescription="Yui Shimamura Illustration Siteのイラストレーションページです。最新情報は、Instagramをチェック&フォローしてください。"
        ogType="website"
        ogUrl="https://yuishimamura.com/gallery/"
        ogImage="https://yuishimamura.com/public/images/og_image.webp"
        ogImageHeight="200"
        ogImageWidth="200"
        ogSiteName="Yui Shimamura Illustration Site"
      />
      <div className="mt-20">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-24">ギャラリー</h2> */}
        <h2 className="text-4xl font-bold tracking-tight text-black mb-10">ギャラリー</h2>
        <div className="grid grid-rows-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {illustrations.map((illustration) => (
            <ImagePreview key={illustration.id} src={illustration.src} alt={illustration.alt} />
          ))}
        </div>
        <p className="text-lg text-gray-500 text-right mt-6">※ イラストの無断転用禁止</p>
      </div>
    </>
  );
};

export default memo(Gallery);
