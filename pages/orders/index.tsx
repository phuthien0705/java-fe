import { useEffect, useState, useCallback } from 'react';
import ProductLayout from '@/layout/ProductLayot';
import { Box, Container, Paper } from '@mui/material';
import OrderTitle from '@/components/orders/OrderTitle';
import OrderTable from '@/components/orders/OrderTable';
import LinearProgress from '@mui/material/LinearProgress';
import { useMutation, useQueryClient } from 'react-query';
import useGetListOrder from '@/hooks/client/useGetListOrder';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { ORDERS } from '@/constants/queryKeyName';
import { string } from 'yup';

const OrdersHistory = () => {
  // const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);

  const queryClient = useQueryClient();

  const { data, refetch } = useGetListOrder(page, 10);
  const dispatch = useDispatch();
  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );

  const { isLoading: isFetchingOrder } = useMutation({
    onSuccess: () => {
      // setData(data);
      queryClient.invalidateQueries(ORDERS);
    },
    onError: () => {
      toast({
        type: 'error',
        message: 'Xảy ra lỗi trong quá trình lấy đơn hàng',
      });
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, page]);

  return (
    <ProductLayout>
      <Container maxWidth="md" disableGutters>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Paper
            className="shadow"
            sx={{
              backgroundColor: '#fff',
              px: { xs: 1.5, md: 2 },
              py: { xs: 2, md: 2 },
              mb: { xs: 1, md: 2 },
            }}
          >
            <OrderTitle />
          </Paper>
          {isFetchingOrder ? (
            <LinearProgress />
          ) : (
            <OrderTable
              page={page}
              setPage={setPage}
              items={data?.datas || []}
              data={data}
            />
          )}
        </Box>
      </Container>
    </ProductLayout>
  );
};
export default OrdersHistory;
