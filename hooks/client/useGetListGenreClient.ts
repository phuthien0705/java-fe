import { getAllGenreClient } from '../../apis/genre.api';
import { GENRES_CLIENT } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListGenreClient = (enabled = true) => {
  const getListQuery: any = useQuery(GENRES_CLIENT, getAllGenreClient, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: enabled,
  });

  return getListQuery;
};

export default useGetListGenreClient;
