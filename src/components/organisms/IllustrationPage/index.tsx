/* eslint-disable no-undef */
import { useState, memo, useEffect } from 'react';

import ImagePreview from '../../atoms/ImagePreview';

const IllustrationPage = () => {
  const [illustrations, setIllustrations] = useState<{ id: string; idx: string; src: string; alt: string }[]>([]);

  useEffect(() => {
    fetch('/src/data/images.json')
      .then((response) => response.json())
      .then((json) => {
        setIllustrations(json.images);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Illustrations</h2>
      <p className="my-6 mb-36 text-xl text-gray-500">Yui Shimamura’s portfolio showcasing her latest illustrations.</p>
      <div className="grid grid-rows-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {illustrations.map((illustration) => (
          <ImagePreview key={illustration.id} src={illustration.src} alt={illustration.alt} />
        ))}
      </div>
    </div>
  );
};

export default memo(IllustrationPage);
