import { getBookDetailById } from '../../apis/product.api';
import { BOOK_DETAIL } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListBookDetail = (id: string | number | null, enabled: boolean) => {
  const getListQuery: any = useQuery(
    [BOOK_DETAIL, id],
    () => getBookDetailById(id),
    {
      refetchOnMount: true,
      keepPreviousData: true,
      enabled,
    }
  );

  return getListQuery;
};

export default useGetListBookDetail;
