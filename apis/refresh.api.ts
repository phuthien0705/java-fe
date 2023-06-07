import axios, { AxiosPromise } from 'axios';
import Cookies from 'js-cookie';
import { checkNullish } from '@/utils/checkNullish';

export const baseApiUrl = process.env.API_URL
  ? `${process.env.API_URL}`
  : 'https://bookstore-39jw3.ondigitalocean.app/api';

export const postGetRefreshToken = () => {
  return axios({
    method: 'post',
    baseURL: baseApiUrl,
    url: '/auth/refresh-tokens',
    data: {
      refreshToken: checkNullish(Cookies.get('refreshToken')),
    },
  }) as AxiosPromise<{
    access: { expires: string; token: string };
    refresh: { expires: string; token: string };
  }>;
};
