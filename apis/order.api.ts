import httpRequest from '../services/httpRequest';

export const getOrderOfClient = async ({
  per_page,
  current_page,
}: {
  per_page: number;
  current_page: number;
}) => {
  return httpRequest.get(`/orders?per_page=${per_page}&page=${current_page}`);
};
