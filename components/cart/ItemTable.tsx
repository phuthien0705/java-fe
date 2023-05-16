import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Typography, Paper, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import QuantityButton from '../extended/Quantity';
import Checkbox from '@mui/material/Checkbox';
import { IItemTable } from '@/interfaces/compontents/cart.interface';
import { moneyFormat } from '@/utils/moneyFormat';

const ImageStyle = styled('img')({
  borderRadius: 4,
  objectFit: 'contain',
  margin: '5px 0',
  width: '100px',
  height: 'auto',
});
const ItemTable: React.FunctionComponent<IItemTable> = ({
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
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1762, marginTop: addressMode ? 0 : 2 }}>
        <TableHead>
          {items?.length !== 0 && (
            <TableRow>
              <TableCell>
                <Typography variant="h5">
                  {!addressMode && (
                    <>
                      <Checkbox
                        sx={{ height: 'fit-content' }}
                        checked={
                          !!items?.every(
                            (item: any) => item?.is_checked == true
                          )
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
                    ? 'Sản phẩm'
                    : `Chọn tất cả (${items?.length || 0} sản phẩm)`}
                  <Typography
                    onClick={() => clearCart && clearCart()}
                    component={'span'}
                    sx={{
                      color: 'red',
                      cursor: 'pointer',
                      display: items?.every(
                        (item: any) => item?.is_checked == true
                      )
                        ? 'inline-block'
                        : 'none',
                    }}
                  >
                    (Xóa)
                  </Typography>
                </Typography>
              </TableCell>

              {!addressMode && (
                <TableCell>
                  <Typography textAlign="center" variant="h5">
                    Số lượng
                  </Typography>
                </TableCell>
              )}
              <TableCell colSpan={addressMode ? 1 : 2}>
                <Typography ml={addressMode ? 0 : 2} variant="h5">
                  Thành tiền
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody>
          {items.map(
            (row: any) =>
              ((addressMode && row?.is_checked === 1) || !addressMode) && (
                <TableRow key={row.id}>
                  <TableCell sx={{ maxWidth: '350px' }}>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      spacing={2}
                    >
                      {!addressMode && (
                        <Checkbox
                          sx={{ height: 'fit-content' }}
                          checked={!!row?.is_checked}
                          onChange={() => {
                            checkItem &&
                              checkItem({
                                book_id: row?.book?.id,
                                is_checked: !row?.is_checked,
                              });
                          }}
                        />
                      )}
                      <Box>
                        <ImageStyle
                          alt={row?.book?.name}
                          width="76"
                          height="76"
                          src={row?.book?.book_image}
                        />
                      </Box>
                      <Box>
                        <Stack
                          sx={{
                            width: '100%',
                            height: '100%',
                            padding: '10px 0',
                          }}
                          direction="column"
                          justifyContent="space-between"
                        >
                          <Typography fontSize="16px" fontWeight="500">
                            {row?.book?.name}
                          </Typography>
                          <Typography
                            fontSize="14px"
                            fontWeight="600"
                            color="#ee4d2d"
                          >
                            {moneyFormat(row?.price)}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </TableCell>

                  {!addressMode && (
                    <TableCell sx={{ maxWidth: 100, minWidth: 100 }}>
                      <QuantityButton
                        currentQuantity={row?.quantity}
                        handleIncreaseQuantity={() =>
                          handleIncreaseQuantity &&
                          handleIncreaseQuantity(row?.book_id)
                        }
                        handleDecreaseQuantity={() =>
                          handleDecreaseQuantity &&
                          handleDecreaseQuantity(row?.book_id)
                        }
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <Typography
                      fontSize="16px"
                      fontWeight="bold"
                      textAlign={addressMode ? 'left' : 'center'}
                    >
                      {moneyFormat(row.price * row?.quantity)}
                    </Typography>
                  </TableCell>
                  {!addressMode && (
                    <TableCell sx={{ maxWidth: 40, minWidth: 40 }}>
                      <IconButton
                        disableFocusRipple
                        disableRipple
                        onClick={() =>
                          handleDelete && handleDelete(row?.book_id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemTable;
