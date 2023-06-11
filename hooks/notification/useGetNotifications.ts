import { useQuery } from 'react-query';
import { getNotifications } from '@/apis/notification.api';
import { NOTIFICATION } from '@/constants/queryKeyName';

export default function useGetNotifications(page: number, limit = 5) {
  const queryReturn = useQuery({
    queryKey: [NOTIFICATION],
    queryFn: () => getNotifications(page, limit),
    refetchOnMount: true,
  });

  return { queryReturn };
}
