import { getOrderOfClient } from '@/apis/order.api';
import { useQuery } from 'react-query';
import { ORDERS } from '../../constants/queryKeyName';

const useGetListOrder = (page: number, limit = 10) => {
  const getListQuery: any = useQuery(
    [ORDERS],
    () => getOrderOfClient(page, limit),
    {
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );

  return getListQuery;
};

export default useGetListOrder;
