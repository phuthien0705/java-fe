import httpRequest from '@/services/httpRequest';

export const addReview = async (data: any) => {
  return httpRequest.post('/reviews', data);
};
