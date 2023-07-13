/* eslint-disable no-undef */
import { memo, useState, DragEvent, useCallback, useEffect } from 'react';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { PhotoIcon } from '@heroicons/react/24/solid';

import { useUploadImages } from '../../../hooks/useUploadImages';
import ImagePreview from '../../atoms/ImagePreview';

const UploadImages = () => {
  const maxImageSizeKB = 5000; // 5MBまで

  const [imagesJson, setImagesJson] = useState<{
    images: Array<{ id: number; idx: number; src: string; alt: string }>;
  }>({ images: [] });
  const [images, setImages] = useState<File[]>([]);
  const [imageSizeKB, setImageSizeKB] = useState<number>(0);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { uploadImages } = useUploadImages();

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

  // drag enter
  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  };

  // drag leave
  const onDragLeave = () => {
    setIsDragActive(false);
  };

  // drop
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);

    if (!e.dataTransfer.files) return;
    if (e.dataTransfer.files.length === 0) return;

    let totalSize = 0;
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      totalSize += Math.floor(e.dataTransfer.files[i].size / 1024);
    }
    setImageSizeKB(imageSizeKB + totalSize);
    setImages([...images, ...e.dataTransfer.files]);
    e.dataTransfer.clearData();
  };

  // click
  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files.length === 0) return;

    setImageSizeKB(imageSizeKB + Math.floor(e.target.files[0].size / 1024));
    setImages([...images, ...e.target.files]);
  };

  // click remove
  const handleOnRemoveImage = (index: number) => {
    const newImages = [...images];
    setImageSizeKB(imageSizeKB - Math.floor(newImages[index].size / 1024));
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // click cancel
  const handleOnCancelImages = () => {
    setImageSizeKB(0);
    setImages([]);
  };

  // file read exclude undefined
  const getBase64Images = (base64Images: string[] | undefined): string[] => {
    if (base64Images === undefined) {
      return [];
    }
    return base64Images;
  };

  // file read
  const preFilesReader = async () => {
    const syncFileReader = (image: File) => {
      return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(image);
      });
    };

    if (images) {
      try {
        const imageDataArray = await Promise.all(images.map(syncFileReader));
        const base64Array = imageDataArray.filter((result) => typeof result === 'string') as string[];
        return base64Array;
      } catch (error) {
        console.error('preFilesReader Error:', error);
        openErrorAlert();
      }
    }
  };

  // Upload API
  const upload = useCallback(
    async (images: string[], images_json: { images: Array<{ id: number; idx: number; src: string; alt: string }> }) => {
      try {
        await uploadImages({
          images,
          images_json,
        });
        openSuccessAlert();
      } catch (error) {
        console.error(error);
        openErrorAlert();
      }
    },
    [uploadImages],
  );

  // save button
  const handleOnSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    setIsLoading(true);
    e.preventDefault();

    const preBase64Images = await preFilesReader();
    const base64ImageArray = getBase64Images(preBase64Images);

    await upload(base64ImageArray, imagesJson);
    setIsLoading(false);
    handleOnCancelImages();
  };

  useEffect(() => {
    fetch('/images.json')
      .then((response) => response.json())
      .then((json) => {
        setImagesJson(json);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="upload-photos"
                  className="grid grid-flow-col text-sm font-medium leading-6 text-gray-900"
                >
                  <span className="text-start">Upload photos</span>
                  <span className="text-end">
                    Limit photo size {imageSizeKB} / {maxImageSizeKB}KB
                  </span>
                </label>
                <div
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop}
                  className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-28 ${
                    isDragActive ? 'bg-sky-50 border-sky-400' : 'border-gray-900/25'
                  }`}
                >
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*,.png,.jpg,.jpeg,.gif"
                          className="sr-only"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnAddImage(e)}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, JPEG, GIF up to 5MB</p>
                  </div>
                </div>

                <div className="pt-4 grid grid-rows-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                  {images.map((image, i) => (
                    <div key={i} className="relative">
                      <XMarkIcon
                        className="absolute top-0 right-0 h-11 w-11 bg-gray-400/50 text-white ml-auto cursor-pointer rounded"
                        aria-hidden="true"
                        onClick={() => handleOnRemoveImage(i)}
                      />
                      <ImagePreview src={URL.createObjectURL(image)} alt={String(i)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => handleOnCancelImages()}
            disabled={images.length === 0 || imageSizeKB > maxImageSizeKB}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 text-sm font-semibold leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 rounded-md  shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            disabled={images.length === 0 || imageSizeKB > maxImageSizeKB}
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
              'Save'
            )}
          </button>
        </div>
      </form>
      {isSuccess ? (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-[#f0fdf4] px-6 py-4 mt-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <CheckCircleIcon className="h-7 w-7 text-[#4afa8d]" aria-hidden="true" />
            <p className="text-xl font-bold text-[#166534]">Successfully uploaded</p>
          </div>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
              onClick={() => closeSuccessAlert()}
            >
              <span className="sr-only">Dismiss</span>
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
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-7 w-7 text-[#f8b9b9]" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default memo(UploadImages);
