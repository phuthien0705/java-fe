import { getRecommendationHome } from '@/apis/recommendation.api';
import { RECOMMENDATION_HOME } from '@/constants/queryKeyName';
import { useQuery } from 'react-query';

export default function useGetRecommendationHome() {
  const queryReturn = useQuery({
    queryKey: [RECOMMENDATION_HOME],
    queryFn: getRecommendationHome,
    refetchOnMount: true,
  });

  return {
    queryReturn,
  };
}
