import { useState } from 'react';
import { useQuery } from 'react-query';
import { POST } from '@/constants/queryKeyName';
import { getListPost } from '@/apis/post.api';

export default function useGetListPost() {
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const queryReturn = useQuery({
    queryKey: [POST],
    queryFn: () => getListPost({ page, limit }),
    refetchOnMount: true,
  });

  return { queryReturn, page, setPage };
}
