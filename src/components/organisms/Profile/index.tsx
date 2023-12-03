import { memo } from 'react';

import { HEAD_TITLE_PROFILE, HEAD_DESCRIPTION_PROFILE, HEAD_KEYWORDS_PROFILE } from '../../../constants';
import Head from '../../atoms/Head';

const Profile = () => {
  return (
    <>
      <Head
        title={HEAD_TITLE_PROFILE}
        description={HEAD_DESCRIPTION_PROFILE}
        keywords={HEAD_KEYWORDS_PROFILE}
        ogTitle={HEAD_TITLE_PROFILE}
        ogDescription={HEAD_DESCRIPTION_PROFILE}
      />
      <div className="mt-20">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-32 mx-auto flex items-center justify-between after:pb-2 after:border-b-2 after:border-b-cyan-600 after:content-['絵を始めたきっかけ']" />
        <p className="text-2xl leading-10">
          幼い頃から絵を描くことが大好きで、幼少期は自由帳、学生時代はスケッチブックやiPhoneに好きな絵を描いていました。
        </p>
        <p className="text-2xl leading-10">
          2020年、コロナ禍でおうち時間が増えたことをきっかけに思い切ってiPadを手に入れ、ずっと気になっていたデジタルイラストを始めました。
        </p>
        <p className="text-2xl leading-10 flex items-center justify-start after:animate-bounce after:content-['🦖']">
          現在は依頼を受けてイラストを制作するイラストレーターとして活動しています。
        </p>
      </div>
    </>
  );
};

export default memo(Profile);
