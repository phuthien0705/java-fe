import { getListAddress } from '@/apis/address.api';
import { LIST_ADDRESS } from '@/constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListAddress = () => {
  const getListQuery: any = useQuery(LIST_ADDRESS, getListAddress, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return getListQuery;
};

export default useGetListAddress;
