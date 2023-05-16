import {
  addAllCheckedItem,
  addCheckedItem,
  clearCart,
  removeFormCart,
  updateCart,
} from '@/apis/cart.api';
import ConfirmModal from '@/components/modals/ConfirmModal';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { Grid, Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import ItemTable from '../ItemTable';
import ItemTableMobile from '../ItemTableMobile';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinearProgress from '@mui/material/LinearProgress';

const ItemTab: React.FunctionComponent<{
  data: any;
  refetch: () => void;
  isLoading: boolean;
  isFetching: boolean;
}> = ({ data, refetch, isLoading, isFetching }) => {
  const matches = useMediaQuery('(min-width:900px)');

  const [showConfirmModal, setShowConfirmModal] = useState<any>(null);
  const [showConfirmClearCart, setShowConfirmClearCart] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );
  const { mutate: updateCartFunc, isLoading: isUpdating } = useMutation(
    (data: { book_id: number; quantity: number }) => updateCart(data),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình cập nhật sản phẩm',
        });
      },
    }
  );
  const { mutate: removeFunc, isLoading: isRemoving } = useMutation(
    (data: { book_id: number }) => removeFormCart(data),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình cập nhật sản phẩm',
        });
      },
    }
  );

  const { mutate: checkItemFunc, isLoading: isCheckingItem } = useMutation(
    ({ book_id, is_checked }: { book_id: number; is_checked: boolean }) =>
      addCheckedItem({ book_id, is_checked }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Máy chủ đang bận xin vui lòng thử lại sau',
        });
      },
    }
  );
  const { mutate: checkAllItemFunc } = useMutation(
    ({ is_checked }: { is_checked: boolean }) =>
      addAllCheckedItem({ is_checked }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Máy chủ đang bận xin vui lòng thử lại sau',
        });
      },
    }
  );
  const { mutate: clearCartFunc } = useMutation(clearCart, {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      toast({
        type: 'error',
        message: 'Máy chủ đang bận xin vui lòng thử lại sau',
      });
    },
  });
  const handleIncreaseQuantity = useCallback(
    (book_id: number) => {
      data?.forEach((item: any) => {
        if (item?.book_id === book_id) {
          updateCartFunc({ book_id: book_id, quantity: item.quantity + 1 });
        }
      });
    },
    [data, updateCartFunc]
  );
  const handleDecreaseQuantity = useCallback(
    (book_id: number) => {
      const decreaseItem = data.find((item: any) => item.book_id === book_id);
      if (decreaseItem?.quantity === 1) {
        setShowConfirmModal(decreaseItem && decreaseItem?.book_id);
      } else {
        data.forEach((item: any) => {
          if (item?.book_id === book_id) {
            updateCartFunc({ book_id: book_id, quantity: item.quantity - 1 });
          }
        });
      }
    },
    [data, updateCartFunc]
  );
  const handleDelete = useCallback(
    (book_id: number) => {
      removeFunc({ book_id: book_id });
    },
    [removeFunc]
  );
  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }
  return (
    <>
      <Grid item xs={12}>
        {matches ? (
          <ItemTable
            items={data || []}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleDelete={handleDelete}
            checkItem={checkItemFunc}
            checkAllItem={checkAllItemFunc}
            clearCart={() => setShowConfirmClearCart(true)}
          />
        ) : (
          <ItemTableMobile
            items={data || []}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleDelete={handleDelete}
            checkItem={checkItemFunc}
            checkAllItem={checkAllItemFunc}
            clearCart={() => setShowConfirmClearCart(true)}
          />
        )}
      </Grid>

      <ConfirmModal
        open={showConfirmModal !== null}
        contentHeader="Xóa sản phẩm"
        textContent="Bạn có muốn xóa sản phẩm đang chọn?"
        confirmContent="Xác nhận"
        cancelContent="Hủy"
        handleClose={() => setShowConfirmModal(null)}
        handleConfirm={() => {
          handleDelete(showConfirmModal);
          setShowConfirmModal(null);
        }}
      />
      <ConfirmModal
        open={showConfirmClearCart}
        contentHeader="Xóa tất cả sản phẩm"
        textContent="Bạn có muốn xóa tất cả sản phẩm đang chọn?"
        confirmContent="Xác nhận"
        cancelContent="Hủy"
        handleClose={() => setShowConfirmClearCart(false)}
        handleConfirm={() => {
          clearCartFunc();
          setShowConfirmClearCart(false);
        }}
      />
    </>
  );
};

export default ItemTab;
