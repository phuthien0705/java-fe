import {
  IEachAddressOfUserData,
  IShippingCostResponse,
} from '@/interfaces/address.interface';
import { IPaginationResponse } from '@/interfaces/general.interface';
import httpRequest from '@/services/httpRequest';

export const getListAddress = async () => {
  return httpRequest.get<IPaginationResponse<IEachAddressOfUserData>>(
    '/addresses'
  );
};
export const addAddress = async (data: any) => {
  return httpRequest.post('/addresses', data);
};
export const deleteAddress = async (id: number | string) => {
  return httpRequest.delete(`/addresses/${id}`);
};
export const setDefaultAddress = async (id: number, isDefault: boolean) => {
  return httpRequest.put(`/addresses/${id}`, { default: isDefault });
};
export const getDetailAddress = async (id: number) => {
  return httpRequest.get(`/addresses/${id}`);
};
export const updateAddress = async (id: string | number, data: any) => {
  return httpRequest.put(`/addresses/${id}`, data);
};
export const getShippingCost = () => {
  return httpRequest.get<IShippingCostResponse>(`/addresses/shipping-cost`);
};
