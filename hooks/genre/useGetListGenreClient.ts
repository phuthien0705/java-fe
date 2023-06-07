import { useQuery } from 'react-query';
import { getAllGenreClient } from '../../apis/genre.api';
import { GENRES_CLIENT } from '../../constants/queryKeyName';

const useGetListGenreClient = (enabled = false) => {
  const getListQuery = useQuery(GENRES_CLIENT, getAllGenreClient, {
    refetchOnWindowFocus: false,
    enabled: enabled,
  });

  return getListQuery;
};

export default useGetListGenreClient;
