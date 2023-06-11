import { getRecommendationRelatedBook } from '@/apis/recommendation.api';
import { RECOMMENDATION_RELATED_BOOK } from '@/constants/queryKeyName';
import { useQuery } from 'react-query';

export default function useGetRecommendationRelatedBook(id: number | null) {
  const queryReturn = useQuery({
    queryKey: [RECOMMENDATION_RELATED_BOOK, id],
    queryFn: () => getRecommendationRelatedBook(id ?? 0),
    enabled: !!id,
  });
  return { queryReturn };
}
