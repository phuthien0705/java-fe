import { IEachProductData } from '@/interfaces/compontents/product.interface';
import { getRelateBook } from '../../apis/product.api';
import { REALTED_BOOK } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetRelativeBook = (
  data: IEachProductData | undefined = undefined,
  enabled = true
) => {
  const getListQuery = useQuery(REALTED_BOOK, () => getRelateBook(data?.name), {
    refetchOnMount: true,
    keepPreviousData: true,
    enabled,
  });

  return getListQuery;
};

export default useGetRelativeBook;
