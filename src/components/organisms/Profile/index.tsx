import { memo } from 'react';

import Head from '../../atoms/Head';

const Profile = () => {
  return (
    <>
      <Head
        title="Profile | Yui Shimamura Illustration Site"
        description="幼い頃から絵を描くことが大好きで、現在も様々な種類のオリジナルなイラストを描いています。最新情報は、Instagramをチェック&フォローしてください。"
        keywords="ゆい, しまむらゆい, しまむら, Yui Shimamura, イラスト, イラストレーター"
        ogTitle="Profile | Yui Shimamura Illustration Site"
        ogDescription="幼い頃から絵を描くことが大好きで、現在も様々な種類のオリジナルなイラストを描いています。最新情報は、Instagramをチェック&フォローしてください。"
        ogType="website"
        ogUrl="https://yuishimamura.com/profile/"
        ogImage="https://yuishimamura.com/public/images/og_image.webp"
        ogImageHeight="200"
        ogImageWidth="200"
        ogSiteName="Yui Shimamura Illustration Site"
      />
      <div className="mt-20">
        <h2 className="text-4xl font-bold tracking-tight text-black mb-10">絵を始めたきっかけ</h2>
        <p className="text-base/loose">幼い頃から絵を描くことが大好きで、幼少期は自由帳、学生時代はスケッチブックやiPhoneに好きな絵を描いていました。</p>
        <p className="text-base/loose">2020年、コロナ禍でおうち時間が増えたことをきっかけに思い切ってiPadを手に入れ、ずっと気になっていたデジタルイラストを始めました。</p>
        <p className="text-base/loose">現在は依頼を受けてイラストを制作するイラストレーターとして活動しています。</p>
      </div>
    </>
  );
};

export default memo(Profile);
