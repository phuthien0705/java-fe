import { getAllBook } from '../../apis/product.api';
import { BOOKS } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListBook = (
  page: number,
  limit = 10,
  searchFields = [],
  value = ''
) => {
  const getListQuery: any = useQuery(
    [BOOKS],
    () => getAllBook(page, limit, searchFields, value),
    {
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );

  return getListQuery;
};

export default useGetListBook;
