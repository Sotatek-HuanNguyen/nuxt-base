'use client'

import Axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { ResponseCode } from '@/constants'
// import { RefreshTokenResponse } from '@/interfaces';
import { cookies } from '@/utils'

export interface FailedRequest {
  resolve: (value: AxiosResponse<any, any> | PromiseLike<AxiosResponse<any, any>>) => void
  reject: (reason?: AxiosError) => void
  config: AxiosRequestConfig & { _retry?: boolean }
}

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// let isRefreshing = false;
// let failedRequestsQueue: Array<FailedRequest> = [];

// const refreshToken = async () => {
//   if (isRefreshing) return;
//   isRefreshing = true;

//   const refreshToken = cookies.get('refreshToken');
//   if (!refreshToken) {
//     return;
//   }

//   try {
//     const response = await axiosInstance.post<{ refreshToken: string }, RefreshTokenResponse>(
//       '/auth/refresh-token',
//       { refreshToken }
//     );

//     if (response?.accessToken && response?.refreshToken) {
//       cookies.set('access_token', response.accessToken);
//       cookies.set('refreshToken', response.refreshToken);
//       processQueue(response.accessToken);
//     }
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//   } finally {
//     isRefreshing = false;
//   }
// };

// const processQueue = (accessToken: string) => {
//   failedRequestsQueue.forEach(({ config, resolve, reject }) => {
//     if (config.headers) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//       axiosInstance(config).then(resolve).catch(reject);
//     }
//   });
//   failedRequestsQueue = [];
// };

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = cookies.get('access_token')

    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    // const originalRequest = error.config as InternalAxiosRequestConfig<any> & {
    //   _retry?: boolean;
    // };
    // if (error.response?.status === ResponseCode.UNAUTHORIZED && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   if (!cookies.get('refreshToken')) {
    //     return Promise.reject(error);
    //   }

    //   if (!isRefreshing) {
    //     await refreshToken();
    //   }

    //   return new Promise<AxiosResponse>((resolve, reject) => {
    //     failedRequestsQueue.push({
    //       resolve,
    //       reject,
    //       config: originalRequest,
    //     });
    //   });
    // }
    if (error.response?.status === ResponseCode.SERVER_ERROR) {
      return Promise.reject(error.response)
    }
    return Promise.reject(error.response)
  },
)

export const request = {
  get<ReqType, ResType>(url: string, params?: ReqType): Promise<ResType> {
    return axiosInstance.get(url, { params })
  },
  post<ReqType, ResType>(
    url: string,
    data?: ReqType,
    config?: AxiosRequestConfig<ReqType>,
  ): Promise<ResType> {
    return axiosInstance.post(url, data, config)
  },
  put<ReqType, ResType>(
    url: string,
    data?: ReqType,
    config?: AxiosRequestConfig<ReqType>,
  ): Promise<ResType> {
    return axiosInstance.put(url, data, config)
  },
  patch<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType> {
    return axiosInstance.patch(url, data)
  },
  delete<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType> {
    return axiosInstance.delete(url, { data })
  },
}
