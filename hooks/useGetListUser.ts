import { getUserForAdmin } from '@/apis/user.api';
import { USER_ADMIN } from '@/constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListUser = (
  current_page: number,
  per_page = 10,
  searchFields = [],
  value = ''
) => {
  const getListQuery: any = useQuery(
    [USER_ADMIN, current_page],
    () => getUserForAdmin(current_page, per_page, searchFields, value),
    {
      refetchOnMount: true,
      keepPreviousData: true,
    }
  );
  return getListQuery;
};

export default useGetListUser;
