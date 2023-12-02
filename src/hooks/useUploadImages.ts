import { UploadImageApi } from '../apis/UploadImages';

const uploadImages = async (images: {
  images: Array<string>;
  images_json: { images: Array<{ id: number; idx: number; src: string; alt: string }> };
}) => {
  console.info('useUploadImages.uploadImages', images);
  return await UploadImageApi.create(images);
};

export const useUploadImages = () => {
  return {
    uploadImages,
  };
};
