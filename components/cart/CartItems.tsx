import { Grid, Tabs, Tab } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PaymentIcon from '@mui/icons-material/Payment';
import SubmitCart from './SubmitCart';
import EmptyCart from './EmptyCart';
import useGetListCart from '@/hooks/client/useGetListCart';
import { useQueryClient } from 'react-query';

import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import useGetListAddress from '@/hooks/client/useGetListAddress';
import ItemTab from './tabs/ItemTab';
import PaymentTab from './tabs/PaymentTab';

const CartItems: React.FunctionComponent = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading, isFetching, refetch } = useGetListCart();
  const {
    data: listAddress,
    isLoading: isListAddressLoading,
    isFetching: isListAddressFetching,
    refetch: refetchAddress,
  } = useGetListAddress();
  const handleChange = (event: any, newValue: any) => {
    setCurrentIndex(newValue);
  };
  return (
    <>
      <Grid container sx={{ paddingBottom: '60px', position: 'relative' }}>
        <Grid item xs={12}>
          <Tabs
            value={currentIndex}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
          >
            <Tab
              icon={<ShoppingCartIcon />}
              label="Giỏ"
              disabled={currentIndex !== 0}
            />

            <Tab
              icon={<PaymentIcon />}
              label="Thanh toán"
              disabled={currentIndex !== 1}
            />
          </Tabs>
        </Grid>

        {/* tab items in cart */}
        {currentIndex === 0 && (
          <ItemTab
            data={data}
            refetch={refetch}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        )}
        {/* tab payment */}
        {currentIndex === 1 && (
          <PaymentTab
            data={data}
            listAddress={listAddress}
            refetchAddress={refetchAddress}
          />
        )}

        {/* empty screen */}
        {data && data?.length === 0 && (
          <Grid item xs={12} sx={{ p: 30 }}>
            <EmptyCart />
          </Grid>
        )}

        {data && data?.length !== 0 && (
          <SubmitCart
            items={data || []}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            listAddress={listAddress?.data}
            refetchListCart={refetch}
          />
        )}
      </Grid>
    </>
  );
};

export default CartItems;
