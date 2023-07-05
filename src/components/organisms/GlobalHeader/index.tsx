import { useState } from 'react';

import { css } from '@emotion/react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const GlobalHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a
            href="/"
            className="m-4 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
          >
            Yui Shimamura Illustration Site
          </a>
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
          <a
            href="/"
            className="m-4 uppercase text-2xl font-bold text-[#aaa] transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#333] duration-300"
          >
            Illustrations
          </a>
          <a
            href="/about"
            className="m-4 uppercase text-2xl font-bold text-[#aaa] transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:text-[#333] duration-300"
          >
            About
          </a>
          <a
            href="https://www.instagram.com/smmryi/"
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
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only" />
              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Illustrations
                </a>
                <a
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </a>
                <a
                  href="https://www.instagram.com/yui_illustrations/"
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
