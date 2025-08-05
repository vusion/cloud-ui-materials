import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// 创建axios实例
const instance = axios.create({
//   baseURL: '/api', // 设置API的基础URL
});

// 请求拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    // 可在请求发送前对config进行修改，如添加请求头等
    return config;
  },
  (error: AxiosError) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据进行处理
    return response;
  },
  (error: AxiosError) => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

export default instance;
