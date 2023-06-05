import { FC } from 'react';
import {
  Checkbox,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import QuantityButton from '../extended/Quantity';
import {
  IEachCartData,
  IItemTableMobile,
} from '@/interfaces/compontents/cart.interface';
import { moneyFormat } from '@/utils/moneyFormat';

const ImageStyle = styled('img')({
  borderRadius: 4,
  objectFit: 'contain',
  margin: '5px 0',
  width: '100px',
  height: '100px',
});

const ItemTableMobile: FC<IItemTableMobile> = ({
  items,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleDelete,
  checkItem,
  checkAllItem,
  clearCart,
  addressMode = false,
}) => {
  const theme = useTheme();
  return (
    <Paper sx={{ margin: '16px 16px 16px 0' }}>
      {' '}
      <Typography variant="h5">
        {!addressMode && (
          <>
            <Checkbox
              sx={{ height: 'fit-content' }}
              checked={
                items?.every(
                  (item: IEachCartData) => item.isChecked === true
                ) || false
              }
              onChange={() => {
                checkAllItem &&
                  checkAllItem({
                    isChecked: !items?.every(
                      (item: IEachCartData) => item?.isChecked == true
                    ),
                  });
              }}
            />{' '}
          </>
        )}
        {addressMode
          ? `Sản phẩm`
          : `Chọn tất cả (${items?.length || 0} sản phẩm)`}
        <Typography
          onClick={() => clearCart && clearCart()}
          component={'span'}
          sx={{
            color: 'red',
            cursor: 'pointer',
            display: items?.every((item: any) => item?.isChecked == true)
              ? 'inline-block'
              : 'none',
          }}
        >
          (Xóa)
        </Typography>
      </Typography>
      <Stack spacing={theme.spacing(4)}>
        {items.map(
          (item: IEachCartData) =>
            ((addressMode && item?.isChecked === true) || !addressMode) && (
              <Stack
                key={item.bookId}
                direction="row"
                alignItems={'flex-end'}
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems={'center'}>
                  {!addressMode && (
                    <Checkbox
                      sx={{ height: 'fit-content' }}
                      checked={item?.isChecked || false}
                      onChange={() => {
                        checkItem &&
                          checkItem({
                            bookId: item.bookId,
                            isChecked: !item?.isChecked,
                          });
                      }}
                    />
                  )}
                  <Stack direction={'row'} spacing={theme.spacing(2)}>
                    <ImageStyle alt={item.name} src={item.imageUrl} />
                    <Stack
                      direction="column"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <Typography fontSize="16px">{item.name}</Typography>
                      <Stack direction="column" spacing={1}>
                        <Typography
                          fontSize="14px"
                          fontWeight="bold"
                          color="#ee4d2d"
                        >
                          {moneyFormat(item.price)}
                        </Typography>
                        <QuantityButton
                          currentQuantity={item?.quantity}
                          handleIncreaseQuantity={() =>
                            handleIncreaseQuantity &&
                            handleIncreaseQuantity(item.bookId)
                          }
                          handleDecreaseQuantity={() =>
                            handleDecreaseQuantity &&
                            handleDecreaseQuantity(item.bookId)
                          }
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                {!addressMode && (
                  <IconButton
                    sx={{ padding: '0 0 2px 0' }}
                    size="small"
                    disableFocusRipple
                    disableRipple
                    onClick={() => handleDelete && handleDelete(item.bookId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Stack>
            )
        )}
      </Stack>
    </Paper>
  );
};

export default ItemTableMobile;
