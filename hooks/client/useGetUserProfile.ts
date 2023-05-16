import { getUserProfile } from '@/apis/user.api';
import { USER_PROFILE } from '@/constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetUserProfile = () => {
  const getListQuery: any = useQuery(USER_PROFILE, getUserProfile, {
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return getListQuery;
};

export default useGetUserProfile;
