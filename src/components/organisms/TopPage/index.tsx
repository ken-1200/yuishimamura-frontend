import { memo } from 'react';

const TopPage = () => {
  return (
    <div className="absolute bottom-0 right-0 bg-white py-24 sm:py-32">
      <img className="w-2/5 sm:w-1/4 ml-auto" src="/images/og_image.webp" alt="logo" />
    </div>
  );
};

export default memo(TopPage);
