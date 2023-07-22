import { memo, HTMLAttributes, ChangeEvent } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import ImageItem from '../ImageItem';

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
} & HTMLAttributes<HTMLDivElement>;

const SortableItem = ({ item, checkedIllustrations, handleCheckboxChange, ...props }: Props) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
  });

  return (
    <ImageItem
      item={item}
      checkedIllustrations={checkedIllustrations}
      handleCheckboxChange={handleCheckboxChange}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
      }}
      isOpacityEnabled={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

SortableItem.displayName = 'SortableItem';

export default memo(SortableItem);
