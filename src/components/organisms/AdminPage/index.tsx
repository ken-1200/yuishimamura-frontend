import { memo } from 'react';

import { Link } from 'react-router-dom';

import { HEAD_TITLE_ADMIN, HEAD_DESCRIPTION_ADMIN, HEAD_KEYWORDS_ADMIN } from '../../../constants';
import Head from '../../atoms/Head';

const AdminPage = () => {
  return (
    <>
      <Head
        title={HEAD_TITLE_ADMIN}
        description={HEAD_DESCRIPTION_ADMIN}
        keywords={HEAD_KEYWORDS_ADMIN}
        ogTitle={HEAD_TITLE_ADMIN}
        ogDescription={HEAD_DESCRIPTION_ADMIN}
      />
      <div className="mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="md:px-6 py-12">
            <div className="flex flex-col md:flex-row flex-start gap-3">
              <div className="flex flex-col md:w-96 overflow-hidden rounded bg-gray-A900">
                <div className="relative overflow-hidden flex h-56 w-full items-center justify-center border-0 border-b border-solid border-gray-A400">
                  <div className="w-full flex items-center flex-col">
                    <img src="/logos/admin_upload.svg" alt="UploadImage" width={80} />
                  </div>
                </div>
                <div className="relative mb-10 flex flex-col p-4 space-y-2 bg-gray-A900">
                  <h3 className="text-2xl font-bold m-0">アップロード</h3>
                  <p className="text-lg">
                    PNG, JPG, JPEG,
                    GIF形式の画像をアップロードすることができます。一度に最大5MBまでアップロードできます。
                  </p>
                </div>
                <Link
                  className="inline-flex items-center justify-center rounded-lg text-lg font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-12 px-6 py-2"
                  to="/admin/upload_images"
                >
                  アップロード画面へ
                </Link>
              </div>
              <div className="flex flex-col md:w-96 overflow-hidden rounded bg-gray-A900">
                <div className="relative overflow-hidden flex h-56 w-full items-center justify-center border-0 border-b border-solid border-gray-A400">
                  <div className="w-full flex items-center flex-col">
                    <img src="/logos/admin_edit.svg" alt="UploadImage" width={80} />
                  </div>
                </div>
                <div className="relative mb-10 flex flex-col p-4 space-y-2 bg-gray-A900">
                  <h3 className="text-2xl font-bold m-0">編集</h3>
                  <p className="text-lg">
                    ギャラリーに並んでいるイラストを削除・並び替えすることができます。削除と並び替えは同時に実行可能です。
                  </p>
                </div>
                <Link
                  className="inline-flex items-center justify-center rounded-lg text-lg font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-12 px-6 py-2"
                  to="/admin/edit_images"
                >
                  ギャラリー編集画面へ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(AdminPage);
