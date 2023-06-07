import {
  addAllCheckedItem,
  addCheckedItem,
  clearCart,
  removeFormCart,
  updateCart,
} from '@/apis/cart.api';
import { Grid, Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import ConfirmModal from '@/components/modals/ConfirmModal';
import ItemTable from '../ItemTable';
import ItemTableMobile from '../ItemTableMobile';
import useMediaQuery from '@mui/material/useMediaQuery';
import LinearProgress from '@mui/material/LinearProgress';
import { IEachCartData } from '@/interfaces/compontents/cart.interface';
import { toggleSnackbar } from '@/store/snackbarReducer';

const ItemTab: React.FunctionComponent<{
  data: IEachCartData[];
  refetch: () => void;
  isLoading: boolean;
  isFetching: boolean;
}> = ({ data, refetch, isLoading }) => {
  const matches = useMediaQuery('(min-width:900px)');
  const intl = useIntl();
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
  const serverFailedContent = intl.formatMessage({ id: 'cart.serverFailed' });
  const updateFailedContent = intl.formatMessage({ id: 'cart.updateFailed' });
  const cancelContent = intl.formatMessage({ id: 'cancel' });
  const confirmContent = intl.formatMessage({ id: 'confirm' });
  const deleteItemContent = intl.formatMessage({ id: 'cart.deleteItem' });
  const deleteAllItemContent = intl.formatMessage({ id: 'cart.deleteAllItem' });
  const deleteAllItemQuestionContent = intl.formatMessage({
    id: 'cart.deleteAllItemQuestion',
  });
  const deleteItemQuestionContent = intl.formatMessage({
    id: 'cart.deleteItemQuestion',
  });

  const { mutate: updateCartFunc } = useMutation(
    (data: { bookId: string; quantity: number }) => updateCart(data),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast({
          type: 'error',
          message: updateFailedContent,
        });
      },
    }
  );
  const { mutate: removeFunc } = useMutation(
    (data: { bookId: string }) => removeFormCart(data),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast({
          type: 'error',
          message: updateFailedContent,
        });
      },
    }
  );

  const { mutate: checkItemFunc } = useMutation(
    ({ bookId, isChecked }: { bookId: string; isChecked: boolean }) =>
      addCheckedItem({ bookId, isChecked }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast({
          type: 'error',
          message: serverFailedContent,
        });
      },
    }
  );
  const { mutate: checkAllItemFunc } = useMutation(
    ({ isChecked }: { isChecked: boolean }) => addAllCheckedItem({ isChecked }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: () => {
        toast({
          type: 'error',
          message: serverFailedContent,
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
        message: serverFailedContent,
      });
    },
  });
  const handleIncreaseQuantity = useCallback(
    (bookId: string) => {
      data?.forEach((item: IEachCartData) => {
        if (item?.bookId === bookId) {
          updateCartFunc({ bookId: bookId, quantity: item.quantity + 1 });
        }
      });
    },
    [data, updateCartFunc]
  );
  const handleDecreaseQuantity = useCallback(
    (bookId: string) => {
      const decreaseItem = data.find((item: any) => item.bookId === bookId);
      if (decreaseItem?.quantity === 1) {
        setShowConfirmModal(decreaseItem && decreaseItem?.bookId);
      } else {
        data.forEach((item: any) => {
          if (item?.bookId === bookId) {
            updateCartFunc({ bookId: bookId, quantity: item.quantity - 1 });
          }
        });
      }
    },
    [data, updateCartFunc]
  );
  const handleDelete = useCallback(
    (bookId: string) => {
      removeFunc({ bookId });
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
            items={data}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleDelete={handleDelete}
            checkItem={checkItemFunc}
            checkAllItem={checkAllItemFunc}
            clearCart={() => setShowConfirmClearCart(true)}
          />
        ) : (
          <ItemTableMobile
            items={data}
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
        contentHeader={deleteItemContent}
        textContent={deleteItemQuestionContent}
        confirmContent={confirmContent}
        cancelContent={cancelContent}
        handleClose={() => setShowConfirmModal(null)}
        handleConfirm={() => {
          handleDelete(showConfirmModal);
          setShowConfirmModal(null);
        }}
      />
      <ConfirmModal
        open={showConfirmClearCart}
        contentHeader={deleteAllItemContent}
        textContent={deleteAllItemQuestionContent}
        confirmContent={confirmContent}
        cancelContent={cancelContent}
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
