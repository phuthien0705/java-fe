import { getListBookByGenre } from '@/apis/product.api';
import { BOOK_GENRE } from '@/constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetBookByGenre = (id: any, slideToShow = 5, enabled = true) => {
  const getListQuery: any = useQuery(
    [BOOK_GENRE, id],
    () => getListBookByGenre(id, slideToShow),
    {
      refetchOnMount: true,
      keepPreviousData: true,
      enabled: enabled,
    }
  );

  return getListQuery;
};

export default useGetBookByGenre;
