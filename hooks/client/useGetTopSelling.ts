import { getTopSelling } from '@/apis/product.api';
import { TOP_SELLING } from '@/constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetTopSelling = () => {
  const getListQuery: any = useQuery(TOP_SELLING, () => getTopSelling(), {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return getListQuery;
};

export default useGetTopSelling;
