// ApiClient.ts で AxiosError を拡張するための型定義ファイル
// import { AxiosError } from 'axios';

import { type AxiosResponse, type AxiosRequestConfig } from 'axios';

// interface _AxiosRequestConfig extends AxiosRequestConfig {
//   /**
//    * Whether the request is retried by axios.interceptors or not.
//    */
//   __isRetryRequest?: boolean;
// }

// interface _AxiosResponse<T = any> extends AxiosResponse<T> {
//   config: _AxiosRequestConfig;
// }

export interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T> | Record<never, never>;
  isAxiosError: boolean;
  toJSON: () => object;
}
