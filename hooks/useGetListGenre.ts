import { getAllGenre } from '../apis/genre.api';
import { GENRES } from '../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListGenre = (
  page: number,
  limit = 10,
  searchFields = [],
  value = ''
) => {
  const getListQuery: any = useQuery(
    [GENRES],
    () => getAllGenre(page, limit, searchFields, value),
    {
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );

  return getListQuery;
};

export default useGetListGenre;
