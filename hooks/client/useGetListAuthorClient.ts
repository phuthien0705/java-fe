import { AUTHORS_CLIENT } from '../../constants/queryKeyName';
import { useQuery } from 'react-query';
import { getAllAuthorClient } from '../../apis/author.api';

const useGetListAuthorClient = () => {
  const getListQuery: any = useQuery(AUTHORS_CLIENT, getAllAuthorClient, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return getListQuery;
};

export default useGetListAuthorClient;
