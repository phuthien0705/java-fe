import httpRequest from '@/services/httpRequest';

export const getListCity = async () => {
  return httpRequest.get('/cities/province');
};
export const getListDistrict = async (province: number | string) => {
  return httpRequest.get(`/cities/province/${province}`);
};
