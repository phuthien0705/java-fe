import httpRequest from '@/services/httpRequest';

export const getCartItems = async () => {
  return httpRequest.get('/cart/get');
};

export const addToCart = async (data: {
  book_id: number;
  quantity: number;
}) => {
  return httpRequest.post('/cart/add-to-cart', data);
};

export const updateCart = async (data: {
  book_id: number;
  quantity: number;
}) => {
  return httpRequest.put('/cart/update', data);
};
export const clearCart = async () => {
  return httpRequest.put('/cart/clear', null);
};
export const removeFormCart = async (data: { book_id: number }) => {
  return httpRequest.put('/cart/remove', data);
};
export const addCheckedItem = async (data: {
  book_id: number;
  is_checked: boolean;
}) => {
  return httpRequest.put('/cart/add-checked-item', data);
};
export const addAllCheckedItem = async (data: { is_checked: boolean }) => {
  return httpRequest.put('/cart/add-all-checked-item', data);
};
