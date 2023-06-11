import { IEachReviewData } from '@/interfaces/review.interface';
import httpRequest from '@/services/httpRequest';

export const addReview = async (data: {
  bookId: number;
  content: string;
  rating: number;
}) => {
  return httpRequest.post('/reviews', data);
};
export const getBookReviews = async (
  bookId: number,
  page: number,
  limit: number
) => {
  return httpRequest.get<IEachReviewData[]>(
    `/reviews/books/${bookId}?limit=${limit}&page=${page}`
  );
};
