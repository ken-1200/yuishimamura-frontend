import { useState, memo, useEffect } from 'react';

import { HEAD_TITLE_GALLERY, HEAD_DESCRIPTION_GALLERY, HEAD_KEYWORDS_GALLERY } from '../../../constants';
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
        title={HEAD_TITLE_GALLERY}
        description={HEAD_DESCRIPTION_GALLERY}
        keywords={HEAD_KEYWORDS_GALLERY}
        ogTitle={HEAD_TITLE_GALLERY}
        ogDescription={HEAD_DESCRIPTION_GALLERY}
      />
      <div className="mt-20">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-32 mx-auto flex items-center justify-between after:pb-2 after:border-b-2 after:border-b-cyan-600 after:content-['最新のイラスト']" />
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
