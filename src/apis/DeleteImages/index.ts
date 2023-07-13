import { type AxiosResponse } from 'axios';

import { apiClient, defaultErrorHandler } from '../ApiClient';

type DeleteImageRequest = {
  images_path: Array<string>;
  images_json: { images: Array<{ id: number; idx: number; src: string; alt: string }> };
};

type DeleteImageResponse = {
  status_code: string;
  s3_uris: Array<string>;
};

export const DeleteImageApi = {
  BASE_URL: '/api/v1/delete_images',
  create: async (params: DeleteImageRequest) => {
    return await apiClient
      .post<DeleteImageRequest, AxiosResponse<DeleteImageResponse>>(DeleteImageApi.BASE_URL, params)
      .catch(defaultErrorHandler);
  },
};
