import cookie from 'js-cookie';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import {
  clearCookiesAndLocalStorage,
  setCredentialsToCookies,
} from '@/common/authFunction';
import { postGetRefreshToken } from '@/apis/refresh.api';

export type IConfig = AxiosRequestConfig;

function getAccessToken() {
  const accessToken = cookie.get('accessToken') || '';
  return accessToken;
}

const requestConfig = {
  baseURL: process.env.API_URL
    ? `${process.env.API_URL}`
    : 'https://bookstore-39jw3.ondigitalocean.app/api',
};

export const axiosInstance = axios.create(requestConfig);

async function middlewareRefresh(error: AxiosError) {
  try {
    const { data } = await postGetRefreshToken();
    setCredentialsToCookies({
      accessToken: data.access.token,
      refreshToken: data.refresh.token,
    });

    if (error?.config?.headers)
      error.config.headers.Authorization = `Bearer ${data.access.token}`;
  } catch (error) {
    clearCookiesAndLocalStorage();
    window.location.replace('/login');
    return;
  }

  error?.config && axios(error.config);
}

export default function initRequest() {
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken();
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
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
          middlewareRefresh(error);
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
