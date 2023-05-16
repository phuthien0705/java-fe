import { LIST_CITY } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';
import { getListCity } from '@/apis/city.api';

const useGetListCity = () => {
  const getListQuery: any = useQuery(LIST_CITY, getListCity, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return getListQuery;
};

export default useGetListCity;
