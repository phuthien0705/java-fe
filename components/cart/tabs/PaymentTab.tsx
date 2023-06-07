import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  Stack,
  Button,
  FormControlLabel,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
} from '@mui/material';
import { IconBrandPaypal } from '@tabler/icons';
import useMediaQuery from '@mui/material/useMediaQuery';
import ItemTable from '../ItemTable';
import ItemTableMobile from '../ItemTableMobile';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { IPaymentTab } from '@/interfaces/compontents/cart.interface';
import AddressModal from '@/components/modals/AddressModal';
import LinearProgress from '@mui/material/LinearProgress';
import { IEachAddressOfUserData } from '@/interfaces/address.interface';
import { CartItemContext } from '../CartItems';

const PaymentTab: React.FunctionComponent<IPaymentTab> = ({
  data,
  listAddress,
  refetchAddress,
  isLoading,
}) => {
  const { payMethod, setMethod } = useContext(CartItemContext);
  const matches = useMediaQuery('(min-width:900px)');
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethod((event.target as HTMLInputElement).value);
  };
  const renderDefaultAddress = () => {
    const defaultAddress = (listAddress || []).find(
      (item: IEachAddressOfUserData) => item?.isDefault === true
    );
    if (!defaultAddress)
      return (
        <div>
          Chưa có địa chỉ{' '}
          <Typography
            color="primary"
            sx={{
              display: 'inline-block',
              cursor: 'pointer',
              ':hover': { textDecoration: 'underline' },
            }}
            onClick={() => setOpenAddressModal(true)}
          >
            Thêm địa chỉ tại đây
          </Typography>
        </div>
      );
    return (
      <Stack
        sx={{ width: '100%' }}
        direction={'row'}
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={2}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2 }}
          >
            <Stack direction="column" spacing={1} sx={{ width: 'fit-content' }}>
              <Typography sx={{ fontWeight: 500 }}>
                <b>Tên người nhận</b>: {defaultAddress?.name}
              </Typography>
              <Typography sx={{ fontWeight: 500 }}>
                <b>SDT</b>: {defaultAddress?.phone}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack
                direction="column"
                spacing={1}
                sx={{ width: 'fit-content' }}
              >
                <Typography sx={{ fontWeight: 500 }}>
                  <b>Địa chỉ</b>: {defaultAddress?.description}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button onClick={() => setOpenAddressModal(true)} sx={{ padding: 0 }}>
            Thay đổi
          </Button>
        </Stack>
      </Stack>
    );
  };
  return (
    <>
      <Stack spacing={2} sx={{ padding: 2, width: '100%' }}>
        <Stack direction="row" spacing={1} alignItems={'flex-end'}>
          <Typography
            sx={{ fontSize: '14px', lineHeight: '18px', color: '#000' }}
          >
            <BusinessIcon /> Địa chỉ nhận hàng
          </Typography>
        </Stack>

        {!isLoading ? (
          renderDefaultAddress()
        ) : (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
        <Stack direction="row" spacing={1} alignItems={'flex-end'}>
          <FormControl>
            <Typography
              sx={{ fontSize: '14px', lineHeight: '18px', color: '#000' }}
            >
              <AccountBalanceWalletIcon /> Hình thức thanh toán
            </Typography>
            <RadioGroup onChange={handleChange} value={payMethod}>
              <FormControlLabel
                value="cash"
                name="radio-buttons"
                control={<Radio />}
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <PaymentsIcon style={{ color: 'green' }} />
                    <p>Thanh toán tiền mặt khi nhận hàng</p>
                  </Stack>
                }
              />

              <FormControlLabel
                value="banking"
                name="radio-buttons"
                control={<Radio />}
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <AccountBalanceIcon style={{ color: 'blue' }} />
                    <p>Thanh toán chuyển khoản ngân hàng online</p>
                  </Stack>
                }
              />
              <FormControlLabel
                value="credit"
                name="radio-buttons"
                control={<Radio />}
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CreditCardIcon style={{ color: 'rgb(237, 95, 30)' }} />
                    <p>Thanh toán bằng thẻ Credit</p>
                  </Stack>
                }
              />
              <FormControlLabel
                value="paypal"
                name="radio-buttons"
                control={<Radio />}
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconBrandPaypal
                      size={26}
                      strokeWidth={2}
                      color={'#40a1bf'}
                    />

                    <p>Thanh toán với Paypal</p>
                  </Stack>
                }
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      </Stack>
      <Grid item xs={12}>
        {matches ? (
          <ItemTable items={data || []} addressMode={true} />
        ) : (
          <ItemTableMobile items={data || []} addressMode={true} />
        )}
      </Grid>
      <AddressModal
        open={openAddressModal}
        handleClose={() => {
          setOpenAddressModal(false);
        }}
        listAddress={listAddress ?? []}
        refetchAddress={refetchAddress}
      />
    </>
  );
};

export default PaymentTab;
