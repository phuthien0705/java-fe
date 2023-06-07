import { checkNullish } from '@/utils/checkNullish';
import cookie from 'js-cookie';

export const clearCookiesAndLocalStorage = () => {
  cookie.remove('accessToken');
  cookie.remove('refreshToken');
  localStorage.clear();
};

export const logout = () => {
  clearCookiesAndLocalStorage();
  window.location.href = '/login';
};

export const setCredentialsToCookies = (data: {
  accessToken: string;
  refreshToken: string;
}) => {
  const daysToExpired = 7;

  cookie.set('accessToken', data.accessToken, {
    expires: daysToExpired,
  });
  cookie.set('refreshToken', data.refreshToken, {
    expires: daysToExpired,
  });
};

export const checkAuthStatus = (): boolean => {
  return !!cookie.get('accessToken');
};

export function getAccessToken(): string {
  return checkNullish(cookie.get('accessToken')) as string;
}
