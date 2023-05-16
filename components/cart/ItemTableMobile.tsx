import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import QuantityButton from '../extended/Quantity';
import { FC } from 'react';
import { IItemTableMobile } from '@/interfaces/compontents/cart.interface';
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
  return (
    <Paper sx={{ margin: '16px 16px 16px 0' }}>
      {' '}
      <Typography variant="h5">
        {!addressMode && (
          <>
            <Checkbox
              sx={{ height: 'fit-content' }}
              checked={
                items?.every((item: any) => item?.is_checked == true) || false
              }
              onChange={() => {
                checkAllItem &&
                  checkAllItem({
                    is_checked: !items?.every(
                      (item: any) => item?.is_checked == true
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
            display: items?.every((item: any) => item?.is_checked == true)
              ? 'inline-block'
              : 'none',
          }}
        >
          (Xóa)
        </Typography>
      </Typography>
      {items.map(
        (item: any, _index: number) =>
          ((addressMode && item?.is_checked === 1) || !addressMode) && (
            <Stack
              key={_index}
              direction="row"
              alignItems={'flex-end'}
              justifyContent="space-between"
              mt={2}
              mb={2}
            >
              <Stack direction="row" alignItems={'center'}>
                {!addressMode && (
                  <Checkbox
                    sx={{ height: 'fit-content' }}
                    checked={item?.is_checked || false}
                    onChange={() => {
                      checkItem &&
                        checkItem({
                          book_id: item?.book?.id,
                          is_checked: !item?.is_checked,
                        });
                    }}
                  />
                )}
                <ImageStyle
                  alt={item?.book?.name}
                  src={item?.book?.book_image}
                />

                <Stack
                  direction="column"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Typography fontSize="16px">{item?.book?.name}</Typography>
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
                        handleIncreaseQuantity(item?.book_id)
                      }
                      handleDecreaseQuantity={() =>
                        handleDecreaseQuantity &&
                        handleDecreaseQuantity(item?.book_id)
                      }
                    />
                  </Stack>
                </Stack>
              </Stack>
              {!addressMode && (
                <IconButton
                  sx={{ padding: '0 0 2px 0' }}
                  size="small"
                  disableFocusRipple
                  disableRipple
                  onClick={() => handleDelete && handleDelete(item?.book_id)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Stack>
          )
      )}
    </Paper>
  );
};

export default ItemTableMobile;
