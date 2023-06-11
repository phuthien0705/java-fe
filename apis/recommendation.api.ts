import { IEachProductData } from '@/interfaces/compontents/product.interface';
import httpRequest from '@/services/httpRequest';

export const getRecommendationHome = () => {
  return httpRequest.get<IEachProductData[]>(`/recommendations/home`);
};

export const getRecommendationRelatedBook = (id: number) => {
  return httpRequest.get<IEachProductData[]>(`/recommendations/books/${id}`);
};

export const postFindBookByImage = (data: any) => {
  return httpRequest.get<IEachProductData[]>(`/recommendations/image`, data);
};
