import httpRequest from '@/services/httpRequest';

export const getAllDiscount = async () => {
  return httpRequest.get('/admin/discounts');
};
export const editDiscount = async (
  id: string | number | undefined,
  data: { [key: string]: any }
) => {
  return httpRequest.put(`/admin/discounts/${id}`, data);
};
export const deleteDiscount = async (id: string | number | undefined) => {
  return httpRequest.delete(`/admin/discounts/${id}`);
};
export const createDiscount = async (data: { [key: string]: any }) => {
  return httpRequest.post('/admin/discounts', data);
};
