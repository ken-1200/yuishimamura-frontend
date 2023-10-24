import { useState } from 'react';

import { css } from '@emotion/react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const GlobalHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="py-6 px-4 sm:p-6 md:px-8">
      <nav className="flex items-center justify-between" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="my-4 text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight"
          >
            ゆい イラストサイト
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/gallery"
            className="m-4 uppercase text-2xl font-bold text-[#aaa] transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#333] duration-300"
          >
            ギャラリー
          </Link>
          <Link
            to="/profile"
            className="m-4 uppercase text-2xl font-bold text-[#aaa] transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#333] duration-300"
          >
            プロフィール
          </Link>
          <a
            href="https://suzuri.jp/yuishimamura/"
            target="_blank"
            rel="noopener noreferrer"
            className="m-4 uppercase text-2xl font-bold text-[#aaa] transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#333] duration-300"
          >
            スズリ
          </a>
          <a
            href="https://line.me/S/sticker/23392341/?lang=ja&utm_source=gnsh_stickerDetail"
            target="_blank"
            rel="noopener noreferrer"
            className="m-4 uppercase text-2xl font-bold text-[#aaa] transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#333] duration-300"
          >
            LINEスタンプ
          </a>
          <a
            href="https://www.instagram.com/yuishimamura/"
            target="_blank"
            rel="noopener noreferrer"
            className="m-4 uppercase text-2xl font-bold text-[#aaa] transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#333] duration-300"
          >
            <i
              className="fa-instagram"
              css={css`
                display: inline-block;
                font: normal normal normal 14px/1 FontAwesome;
                font-size: inherit;
                text-rendering: auto;
              `}
            />
          </a>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <span className="-m-1.5 p-1.5" />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/gallery"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ギャラリー
                </Link>
                <Link
                  to="/profile"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  プロフィール
                </Link>
                <a
                  href="https://suzuri.jp/yuishimamura/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  スズリ
                </a>
                <a
                  href="https://line.me/S/sticker/23392341/?lang=ja&utm_source=gnsh_stickerDetail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  LINEスタンプ
                </a>
                <a
                  href="https://www.instagram.com/yuishimamura/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <i
                    className="fa-instagram"
                    css={css`
                      display: inline-block;
                      font: normal normal normal 14px/1 FontAwesome;
                      font-size: inherit;
                      text-rendering: auto;
                    `}
                  />
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default GlobalHeader;
