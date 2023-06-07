import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { Grid, Tabs, Tab } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SubmitCart from './SubmitCart';
import EmptyCart from './EmptyCart';
import ItemTab from './tabs/ItemTab';
import PaymentTab from './tabs/PaymentTab';
import useGetListAddress from '@/hooks/address/useGetListAddress';
import useGetListCart from '@/hooks/cart/useGetListCart';
import { useIntl } from 'react-intl';

interface ICartItemContent {
  payMethod: string;
  setMethod: Dispatch<SetStateAction<string>>;
}
const defaultContentValue: ICartItemContent = {
  payMethod: 'cash',
  setMethod: () => {},
};
export const CartItemContext =
  createContext<ICartItemContent>(defaultContentValue);

const CartItems: React.FunctionComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [payMethod, setMethod] = useState<string>('cash');
  const { data, isLoading, isFetching, refetch } = useGetListCart();
  const {
    data: listAddress,
    refetch: refetchAddress,
    isLoading: isLoadingListAddress,
  } = useGetListAddress();
  const intl = useIntl();
  const handleChange = (event: any, newValue: any) => {
    setCurrentIndex(newValue);
  };
  const cartContent = intl.formatMessage({ id: 'cart.title' });
  const paymentContent = intl.formatMessage({ id: 'cart.payment' });
  return (
    <CartItemContext.Provider value={{ payMethod, setMethod }}>
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
              label="Giỏ hàng"
              disabled={currentIndex !== 0}
            />

            <Tab
              icon={<AssignmentIcon />}
              label="Mua hàng"
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
            userId={data?.userId}
            items={data?.items ?? []}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            refetchListCart={refetch}
          />
        )}
      </Grid>
    </CartItemContext.Provider>
  );
};

export default CartItems;
