import axios, { AxiosRequestConfig } from 'axios';
import cookie from 'js-cookie';

export type IConfig = AxiosRequestConfig;

function getAccessToken() {
  const accessToken = cookie.get('accessToken') || '';
  return accessToken;
}

const requestConfig = {
  baseURL: process.env.REACT_APP_API_URL
    ? `${process.env.REACT_APP_API_URL}`
    : 'https://bookstore-39jw3.ondigitalocean.app/api',
};

export const axiosInstance = axios.create(requestConfig);

export default function initRequest() {
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers = {
          Authorization: `Bearer ${accessToken}`,
        };
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res?.data;
    },
    (error) => {
      switch (error.response?.status) {
        case 401: {
          break;
        }
        case 400: {
          break;
        }
        case 403: {
          alert('Bạn không có quyền truy cập vào trang này');

          break;
        }
        case 500: {
          break;
        }
        default:
          break;
      }
      return Promise.reject(error);
    }
  );
}
