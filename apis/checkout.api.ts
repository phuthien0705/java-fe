import httpRequest from '@/services/httpRequest';
import { EProcessPayment } from '@/constants/processPayment';

export const makeOrder = async (
  userId: number | undefined,
  paymentDetails: { type: EProcessPayment; discountCode: string }
) => {
  return httpRequest.post('/orders/payment', paymentDetails);
};
