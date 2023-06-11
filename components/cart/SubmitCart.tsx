import { useCallback, useContext } from 'react';
import { Stack, Button, Container, Box, Typography } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { makeOrder } from '@/apis/checkout.api';
import {
  IEachCartData,
  ISubmitCart,
} from '@/interfaces/compontents/cart.interface';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { moneyFormat } from '@/utils/moneyFormat';
import useGetShippingCost from '@/hooks/address/useGetShippingCost';
import { CartItemContext } from './CartItems';
import { EProcessPayment } from '@/constants/processPayment';
import { CART_CLIENT, SHIPPING_COST } from '@/constants/queryKeyName';

const payMethodMaping = (method: string): { EMethod: EProcessPayment } => {
  switch (method) {
    case 'credit':
      return {
        EMethod: EProcessPayment.CREDIT_CARD,
      };
    case 'banking':
      return {
        EMethod: EProcessPayment.ONLINE_BANKING,
      };
    case 'cash':
      return {
        EMethod: EProcessPayment.CASH_ON_DELIVERY,
      };
    case 'paypal':
      return {
        EMethod: EProcessPayment.PAYPAL,
      };
    default:
      return {
        EMethod: EProcessPayment.CASH_ON_DELIVERY,
      };
  }
};

const SubmitCart: React.FunctionComponent<ISubmitCart> = ({
  userId,
  currentIndex,
  setCurrentIndex,
  items,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { payMethod, setMethod } = useContext(CartItemContext);
  const {
    queryReturn: { data: shippingCost },
  } = useGetShippingCost();

  const isUnCheckAll = items.every(
    (item: IEachCartData) => item.checked === false
  );

  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );
  const paymentDetails = {
    discountCode: 'none',
    type: EProcessPayment.CASH_ON_DELIVERY,
  };
  paymentDetails.type = payMethodMaping(payMethod).EMethod;
  const { mutate: makeOrderFunc } = useMutation(
    () => makeOrder(userId, paymentDetails),
    {
      onSuccess: () => {
        toast({ type: 'success', message: 'Mua hàng thành công' });
        setCurrentIndex(0);
        queryClient.refetchQueries([SHIPPING_COST]);
        queryClient.refetchQueries([CART_CLIENT]);
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xãy ra lỗi trong quá tình mua hàng',
        });
      },
    }
  );
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
            {!isUnCheckAll && currentIndex !== 0 && (
              <Stack direction="row" spacing={2}>
                <Typography
                  sx={{ fontWeight: 600, fontSize: '16px', color: '#000' }}
                >
                  Phí vận chuyển:
                </Typography>
                <Typography
                  sx={{ fontWeight: 500, fontSize: '16px', color: '#000' }}
                >
                  {moneyFormat(shippingCost ?? 0)}
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
                              curr.checked === true
                                ? Number(prev) +
                                  Number(curr.price) * Number(curr.quantity)
                                : Number(prev) + 0,
                            0
                          ) + (currentIndex === 0 ? 0 : shippingCost ?? 0)
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
              disabled={items?.every((item: any) => item?.checked == false)}
              sx={{ width: 'fit-content' }}
              variant="contained"
              fullWidth
              onClick={(e) => {
                if (currentIndex === 0) {
                  setCurrentIndex((prev: any) => prev + 1);
                } else if (payMethod === 'cash') {
                  makeOrderFunc();
                } else if (payMethod === 'credit') {
                  makeOrderFunc();
                  e.preventDefault();
                } else if (payMethod === 'banking') {
                  //router to credit
                  makeOrderFunc();
                } else if (payMethod === 'paypal') {
                  //router to credit
                  makeOrderFunc();
                }
              }}
            >
              {currentIndex === 0 ? 'Tiếp theo' : 'Đặt hàng'}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default SubmitCart;
