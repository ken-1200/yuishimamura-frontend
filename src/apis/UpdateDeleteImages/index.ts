import { type AxiosResponse } from 'axios';

import { apiClient, defaultErrorHandler } from '../ApiClient';

type UpdateDeleteImageRequest = {
  images_path: Array<string>;
  images_json: { images: Array<{ id: number; idx: number; src: string; alt: string }> };
};

type UpdateDeleteImageResponse = {
  status_code: string;
  s3_uris: Array<string>;
};

export const UpdateDeleteImageApi = {
  BASE_URL: '/api/v1/update_delete_images',
  create: async (params: UpdateDeleteImageRequest) => {
    return await apiClient
      .post<UpdateDeleteImageRequest, AxiosResponse<UpdateDeleteImageResponse>>(UpdateDeleteImageApi.BASE_URL, params)
      .catch(defaultErrorHandler);
  },
};
