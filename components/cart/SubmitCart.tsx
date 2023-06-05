import { checkoutProduct } from '@/apis/checkout.api';
import {
  IEachCartData,
  ISubmitCart,
} from '@/interfaces/compontents/cart.interface';
import { Stack, Button, Container, Box, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { moneyFormat } from '@/utils/moneyFormat';
import useGetShippingCost from '@/hooks/address/useGetShippingCost';

const SubmitCart: React.FunctionComponent<ISubmitCart> = ({
  currentIndex,
  setCurrentIndex,
  items,
  refetchListCart,
}) => {
  const dispatch = useDispatch();

  const {
    queryReturn: { data },
  } = useGetShippingCost();

  const isUnCheckAll = items.every(
    (item: IEachCartData) => item.isChecked === false
  );

  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );

  const { mutate: checkoutFunc } = useMutation(() => checkoutProduct(), {
    onSuccess: () => {
      toast({ type: 'success', message: 'Mua hàng thành công' });
      setCurrentIndex(0);
      refetchListCart();
    },
    onError: () => {
      toast({
        type: 'error',
        message: 'Xãy ra lỗi trong quá tình mua hàng',
      });
    },
  });
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        padding: '16px',
        boxShadow:
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',

        '::before': {
          content: '""',
          position: 'absolute',
          top: '-1.25rem',
          left: 0,
          height: '1.25rem',
          width: '100%',
          background: 'linear-gradient(transparent,rgba(0,0,0,.06))',
        },
      }}
    >
      <Container maxWidth="md" disableGutters>
        <Stack
          direction="row"
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack>
            {!isUnCheckAll && (
              <Stack direction="row" spacing={2}>
                <Typography
                  sx={{ fontWeight: 600, fontSize: '16px', color: '#000' }}
                >
                  Phí vận chuyển:
                </Typography>
                <Typography
                  sx={{ fontWeight: 500, fontSize: '16px', color: '#000' }}
                >
                  {moneyFormat(data?.value ?? 0)}
                </Typography>
              </Stack>
            )}
            <Stack direction="row" spacing={2}>
              <Typography
                sx={{ fontWeight: 600, fontSize: '20px', color: '#000' }}
              >
                Tổng tiền:
              </Typography>
              <Typography
                sx={{ fontWeight: 500, fontSize: '20px', color: '#000' }}
              >
                {items
                  ? moneyFormat(
                      isUnCheckAll
                        ? 0
                        : items.reduce(
                            (prev: number, curr: IEachCartData) =>
                              curr.isChecked === true
                                ? Number(prev) +
                                  Number(curr.price) * Number(curr.quantity)
                                : Number(prev) + 0,
                            0
                          ) + (data?.value ?? 0)
                    )
                  : 0}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <Button
              sx={{ display: currentIndex === 0 ? 'none' : 'block' }}
              onClick={() => {
                setCurrentIndex((prev: any) => prev - 1);
              }}
            >
              Quay lại
            </Button>
            <Button
              disabled={items?.every((item: any) => item?.is_checked == false)}
              sx={{ width: 'fit-content' }}
              variant="contained"
              fullWidth
              onClick={() => {
                if (currentIndex === 0) {
                  setCurrentIndex((prev: any) => prev + 1);
                } else {
                  checkoutFunc();
                }
              }}
            >
              {currentIndex === 0 ? 'Tiếp theo' : 'Thanh toán'}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default SubmitCart;
