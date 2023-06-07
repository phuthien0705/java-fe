import createSearchParams from '@/common/createSearchParams';
import httpRequest from '../services/httpRequest';
import { IPaginationResponse } from '@/interfaces/general.interface';
import { IEachGenreData } from '@/interfaces/genre.interface';

export const getAllGenre = async (
  page: number,
  limit = 10,
  searchFields = [],
  value = ''
) => {
  return httpRequest.get<IPaginationResponse<IEachGenreData>>(
    `/genres?limit=${limit}&page=${page}${createSearchParams(
      searchFields,
      value
    )}`
  );
};
export const getAllGenreClient = async () => {
  return httpRequest.get<IPaginationResponse<IEachGenreData>>(
    '/genres?limit=100'
  );
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
