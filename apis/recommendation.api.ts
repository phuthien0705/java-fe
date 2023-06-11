import { IEachProductData } from '@/interfaces/compontents/product.interface';
import httpRequest from '@/services/httpRequest';

export const getRecommendationHome = () => {
  return httpRequest.get<IEachProductData[]>(`/recommendations/home`);
};
