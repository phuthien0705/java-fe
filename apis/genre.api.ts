import createSearchParams from '@/common/createSearchParams';
import httpRequest from '../services/httpRequest';

export const getAllGenre = async (
  page: number,
  limit = 10,
  searchFields = [],
  value = ''
) => {
  return httpRequest.get(
    `/genres?limit=${limit}&page=${page}${createSearchParams(
      searchFields,
      value
    )}`
  );
};
export const getAllGenreClient = async () => {
  return httpRequest.get('/genres?limit=100');
};
export const editGenre = async (
  id: string | number | undefined,
  data: { [key: string]: any }
) => {
  return httpRequest.put(`/genres/${id}`, data);
};
export const deleteGenre = async (id: string | number | undefined) => {
  return httpRequest.delete(`/genres/${id}`);
};
export const createGenre = async (data: { [key: string]: any }) => {
  return httpRequest.post('/genres', data);
};
