import httpRequest from '@/services/httpRequest';

export const getListProvinces = async () => {
  return httpRequest.get('/provinces');
};
export const getListProvinceCities = async (province: number | string) => {
  return httpRequest.get(`/provinces/${province}/cities`);
};
