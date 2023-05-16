import { useEffect, useState } from 'react';
import ProductLayout from '@/layout/ProductLayot';
import { Box, Container, Paper } from '@mui/material';
import OrderTitle from '@/components/orders/OrderTitle';
import OrderTable from '@/components/orders/OrderTable';
import LinearProgress from '@mui/material/LinearProgress';
import { useMutation } from 'react-query';
import { getOrderOfClient } from '@/apis/order.api';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/useToast';
import { toggleSnackbar } from '@/store/snackbarReducer';

const OrdersHistory = () => {
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);

  const { mutate: fetchOrder, isLoading: isFetchingOrder } = useMutation(
    (data: { per_page: number; current_page: number }) =>
      getOrderOfClient(data),
    {
      onSuccess: (data: any) => {
        setData(data);
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình lấy đơn hàng',
        });
      },
    }
  );

  useEffect(() => {
    fetchOrder({ per_page: 10, current_page: page });
  }, [page]);

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
              items={data?.data || []}
              data={data}
            />
          )}
        </Box>
      </Container>
    </ProductLayout>
  );
};
export default OrdersHistory;
