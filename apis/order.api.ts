import { EProcessPayment } from '@/constants/processPayment';
import httpRequest from '../services/httpRequest';

export const getOrderOfClient = async (page: number, limit = 10) => {
  return httpRequest.get(`/orders?limit=${limit}&page=${page}`);
};

export const postProcessOrder = ({
  type = EProcessPayment.CASH_ON_DELIVERY,
}: {
  type: EProcessPayment;
}) => {
  return httpRequest.post(`/orders/payment`, { type });
};

export const getAllUserOrder = async (page = 1, limit = 10) => {
  return httpRequest.get(`/orders/all?limit=${limit}&page=${page}`);
};
