import { memo } from 'react';

import { Link } from 'react-router-dom';

import Head from '../../atoms/Head';

const PageNotFound = () => {
  return (
    <>
      <Head
        title="404 | NotFound"
        description="Page NotFound"
        keywords="ゆい, しまむらゆい, しまむら, Yui Shimamura, イラストレーター, イラスト, NotFound, 404, ページが見つかりません"
        ogTitle="404 | NotFound"
        ogDescription="Page NotFound"
        ogType="website"
        ogUrl="https://yuishimamura.com/"
        ogImage="https://yuishimamura.com/public/images/og_image.webp"
        ogImageHeight="200"
        ogImageWidth="200"
        ogSiteName="Yui Shimamura Illustration Site"
      />
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-900">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(PageNotFound);
