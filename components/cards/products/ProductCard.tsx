import { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Tooltip from '@mui/material/Tooltip';
import { makeStyles } from '@mui/styles';
import {
  Box,
  Card,
  CardContent,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import LoadingButton from '@mui/lab/LoadingButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ProductCardSkeleton from '../Skeleton/ProductCardSkelection';
import { IProductCard } from '@/interfaces/compontents/card.interface';
import { toggleSnackbar } from '@/store/snackbarReducer';
import authService from '@/services/authService';
import { CART_CLIENT } from '@/constants/queryKeyName';
import { useToast } from '@/hooks/useToast';
import { moneyFormat } from '@/utils/moneyFormat';
import { postAddToCart } from '@/apis/cart.api';

const useStyles = makeStyles({
  root: {
    '& .MuiCardMedia-root ': { cursor: 'pointer' },
    '& .MuiTypography-h5': { cursor: 'pointer' },
    maxHeight: '350px',
    height: '100%',
    border: '1px solid rgba(0,0,0,0.15)',
  },
  slide: {
    '& .MuiCardMedia-root ': { cursor: 'pointer' },
    '& .MuiTypography-h5': { cursor: 'pointer' },
    height: '252px',
  },
});

const ProductCard: React.FunctionComponent<IProductCard> = ({
  product,
  slideMode = false,
  isLoading = false,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClickItem = useCallback(() => {
    router.push({
      pathname: '/product/[pid]',
      query: { pid: product?.id },
    });
  }, [product, router]);
  const toast = useToast(dispatch, toggleSnackbar);
  const { mutate: addToCartFunc, isLoading: isLoadingAddToCart } = useMutation(
    () => postAddToCart({ bookId: product?.id, quantity: 1 }),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(CART_CLIENT);
        toast({
          type: 'success',
          message: 'Thêm sản phẩm thành công',
        });
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình thêm sản phẩm',
        });
      },
    }
  );

  const handleClickAddToCart = useCallback(() => {
    if (authService.isAuthenticated()) {
      addToCartFunc();
    } else {
      toast({
        type: 'info',
        message: 'Đăng nhập để thêm sản phẩm vào vỏ hàng',
      });
      router.push({ pathname: '/login' });
    }
  }, [addToCartFunc, router, toast]);

  if (isLoading) return <ProductCardSkeleton />;
  return (
    <Card className={slideMode ? classes.slide : classes.root}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: 200,
        }}
      >
        <Image
          style={{
            objectFit: 'contain',
            padding: '1rem 0',
            cursor: 'pointer',
            height: '200px',
          }}
          src={product?.images[0]?.url || '/img/product-not-found.png'}
          quality={75}
          width={150}
          height={slideMode ? 150 : 200}
          alt={product?.name}
          onClick={handleClickItem}
          referrerPolicy="no-referrer"
        />
      </Box>
      <CardContent sx={{ padding: 2, height: '100%' }}>
        <Stack spacing={1} direction="column" alignItems={'space-between'}>
          <Tooltip title={product?.name} placement="top">
            <Typography
              gutterBottom
              variant="h5"
              sx={{
                display: 'inline-block',
                margin: 0,
                fontSize: { xs: slideMode ? '12px' : '14px', sm: '14px' },
                height: '20px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              onClick={handleClickItem}
            >
              {product?.name}
            </Typography>
          </Tooltip>
          {!slideMode && (
            <>
              <Rating
                size="small"
                name="read-only"
                value={4.5}
                readOnly
                precision={0.5}
              />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  gutterBottom
                  fontWeight="bold"
                  component="div"
                  color="#000"
                  fontSize="16px"
                >
                  {moneyFormat(product?.price)}
                </Typography>
                <LoadingButton
                  loading={isLoadingAddToCart}
                  variant="contained"
                  sx={{ padding: 0, width: 'fit-content', minWidth: 0 }}
                  onClick={handleClickAddToCart}
                >
                  <ShoppingCartOutlinedIcon
                    fontSize="small"
                    sx={{ margin: '5px 10px' }}
                  />
                </LoadingButton>
              </Stack>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
