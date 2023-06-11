import { getListAddress } from '@/apis/address.api';
import { LIST_ADDRESS } from '@/constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListAddress = () => {
  const getListQuery = useQuery(LIST_ADDRESS, getListAddress);
  return getListQuery;
};

export default useGetListAddress;
