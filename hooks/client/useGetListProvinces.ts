import { LIST_CITY } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';
import { getListProvinces } from '@/apis/city.api';

const useGetListProvinces = () => {
  const getListQuery: any = useQuery(LIST_CITY, getListProvinces, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return getListQuery;
};

export default useGetListProvinces;
