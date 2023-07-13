import { type AxiosResponse } from 'axios';

import { apiClient, defaultErrorHandler } from './ApiClient';

type UploadImageRequest = {
  images: string[];
  images_json: { images: Array<{ id: number; idx: number; src: string; alt: string }> };
};

type UploadImageResponse = {
  status_code: string;
};

export const UploadImageApi = {
  BASE_URL: '/api/v1/upload_images',
  create: async (params: UploadImageRequest) => {
    return await apiClient
      .post<UploadImageRequest, AxiosResponse<UploadImageResponse>>(UploadImageApi.BASE_URL, params)
      .catch(defaultErrorHandler);
  },
};
