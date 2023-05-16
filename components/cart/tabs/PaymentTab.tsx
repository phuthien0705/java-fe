import { useEffect, useState } from 'react';
import { Grid, Typography, Box, Stack, Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import ItemTable from '../ItemTable';
import ItemTableMobile from '../ItemTableMobile';
import BusinessIcon from '@mui/icons-material/Business';
import { IPaymentTab } from '@/interfaces/compontents/cart.interface';
import AddressModal from '@/components/modals/AddressModal';
import LinearProgress from '@mui/material/LinearProgress';

const PaymentTab: React.FunctionComponent<IPaymentTab> = ({
  data,
  listAddress,
  refetchAddress,
}) => {
  const matches = useMediaQuery('(min-width:900px)');
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false);

  const renderDefaultAddress = () => {
    const defaultAddress = (listAddress?.data || []).find(
      (item: any) => item?.is_default === 1
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
          <Stack direction="column" spacing={1} sx={{ width: 'fit-content' }}>
            <Typography sx={{ fontWeight: 700 }}>
              {defaultAddress?.name}
            </Typography>
            <Typography sx={{ fontWeight: 700 }}>
              {defaultAddress?.phone}
            </Typography>
          </Stack>
          <Typography>{defaultAddress?.description}</Typography>
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
          <BusinessIcon />
          <Typography
            sx={{ fontSize: '14px', lineHeight: '18px', color: '#000' }}
          >
            Địa chỉ nhận hàng
          </Typography>
        </Stack>
        {listAddress?.data ? (
          renderDefaultAddress()
        ) : (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
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
        listAddress={listAddress?.data}
        refetchAddress={refetchAddress}
      />
    </>
  );
};

export default PaymentTab;
