import axios from 'axios';

import { type AxiosError } from './axios-error';

const API_ENDPONT = import.meta.env.VITE_API_ENDPONT;

const client = axios.create({
  // withCredentials: true,
});

// Set the access token to authorization header for each request.
client.interceptors.request.use(
  (config) => {
    config.baseURL = API_ENDPONT;
    config.headers['Content-Type'] = 'application/json';
    config.headers['X-YUISHIMAMURA-API-KEY'] = 'local';
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

/**
 * If a request fails with 403 error, use the refresh token auth
 * and retry the request only once.
 * @see {@link https://github.com/axios/axios/issues/450}
 **/
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err: AxiosError) => {
    const errorResponse = err.response;
    if (!errorResponse || !('config' in errorResponse)) {
      return await Promise.reject(err);
    }
    return await Promise.reject(err);
  },
);

export const apiClient = client;

export const defaultErrorHandler = (error: AxiosError) => {
  // Handle errors according to status code, except for 403,
  // which is handled by interceptors along the way.
  const response = error.response || {};
  error.response = response;
  throw error;
};
