import createSearchParams from '@/common/createSearchParams';
import httpRequest from '../services/httpRequest';

export const getAllPublisher = async (
  page: number,
  limit = 10,
  searchFields = [],
  value = ''
) => {
  return httpRequest.get(
    `/publishers?limit=${limit}&page=${page}${createSearchParams(
      searchFields,
      value
    )}`
  );
};
export const getAllPublisherClient = async () => {
  return httpRequest.get('/publishers?limit=100&page=1');
};
export const editPublisher = async (
  id: string | number | undefined,
  data: { [key: string]: any }
) => {
  return httpRequest.put(`/publishers/${id}`, data);
};
export const deletePublisher = async (id: string | number | undefined) => {
  return httpRequest.delete(`/publishers/${id}`);
};
export const createPublisher = async (data: { [key: string]: any }) => {
  return httpRequest.post('/publishers', data);
};
