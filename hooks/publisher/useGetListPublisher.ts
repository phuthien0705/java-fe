import { getAllPublisher } from '../../apis/publisher.api';
import { PUBLISHERS } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListPublisher = (
  page: number,
  limit = 10,
  searchFields = [],
  value = ''
) => {
  const getListQuery: any = useQuery(
    [PUBLISHERS],
    () => getAllPublisher(page, limit, searchFields, value),
    {
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  return getListQuery;
};

export default useGetListPublisher;
