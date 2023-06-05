import createSearchParams from '@/common/createSearchParams';
import httpRequest from '@/services/httpRequest';

export const getUserProfile = async () => {
  return httpRequest.get('/profile');
};
export const updateProfile = async (data: any) => {
  return httpRequest.post('/profile', data);
};
export const updatePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  return httpRequest.put('/profile/password', data);
};
export const getUserForAdmin = async (
  page: number,
  limit = 10,
  searchFields = [],
  value = ''
) => {
  return httpRequest.get(
    `/users?limit=${limit}&page=${page}${createSearchParams(
      searchFields,
      value
    )}`
  );
};
export const activeUser = async (data: any) => {
  return httpRequest.put('/users/activate', data);
};
export const unactiveUser = async (data: any) => {
  return httpRequest.put('/users/deactivate', data);
};
export const assignRole = async (data: any) => {
  return httpRequest.put('/users/assign-role', data);
};
export const removeRole = async (data: any) => {
  return httpRequest.put('/users/remove-role', data);
};
