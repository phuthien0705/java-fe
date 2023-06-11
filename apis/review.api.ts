import { IPaginationResponse } from '@/interfaces/general.interface';
import { IEachReviewData } from '@/interfaces/review.interface';
import httpRequest from '@/services/httpRequest';

export const addReview = async (data: any) => {
  return httpRequest.post('/reviews', data);
};
export const getBookReviews = async (
  bookId: number,
  page: number,
  limit: number
) => {
  return httpRequest.get<IPaginationResponse<IEachReviewData>>(
    `/reviews/books/${bookId}?limit=${limit}&page=${page}`
  );
};
