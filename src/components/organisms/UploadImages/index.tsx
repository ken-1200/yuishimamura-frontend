import { memo, useState, DragEvent, useCallback, useEffect, ChangeEvent, SyntheticEvent } from 'react';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { PhotoIcon } from '@heroicons/react/24/solid';

import {
  HEAD_TITLE_UPLOAD_IMAGES,
  HEAD_DESCRIPTION_UPLOAD_IMAGES,
  HEAD_KEYWORDS_UPLOAD_IMAGES,
} from '../../../constants';
import { useUploadImages } from '../../../hooks/useUploadImages';
import Head from '../../atoms/Head';
import ImagePreview from '../../atoms/ImagePreview';

type Illustration = {
  id: number;
  idx: number;
  src: string;
  alt: string;
};

const UploadImages = () => {
  const maxImageSizeKB = 5000; // 5MBまで

  const [imagesJson, setImagesJson] = useState<{
    images: Array<Illustration>;
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
  const handleOnAddImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    if (event.target.files.length === 0) return;

    setImageSizeKB(imageSizeKB + Math.floor(event.target.files[0].size / 1024));
    setImages([...images, ...event.target.files]);
    event.target.value = '';
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
  const getBase64Images = (base64Images: Array<string> | undefined): Array<string> => {
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
        const base64Array = imageDataArray.filter((result) => typeof result === 'string') as Array<string>;
        return base64Array;
      } catch (error) {
        console.error('preFilesReader Error:', error);
        openErrorAlert();
      }
    }
  };

  // Upload API
  const upload = useCallback(
    async (images: Array<string>, images_json: { images: Array<Illustration> }) => {
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
  const handleOnSubmit = async (e: SyntheticEvent): Promise<void> => {
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
      <Head
        title={HEAD_TITLE_UPLOAD_IMAGES}
        description={HEAD_DESCRIPTION_UPLOAD_IMAGES}
        keywords={HEAD_KEYWORDS_UPLOAD_IMAGES}
        ogTitle={HEAD_TITLE_UPLOAD_IMAGES}
        ogDescription={HEAD_DESCRIPTION_UPLOAD_IMAGES}
      />
      <div className="mt-20">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">アップロード</h2>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto py-16 sm:py-24 lg:max-w-none lg:py-32">
            <form onSubmit={(e) => handleOnSubmit(e)}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="upload-photos"
                        className="grid grid-flow-col text-lg font-medium leading-6 text-gray-900"
                      >
                        {/* <span className="text-start">画像をアップロード</span> */}
                        <span className="text-end">
                          {imageSizeKB} / {maxImageSizeKB}KB (最大5MB)
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
                          <div className="mt-4 flex text-base leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
                            >
                              <span>ファイルをアップロード</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                accept="image/*,.png,.jpg,.jpeg,.gif"
                                className="sr-only"
                                onChange={(e) => handleOnAddImage(e)}
                              />
                            </label>
                            <p className="pl-1">or ドラッグ&ドロップ</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">画像形式 PNG, JPG, JPEG, GIF</p>
                        </div>
                      </div>

                      <div className="pt-4 grid grid-rows-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                        {images.map((image, i) => (
                          <div key={i} className="relative">
                            <XMarkIcon
                              className="absolute top-0 right-0 h-11 w-11 bg-gray-400/50 text-white ml-auto cursor-pointer rounded-lg z-10"
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
                  キャンセル
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
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    '送信'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isSuccess ? (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-[#f0fdf4] px-6 py-4 mt-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <CheckCircleIcon className="h-7 w-7 text-[#4afa8d]" aria-hidden="true" />
            <p className="text-xl font-bold text-[#166534]">正常にアップロードされました。</p>
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
    </>
  );
};
export default memo(UploadImages);
