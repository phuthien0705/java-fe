import { useQuery } from 'react-query';
import { getTopSelling } from '@/apis/product.api';
import { TOP_SELLING } from '@/constants/queryKeyName';

const useGetTopSelling = () => {
  const getListQuery = useQuery(TOP_SELLING, () => getTopSelling(), {
    refetchOnWindowFocus: true,
  });

  return getListQuery;
};

export default useGetTopSelling;
