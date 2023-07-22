import { type AxiosResponse } from 'axios';

import { apiClient, defaultErrorHandler } from '../ApiClient';

type DeleteUpdateImageRequest = {
  images_path: Array<string>;
  images_json: { images: Array<{ id: number; idx: number; src: string; alt: string }> };
};

type DeleteUpdateImageResponse = {
  status_code: string;
  s3_uris: Array<string>;
};

export const DeleteUpdateImageApi = {
  BASE_URL: '/api/v1/delete_update_images',
  create: async (params: DeleteUpdateImageRequest) => {
    return await apiClient
      .post<DeleteUpdateImageRequest, AxiosResponse<DeleteUpdateImageResponse>>(DeleteUpdateImageApi.BASE_URL, params)
      .catch(defaultErrorHandler);
  },
};
