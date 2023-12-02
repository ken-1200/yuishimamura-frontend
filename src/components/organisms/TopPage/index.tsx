import { memo } from 'react';

import { HEAD_TITLE_TOP, HEAD_DESCRIPTION_TOP, HEAD_KEYWORDS_TOP } from '../../../constants';
import Head from '../../atoms/Head';

const TopPage = () => {
  return (
    <>
      <Head
        title={HEAD_TITLE_TOP}
        description={HEAD_DESCRIPTION_TOP}
        keywords={HEAD_KEYWORDS_TOP}
        ogTitle={HEAD_TITLE_TOP}
        ogDescription={HEAD_DESCRIPTION_TOP}
      />
      <div className="absolute bottom-0 right-0 bg-white py-24 sm:py-32">
        <img className="w-2/5 sm:w-1/4 ml-auto" src="/images/og_image.webp" alt="logo" />
      </div>
    </>
  );
};

export default memo(TopPage);
