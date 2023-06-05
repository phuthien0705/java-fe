import httpRequest from '@/services/httpRequest';

export const login = async (data: any) => {
  return httpRequest.post('/auth/login', data);
};
export const register = async (data: any) => {
  return httpRequest.post('/auth/register', data);
};
export const forgotPassword = async (data: any) => {
  return httpRequest.post('/auth/forgot-password', data);
};
export const verifyEmail = async (param: any) => {
  return httpRequest.post('/auth/verify-email' + param, null);
};
export const reSendVerifyEmail = async () => {
  return httpRequest.post('/auth/send-verification-email', null);
};
export const resetPassword = async (
  params: string,
  data: {
    password: string;
  }
) => {
  return httpRequest.post(`/auth/reset-password${params}`, data);
};
export const postLoginGoogle = (data: { accessToken: string }) => {
  return httpRequest.post('/auth/google', data);
};
