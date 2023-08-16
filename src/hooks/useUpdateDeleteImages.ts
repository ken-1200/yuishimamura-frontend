/* eslint-disable no-undef */
import { UpdateDeleteImageApi } from '../apis/UpdateDeleteImages';

const updateDeleteImages = async (params: {
  images_path: Array<string>;
  images_json: { images: Array<{ id: number; idx: number; src: string; alt: string }> };
}) => {
  console.info('useUpdateDeleteImages.updateDeleteImages', params);
  return await UpdateDeleteImageApi.create(params);
};

export const useUpdateDeleteImages = () => {
  return {
    updateDeleteImages,
  };
};
