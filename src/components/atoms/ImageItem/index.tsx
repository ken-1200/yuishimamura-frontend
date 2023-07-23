import { memo, forwardRef, HTMLAttributes, ChangeEvent } from 'react';

import { css } from '@emotion/react';

type Props = {
  item: {
    id: number;
    idx: number;
    src: string;
    alt: string;
  };
  checkedIllustrations: {
    id: number;
    idx: number;
    src: string;
    alt: string;
  }[];
  handleCheckboxChange: (
    event: ChangeEvent<HTMLInputElement>,
    illustration: {
      id: number;
      idx: number;
      src: string;
      alt: string;
    },
  ) => void;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const ImageItem = forwardRef<HTMLDivElement, Props>(
  ({ item, checkedIllustrations, handleCheckboxChange, isOpacityEnabled, isDragging, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        css={css`
          cursor: ${isDragging ? 'grabbing' : 'grab'};
          opacity: ${isOpacityEnabled ? 0.4 : 1};
          line-height: 0.5;
          transform: ${isDragging ? 'scale(1.05)' : 'scale(1)'};
          ${{ ...style }}
        `}
        {...props}
      >
        <input
          id={String(item.id)}
          name="illustrations"
          type="checkbox"
          className="absolute right-0 h-6 w-6 rounded-full border-gray-300 text-indigo-400 focus:ring-indigo-400 hover:cursor-pointer"
          checked={checkedIllustrations?.some((i) => i.id === item.id)}
          onChange={(e) => handleCheckboxChange(e, item)}
        />
        <img
          src={item.src}
          alt={item.alt}
          css={css`
            border-radius: 8px;
            box-shadow: ${isDragging
              ? 'none'
              : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px'};
            max-width: 100%;
            object-fit: cover;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-touch-callout: none;
            -moz-user-select: none;
            user-select: none;
          `}
        />
      </div>
    );
  },
);

ImageItem.displayName = 'ImageItem';

export default memo(ImageItem);
