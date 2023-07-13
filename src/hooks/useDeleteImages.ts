/* eslint-disable no-undef */
import { DeleteImageApi } from '../apis/DeleteImages';

const deleteImages = async (params: {
  images_path: Array<string>;
  images_json: { images: Array<{ id: number; idx: number; src: string; alt: string }> };
}) => {
  console.info('useDeleteImages.deleteImages', params);
  return await DeleteImageApi.create(params);
};

export const useDeleteImages = () => {
  return {
    deleteImages,
  };
};
