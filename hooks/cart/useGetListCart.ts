import { CART_CLIENT } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';
import { getCartItems } from '@/apis/cart.api';

const useGetListCart = () => {
  const getListQuery = useQuery(CART_CLIENT, getCartItems, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return getListQuery;
};

export default useGetListCart;
