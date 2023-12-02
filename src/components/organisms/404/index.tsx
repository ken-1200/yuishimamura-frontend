import { memo } from 'react';

import { Link } from 'react-router-dom';

import { HEAD_TITLE_NOT_FOUND, HEAD_DESCRIPTION_NOT_FOUND, HEAD_KEYWORDS_NOT_FOUND} from '../../../constants';
import Head from '../../atoms/Head';

const PageNotFound = () => {
  return (
    <>
      <Head
        title={HEAD_TITLE_NOT_FOUND}
        description={HEAD_DESCRIPTION_NOT_FOUND}
        keywords={HEAD_KEYWORDS_NOT_FOUND}
        ogTitle={HEAD_TITLE_NOT_FOUND}
        ogDescription={HEAD_DESCRIPTION_NOT_FOUND}
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
