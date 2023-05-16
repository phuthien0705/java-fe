import { getAllDiscount } from '../apis/discount.api';
import { DISCOUNTS } from '../constants/queryKeyName';
import { useQuery } from 'react-query';

const useGetListDiscount = () => {
  const getListQuery: any = useQuery(DISCOUNTS, getAllDiscount, {
    refetchOnMount: true,
    keepPreviousData: true,
  });

  return getListQuery;
};

export default useGetListDiscount;
