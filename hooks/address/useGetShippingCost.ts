import { getShippingCost } from '@/apis/address.api';
import { SHIPPING_COST } from '@/constants/queryKeyName';
import { useQuery } from 'react-query';

export default function useGetShippingCost() {
  const queryReturn = useQuery({
    queryKey: [SHIPPING_COST],
    queryFn: getShippingCost,
    refetchOnMount: true,
  });

  return { queryReturn };
}
