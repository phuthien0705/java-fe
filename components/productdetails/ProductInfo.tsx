import { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import {
  Grid,
  Stack,
  Button,
  Typography,
  Rating,
  Box,
  Skeleton,
  useTheme,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { FormattedMessage, useIntl } from 'react-intl';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { IProductInfo } from '@/interfaces/compontents/product.interface';
import { CART_CLIENT } from '@/constants/queryKeyName';
import { moneyFormat } from '@/utils/moneyFormat';
import authService from '@/services/authService';
import { postAddToCart } from '@/apis/cart.api';

const ProductInfo: FC<IProductInfo> = ({ data, isLoading }) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );
  const intl = useIntl();
  const translateContent = {
    requiredLogin: intl.formatMessage({ id: 'requiredLogin' }),
    addToCartFailed: intl.formatMessage({ id: 'addToCartFailed' }),
    addToCartSuccess: intl.formatMessage({ id: 'addToCartSuccess' }),
  };
  const { mutate: addToCartFunc, isLoading: isLoadingAddToCart } = useMutation(
    () => postAddToCart({ bookId: data?.id, quantity: 1 }),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(CART_CLIENT);
        toast({
          type: 'success',
          message: translateContent.addToCartSuccess,
        });
      },
      onError: () => {
        toast({
          type: 'error',
          message: translateContent.addToCartFailed,
        });
      },
    }
  );
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: theme.spacing(1), md: theme.spacing(2) }}
      sx={{ pt: '0 !important', pr: '0 !important', pl: '0 !important' }}
    >
      <Box
        className="shadow"
        sx={{
          borderRadius: theme.spacing(1),
          py: theme.spacing(2),
          px: theme.spacing(2),
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '300px' },
            height: { xs: '100%', md: '100%' },
            borderRadius: '10px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {isLoading ? (
            <Skeleton variant="rectangular" height={'100%'} />
          ) : (
            <Image
              quality={75}
              width={300}
              height={400}
              src={data?.images[0]?.url || ''}
              alt={data?.name}
              style={{ borderRadius: '10px', objectFit: 'cover' }}
              referrerPolicy="no-referrer"
            />
          )}
        </Box>
      </Box>
      <Box className="shadow" sx={{ width: '100%', borderRadius: '8px' }}>
        <Grid
          container
          spacing={0}
          sx={{
            ml: { md: theme.spacing(4), xs: theme.spacing(4) },
            pb: theme.spacing(2),
            height: '100%',
            gap: 0,
          }}
        >
          <Grid
            item
            xs={11}
            sx={{
              px: { xs: 0, md: theme.spacing(1.5) },
              py: { xs: theme.spacing(1), md: theme.spacing(1.5) },
              mt: theme.spacing(2),
              alignSelf: 'flex-start',
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h3" fontSize="24px" fontWeight="500">
                {data?.name}
              </Typography>
              <Stack direction="row" spacing={theme.spacing(1)}>
                <Rating value={4.5} precision={0.5} readOnly />
              </Stack>
              <Typography
                sx={{ fontSize: '32px', color: '#000', fontWeight: 500 }}
              >
                {moneyFormat(data?.price || 0)}
              </Typography>
              <Box className="line-clamp-4">{data?.description}</Box>
            </Stack>
          </Grid>

          {/* Button */}
          <Grid
            item
            xs={12}
            sx={{
              px: { xs: 0, md: theme.spacing(1.5) },
              py: {
                xs: theme.spacing(1),
                md: theme.spacing(1.5),
                alignSelf: 'flex-end',
              },
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{
                display: 'flex',
                columnGap: theme.spacing(2),
                rowGap: theme.spacing(2),
              }}
            >
              <LoadingButton
                onClick={() => {
                  if (authService.isAuthenticated()) {
                    addToCartFunc();
                  } else {
                    toast({
                      type: 'info',
                      message: translateContent.requiredLogin,
                    });
                    router.push({ pathname: '/login' });
                  }
                }}
                loading={isLoadingAddToCart}
                variant="contained"
                color="secondary"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  columnGap: '8px',
                  width: { xs: 'fit-content', sm: 'inherit' },
                }}
              >
                <ShoppingCartOutlinedIcon />
                {<FormattedMessage id="product.addToCart" />}
              </LoadingButton>
              <Button
                variant="contained"
                sx={{ width: { xs: 'fit-content', sm: 'inherit' } }}
                onClick={() => {
                  if (authService.isAuthenticated()) {
                    router.push({ pathname: '/cart' });
                  } else {
                    toast({
                      type: 'info',
                      message: translateContent.requiredLogin,
                    });
                    router.push({ pathname: '/login' });
                  }
                }}
              >
                {<FormattedMessage id="product.buy" />}{' '}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default ProductInfo;
