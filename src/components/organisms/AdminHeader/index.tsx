import { useState } from 'react';

import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="py-6 px-4 sm:p-6 md:px-8">
      <nav className="mx-auto flex items-center justify-between py-6 px-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/admin" className="my-4 text-3xl font-bold leading-7 text-gray-900">
            🦕 管理画面
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/upload_images"
            className="m-4 uppercase text-2xl font-bold text-[#aaa] transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#333] duration-300"
          >
            画像アップロード
          </Link>
          <Link
            to="/edit_images"
            className="m-4 uppercase text-2xl font-bold text-[#aaa] transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#333] duration-300"
          >
            画像編集
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white py-6 px-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="mx-auto flex items-center justify-between py-6 px-4 lg:px-8">
            <div className="flex lg:flex-1">
              <div className="my-4 text-3xl font-bold leading-7 text-gray-900">🦕 管理画面</div>
            </div>
            <div className="flex lg:hidden">
              <span className="-m-1.5 p-1.5" />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-10 w-10" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/upload_images"
                  className="-mx-3 block rounded-lg px-4 py-3 mb-6 text-2xl font-bold leading-8 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  画像アップロード
                </Link>
                <Link
                  to="/edit_images"
                  className="-mx-3 block rounded-lg px-4 py-3 mb-6 text-2xl font-bold leading-8 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  画像編集
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default AdminHeader;
