import { getBookReviews } from '@/apis/review.api';
import { BOOK_REVIEW } from '@/constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListReview = (id: number, page: number, limit = 5) => {
  const getListQuery = useQuery(
    [BOOK_REVIEW, id],
    () => getBookReviews(id, page, limit),
    {
      refetchOnMount: true,
      enabled: !!id,
    }
  );

  return getListQuery;
};

export default useGetListReview;
