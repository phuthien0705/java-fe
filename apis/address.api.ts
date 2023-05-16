import httpRequest from '@/services/httpRequest';

export const getListAddress = async () => {
  return httpRequest.get('/addresses');
};
export const addAddress = async (data: any) => {
  return httpRequest.post('/addresses', data);
};
export const deleteAddress = async (id: number | string) => {
  return httpRequest.delete(`/addresses/${id}`);
};
export const setDefaultAddress = async (id: string | number) => {
  return httpRequest.put(`/addresses/set-default/${id}`, null);
};
export const getDetailAddress = async (id: number) => {
  return httpRequest.get(`/addresses/${id}`);
};
export const updateAddress = async (id: string | number, data: any) => {
  return httpRequest.put(`/addresses/${id}`, data);
};
