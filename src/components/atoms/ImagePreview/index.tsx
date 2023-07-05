/* eslint-disable no-undef */
import { memo, useState, useEffect } from 'react';

import { css } from '@emotion/react';

type Props = {
  src: string;
  alt: string;
};

const ImagePreview = ({ src, alt }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // スクリーン幅が640px未満の場合にtrueとなるように設定
    };

    handleResize(); // 初回レンダリング時に実行
    window.addEventListener('resize', handleResize); // リサイズイベントの監視

    return () => {
      window.removeEventListener('resize', handleResize); // コンポーネントがアンマウントされるときにイベントリスナーを削除
    };
  }, []);

  const handleOpen = () => {
    if (!isMobile) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <img
        className="rounded-lg"
        loading="lazy"
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleOpen}
        src={src}
        alt={alt}
        css={css`
          cursor: pointer;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-touch-callout: none;
          -moz-user-select: none;
          user-select: none;
        `}
      />
      {isOpen && !isMobile && (
        <div
          onClick={handleClose}
          css={css`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1;
          `}
        >
          <div
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            `}
          >
            <img
              className="sm:max-w-[60rem] sm:max-h-[60rem] rounded-lg"
              loading="lazy"
              onContextMenu={(e) => e.preventDefault()}
              src={src}
              alt={alt}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default memo(ImagePreview);
