import { getAllUserOrder } from '../../apis/order.api';
import { ORDERS } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetOrderAllUser = (page: number, limit = 10) => {
  const getOrderAllUserQuery: any = useQuery(
    [ORDERS],
    () => getAllUserOrder(page, limit),
    {
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );

  return getOrderAllUserQuery;
};
export default useGetOrderAllUser;
