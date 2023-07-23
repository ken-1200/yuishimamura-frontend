/* eslint-disable no-undef */
import { useState, memo, useEffect } from 'react';

import Head from '../../atoms/Head';
import ImagePreview from '../../atoms/ImagePreview';

const IllustrationPage = () => {
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
      <div className="mt-20">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Illustrations</h2>
        <p className="my-6 mb-36 text-xl text-gray-500">
          Yui Shimamura’s portfolio showcasing her latest illustrations.
        </p>
        <div className="grid grid-rows-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {illustrations.map((illustration) => (
            <ImagePreview key={illustration.id} src={illustration.src} alt={illustration.alt} />
          ))}
        </div>
      </div>
    </>
  );
};

export default memo(IllustrationPage);
