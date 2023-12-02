import { memo } from 'react';

import { HEAD_TITLE_PROFILE, HEAD_DESCRIPTION_PROFILE, HEAD_KEYWORDS_PROFILE} from '../../../constants';
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
        <h2 className="text-4xl font-bold tracking-tight text-black mb-10">絵を始めたきっかけ</h2>
        <p className="text-base/loose">
          幼い頃から絵を描くことが大好きで、幼少期は自由帳、学生時代はスケッチブックやiPhoneに好きな絵を描いていました。
        </p>
        <p className="text-base/loose">
          2020年、コロナ禍でおうち時間が増えたことをきっかけに思い切ってiPadを手に入れ、ずっと気になっていたデジタルイラストを始めました。
        </p>
        <p className="text-base/loose">現在は依頼を受けてイラストを制作するイラストレーターとして活動しています。</p>
      </div>
    </>
  );
};

export default memo(Profile);
