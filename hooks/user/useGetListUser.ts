import { getUserForAdmin } from '@/apis/user.api';
import { USER_ADMIN } from '@/constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListUser = (
  page: number,
  limit = 10,
  searchFields = [],
  value = ''
) => {
  const getListQuery: any = useQuery(
    [USER_ADMIN, page],
    () => getUserForAdmin(page, limit, searchFields, value),
    {
      refetchOnMount: true,
      keepPreviousData: true,
    }
  );
  return getListQuery;
};

export default useGetListUser;
