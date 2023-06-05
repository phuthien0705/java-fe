import { ICartResponse } from '@/interfaces/compontents/cart.interface';
import httpRequest from '@/services/httpRequest';

export const getCartItems = async () => {
  return httpRequest.get<ICartResponse>('/cart/get');
};

export const postAddToCart = async (data: {
  bookId: number;
  quantity: number;
}) => {
  return httpRequest.post('/cart/add-to-cart', data);
};

export const updateCart = async (data: {
  bookId: string;
  quantity: number;
}) => {
  return httpRequest.put('/cart/update', data);
};
export const clearCart = async () => {
  return httpRequest.put('/cart/clear', null);
};
export const removeFormCart = async (data: { bookId: string }) => {
  return httpRequest.put('/cart/remove', data);
};
export const addCheckedItem = async (data: {
  bookId: string;
  isChecked: boolean;
}) => {
  return httpRequest.put('/cart/checked-item', data);
};
export const addAllCheckedItem = async (data: { isChecked: boolean }) => {
  return httpRequest.put('/cart/checked-all-items', data);
};
