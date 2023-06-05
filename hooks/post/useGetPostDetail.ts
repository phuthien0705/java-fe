import { useQuery } from 'react-query';
import { getPostDetail } from '@/apis/post.api';
import { POST_DETAIL } from '@/constants/queryKeyName';

export default function useGetPostDetail(
  postId: string | string[] | undefined
) {
  const queryReturn = useQuery({
    queryKey: [POST_DETAIL, postId],
    queryFn: getPostDetail,
    enabled: !!postId,
    refetchOnMount: true,
  });

  return { queryReturn };
}
