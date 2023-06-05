import createSearchParams from '@/common/createSearchParams';
import httpRequest from '../services/httpRequest';

export const getAllBook = async (
  page: number,
  limit = 10,
  searchFields = [],
  value = ''
) => {
  return httpRequest.get(
    `/books?limit=${limit}&page=${page}${createSearchParams(
      searchFields,
      value
    )}`
  );
};
export const getAllBookClient = async () => {
  return httpRequest.get('/books?per_page=100');
};
export const filterBook = async ({
  genres = '',
  publishers = '',
  price = '',
  sortBy = '',
  page = 1,
}: any) => {
  let params = '';
  if (genres) {
    if (params) params = params + '&genre=' + genres;
    else params = params + 'genre=' + genres;
  }
  if (publishers) {
    if (params) params = params + '&publisher=' + publishers;
    else params = params + 'publisher=' + publishers;
  }
  if (price) {
    if (params) params = params + '&price=' + price;
    else params = params + 'price=' + price;
  }
  if (sortBy) {
    if (params) params = params + '&sortBy=' + sortBy;
    else params = params + 'sortBy=' + sortBy;
  }
  if (params) params = '?' + params + '&limit=12&page=' + page;
  else params = '?limit=12';
  return httpRequest.get(`/books${params}`);
};
export const getBookDetailById = async (
  id: string | number | null | undefined
) => {
  return httpRequest.get(`books/${id}`);
};
export const editBook = async (
  id: string | number | undefined,
  data: FormData | any
) => {
  return httpRequest.put(`/books/${id}`, data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};
export const deleteBook = async (id: string | number | undefined) => {
  return httpRequest.delete(`/books/${id}`);
};
export const createBook = async (data: FormData | any) => {
  return httpRequest.post('/books', data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const getTopSelling = async () => {
  return httpRequest.get(`/books?limit=5&page=1&sortBy=createdAt`);
};

export const getRelateBook = async (genres = '') => {
  if (genres) return httpRequest.get(`/books?limit=10&page=1&genres=${genres}`);
  return httpRequest.get(`/books?limit=10&page=1`);
};

export const getListBookByGenre = async (genresid: any, slideToShow = 5) => {
  return httpRequest.get(
    `/books?limit=${slideToShow}&page=1&genres=${genresid}`
  );
};
