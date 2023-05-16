import createSearchParams from '@/common/createSearchParams';
import httpRequest from '../services/httpRequest';

export const getAllAuthor = async (
  page: number,
  limit = 10,
  searchFields = [],
  value = ''
) => {
  return httpRequest.get(
    `/authors?limit=${limit}&page=${page}${createSearchParams(
      searchFields,
      value
    )}`
  );
};
export const getAllAuthorClient = async () => {
  return httpRequest.get('/authors?limit=100');
};
export const editAuthor = async (
  id: string | number | undefined,
  data: { [key: string]: any }
) => {
  return httpRequest.put(`/authors/${id}`, data);
};
export const deleteAuthor = async (id: string | number | undefined) => {
  return httpRequest.delete(`/authors/${id}`);
};
export const createAuthor = async (data: { [key: string]: any }) => {
  return httpRequest.post('/authors', data);
};
