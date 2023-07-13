/* eslint-disable no-undef */
import { useState, memo, useEffect, useCallback } from 'react';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { useDeleteImages } from '../../../hooks/useDeleteImages';
import ImagePreview from '../../atoms/ImagePreview';

type Illustration = {
  id: number;
  idx: number;
  src: string;
  alt: string;
};

const EditImages = () => {
  const [imagesJson, setImagesJson] = useState<{
    images: Array<Illustration>;
  }>({ images: [] });
  const [illustrations, setIllustrations] = useState<Array<Illustration>>([]);
  const [checkedIllustrations, setCheckedIllustrations] = useState<Array<Illustration>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { deleteImages } = useDeleteImages();

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
        setImagesJson(json);
      })
      .catch((error) => console.log(error));
  };

  // checkbox
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, illustration: Illustration) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedIllustrations([...checkedIllustrations, illustration]);
    } else {
      const updatedIllustrations = checkedIllustrations.filter((c) => c.id !== illustration.id);
      setCheckedIllustrations(updatedIllustrations);
    }
  };

  // Delete API
  const _delete = useCallback(
    async (images_path: Array<string>, images_json: { images: Array<Illustration> }) => {
      try {
        await deleteImages({
          images_path,
          images_json,
        });
        openSuccessAlert();
      } catch (error) {
        console.error(error);
        openErrorAlert();
      }
    },
    [deleteImages],
  );

  // save button
  const handleOnSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    setIsLoading(true);
    e.preventDefault();

    const srcArray = checkedIllustrations.map((item) => item.src);

    await _delete(srcArray, imagesJson);
    setIsLoading(false);
    setCheckedIllustrations([]);
    loadingIllustrations();
  };

  useEffect(() => {
    loadingIllustrations();
  }, []);

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Edit Illustrations</h2>
      {isSuccess ? (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-[#f0fdf4] px-6 py-4 mt-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <CheckCircleIcon className="h-7 w-7 text-[#4afa8d]" aria-hidden="true" />
            <p className="text-xl font-bold text-[#166534]">Successfully deleted</p>
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
            <p className="text-xl font-bold text-[#991B1B]">There were errors with your submission</p>
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
      <div className="mt-6 flex items-center justify-start gap-x-6">
        <button
          type="button"
          className="px-3 py-2 text-sm text-white font-semibold leading-6 bg-indigo-600 rounded-md  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          onClick={(e) => handleOnSubmit(e)}
          disabled={checkedIllustrations.length === 0}
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
            'Delete'
          )}
        </button>
      </div>
      <div className="grid grid-rows-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {illustrations.map((illustration) => (
          <div key={illustration.id} className="relative">
            <input
              id={String(illustration.id)}
              name="illustrations"
              type="checkbox"
              className="absolute right-0 h-6 w-6 rounded-full border-gray-300 text-indigo-400 focus:ring-indigo-400"
              checked={checkedIllustrations.some((i) => i.id === illustration.id)}
              onChange={(e) => handleCheckboxChange(e, illustration)}
            />
            <ImagePreview src={illustration.src} alt={illustration.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default memo(EditImages);
