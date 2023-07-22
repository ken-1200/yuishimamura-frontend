/* eslint-disable no-undef */
import { DeleteUpdateImageApi } from '../apis/DeleteUpdateImages';

const deleteUpdateImages = async (params: {
  images_path: Array<string>;
  images_json: { images: Array<{ id: number; idx: number; src: string; alt: string }> };
}) => {
  console.info('useDeleteUpdateImages.deleteUpdateImages', params);
  return await DeleteUpdateImageApi.create(params);
};

export const useDeleteUpdateImages = () => {
  return {
    deleteUpdateImages,
  };
};
