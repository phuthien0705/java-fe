import { getAllBookClient } from '../../apis/product.api';
import { BOOKS_CLIENT } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListBookClient = (enabled = true) => {
  const getListQuery: any = useQuery(BOOKS_CLIENT, getAllBookClient, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: enabled,
  });

  return getListQuery;
};

export default useGetListBookClient;
