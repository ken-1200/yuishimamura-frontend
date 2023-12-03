import { useState, memo, useEffect, useCallback, SyntheticEvent, ChangeEvent } from 'react';

import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  TouchSensor,
  closestCenter,
  MouseSensor,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { css } from '@emotion/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { HEAD_TITLE_EDIT_IMAGES, HEAD_DESCRIPTION_EDIT_IMAGES, HEAD_KEYWORDS_EDIT_IMAGES } from '../../../constants';
import { useUpdateDeleteImages } from '../../../hooks/useUpdateDeleteImages';
import Head from '../../atoms/Head';
import ImageItem from '../../atoms/ImageItem';
import SortableItem from '../../atoms/SortableItem';

type Illustration = {
  id: number;
  idx: number;
  src: string;
  alt: string;
};

const EditImages = () => {
  const [illustrations, setIllustrations] = useState<Array<Illustration>>([]);
  const [checkedIllustrations, setCheckedIllustrations] = useState<Array<Illustration>>([]);
  // for drag overlay
  const [activeItem, setActiveItem] = useState<Illustration>();
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { updateDeleteImages } = useUpdateDeleteImages();

  // error alert button
  const openErrorAlert = () => {
    setIsError(true);
  };
  const closeErrorAlert = () => {
    setIsError(false);
  };

  // success alert button
  const openSuccessAlert = () => {
    setIsSuccess(true);
  };
  const closeSuccessAlert = () => {
    setIsSuccess(false);
  };

  // loading
  const loadingIllustrations = () => {
    fetch('/images.json')
      .then((response) => response.json())
      .then((json) => {
        setIllustrations(json.images);
      })
      .catch((error) => console.log(error));
  };

  // checkbox
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, illustration: Illustration) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedIllustrations([...checkedIllustrations, illustration]);
    } else {
      const updatedIllustrations = checkedIllustrations.filter((c) => c.id !== illustration.id);
      setCheckedIllustrations(updatedIllustrations);
    }
  };

  // click cancel
  const handleOnCancelImages = () => {
    setCheckedIllustrations([]);
    loadingIllustrations();
    setIsChanged(false);
  };

  // delete/update API
  const updateDelete = useCallback(
    async (images_path: Array<string>, images_json: { images: Array<Illustration> }) => {
      try {
        await updateDeleteImages({
          images_path,
          images_json,
        });
        openSuccessAlert();
      } catch (error) {
        console.error(error);
        openErrorAlert();
      }
    },
    [updateDeleteImages],
  );

  // save button
  const handleOnSubmit = async (e: SyntheticEvent): Promise<void> => {
    setIsLoading(true);
    e.preventDefault();

    const srcArray = checkedIllustrations.map((item) => item.src);
    const imagesJson = { images: illustrations };

    await updateDelete(srcArray, imagesJson);
    setIsLoading(false);
    setCheckedIllustrations([]);
    loadingIllustrations();
    setIsChanged(false);
  };

  // for input methods detection
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 5 pixels before activating
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 150,
        tolerance: 3,
      },
    }),
  );

  // triggered when dragging starts
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveItem(illustrations.find((item) => item.id === active.id));
  };

  // triggered when dragging ends
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeItem = illustrations.find((item) => item.id === active.id);
    const overItem = illustrations.find((item) => item.id === over.id);

    if (!activeItem || !overItem) {
      return;
    }

    const activeIndex = illustrations.findIndex((item) => item.id === active.id);
    const overIndex = illustrations.findIndex((item) => item.id === over.id);

    if (activeIndex !== overIndex) {
      setIllustrations((prev) => arrayMove<Illustration>(prev, activeIndex, overIndex));
      setIsChanged(true);
    }
    setActiveItem(undefined);
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
  };

  useEffect(() => {
    loadingIllustrations();
  }, []);

  return (
    <>
      <Head
        title={HEAD_TITLE_EDIT_IMAGES}
        description={HEAD_DESCRIPTION_EDIT_IMAGES}
        keywords={HEAD_KEYWORDS_EDIT_IMAGES}
        ogTitle={HEAD_TITLE_EDIT_IMAGES}
        ogDescription={HEAD_DESCRIPTION_EDIT_IMAGES}
      />
      <div className="mt-20">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">ギャラリー編集</h2>
        {isSuccess ? (
          <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-[#f0fdf4] px-6 py-4 mt-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <CheckCircleIcon className="h-7 w-7 text-[#4afa8d]" aria-hidden="true" />
              <p className="text-xl font-bold text-[#166534]">正常に削除・更新されました。</p>
            </div>
            <div className="flex flex-1 justify-end">
              <button
                type="button"
                className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
                onClick={() => closeSuccessAlert()}
              >
                <XMarkIcon className="h-7 w-7 text-[#4afa8d]" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}
        {isError ? (
          <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-[#FEF2F2] px-6 py-4 mt-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <CheckCircleIcon className="h-7 w-7 text-[#f8b9b9]" aria-hidden="true" />
              <p className="text-xl font-bold text-[#991B1B]">送信内容にエラーがありました。</p>
            </div>
            <div className="flex flex-1 justify-end">
              <button
                type="button"
                className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
                onClick={() => closeErrorAlert()}
              >
                <XMarkIcon className="h-7 w-7 text-[#f8b9b9]" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}
        <div className="py-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => handleOnCancelImages()}
          >
            リセット
          </button>
          <button
            type="button"
            className="px-3 py-2 text-sm text-white font-semibold leading-6 bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            onClick={(e) => handleOnSubmit(e)}
            disabled={!isChanged && checkedIllustrations.length === 0}
          >
            {isLoading ? (
              <svg
                className="w-5 h-5 mr-1 ml-1 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              '保存'
            )}
          </button>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={illustrations} strategy={rectSortingStrategy}>
            <div className="grid grid-rows-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {illustrations.map((item) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  checkedIllustrations={checkedIllustrations}
                  handleCheckboxChange={handleCheckboxChange}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay
            adjustScale
            css={css`
              transform-origin: 0 0;
            `}
          >
            {activeItem ? (
              <ImageItem
                item={activeItem}
                checkedIllustrations={checkedIllustrations}
                handleCheckboxChange={handleCheckboxChange}
                isDragging
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};
export default memo(EditImages);
