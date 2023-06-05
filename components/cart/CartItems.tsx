import { useState } from 'react';
import { Grid, Tabs, Tab } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import SubmitCart from './SubmitCart';
import EmptyCart from './EmptyCart';
import ItemTab from './tabs/ItemTab';
import PaymentTab from './tabs/PaymentTab';
import useGetListAddress from '@/hooks/address/useGetListAddress';
import useGetListCart from '@/hooks/cart/useGetListCart';

const CartItems: React.FunctionComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading, isFetching, refetch } = useGetListCart();
  const {
    data: listAddress,
    refetch: refetchAddress,
    isLoading: isLoadingListAddress,
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
            data={data?.items ?? []}
            refetch={refetch}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        )}
        {/* tab payment */}
        {currentIndex === 1 && (
          <PaymentTab
            data={data?.items ?? []}
            listAddress={listAddress ?? []}
            refetchAddress={refetchAddress}
            isLoading={isLoadingListAddress}
          />
        )}

        {/* empty screen */}
        {data?.items && data.items?.length === 0 && (
          <Grid item xs={12} sx={{ p: 30 }}>
            <EmptyCart />
          </Grid>
        )}

        {data?.items && data.items?.length !== 0 && (
          <SubmitCart
            items={data?.items ?? []}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            refetchListCart={refetch}
          />
        )}
      </Grid>
    </>
  );
};

export default CartItems;
