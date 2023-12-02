import { memo, useState } from 'react';

import { css } from '@emotion/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

type Props = {
  src: string;
  alt: string;
};

const ImagePreview = ({ src, alt }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <img
        className="rounded-lg hover:opacity-75"
        loading="lazy"
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleOpen}
        src={src}
        alt={alt}
        css={css`
          cursor: pointer;
          box-shadow: rgb(63 63 68 / 3%) 0px 0px 0px 1px, rgb(34 33 81 / 5%) 0px 1px 3px 0px;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-touch-callout: none;
          -moz-user-select: none;
          user-select: none;
        `}
      />
      {isOpen && (
        <div
          onClick={handleClose}
          css={css`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1;
          `}
        >
          <XMarkIcon
            className="absolute top-0 right-0 h-20 w-20 text-white ml-auto cursor-pointer"
            aria-hidden="true"
            onClick={handleClose}
          />
          <div
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            `}
          >
            <img
              className="max-w-[80vw] max-h-[80vh] rounded-lg"
              loading="lazy"
              onContextMenu={(e) => e.preventDefault()}
              src={src}
              alt={alt}
              css={css`
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -moz-touch-callout: none;
                -moz-user-select: none;
                user-select: none;
              `}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default memo(ImagePreview);
