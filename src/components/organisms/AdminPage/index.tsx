import { memo } from 'react';

import { Link } from 'react-router-dom';

import {
  HEAD_TITLE_ADMIN,
  HEAD_DESCRIPTION_ADMIN,
  HEAD_KEYWORDS_ADMIN,
} from '../../../constants';
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
                <div className="relative mb-1.5 flex flex-col p-4 space-y-2 bg-gray-A900">
                  <h3 className="text-xl font-bold m-0">アップロード</h3>
                  <p>
                    PNG, JPG, JPEG,
                    GIF形式の画像をアップロードすることができます。一度に最大5MBまでアップロードできます。
                  </p>
                </div>
                <div className="mx-auto flex bg-gray-A900 justify-between items-center p-4 pt-2">
                  <Link to="/upload_images">アップロード画面へ</Link>
                </div>
              </div>
              <div className="flex flex-col md:w-96 overflow-hidden rounded bg-gray-A900">
                <div className="relative overflow-hidden flex h-56 w-full items-center justify-center border-0 border-b border-solid border-gray-A400">
                  <div className="w-full flex items-center flex-col">
                    <img src="/logos/admin_edit.svg" alt="UploadImage" width={80} />
                  </div>
                </div>
                <div className="relative mb-1.5 flex flex-col p-4 space-y-2 bg-gray-A900">
                  <h3 className="text-xl font-bold m-0">編集</h3>
                  <p>
                    ギャラリーに並んでいるイラストを削除・並び替えすることができます。削除と並び替えは同時に実行可能です。保存する場合は「保存ボタン」を押して下さい。
                  </p>
                </div>
                <div className="mx-auto flex bg-gray-A900 justify-between items-center p-4 pt-2">
                  <Link to="/edit_images">ギャラリー編集画面へ</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default memo(AdminPage);
