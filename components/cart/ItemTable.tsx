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
import Checkbox from '@mui/material/Checkbox';
import { Typography, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import QuantityButton from '../extended/Quantity';
import {
  IEachCartData,
  IItemTable,
} from '@/interfaces/compontents/cart.interface';
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
                            (item: IEachCartData) => item.isChecked == true
                          )
                        }
                        onChange={() => {
                          checkAllItem &&
                            checkAllItem({
                              isChecked: !items?.every(
                                (item: IEachCartData) => item.isChecked == true
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
                        (item: any) => item?.isChecked == true
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
            (row: IEachCartData) =>
              ((addressMode && row?.isChecked === true) || !addressMode) && (
                <TableRow key={row.bookId}>
                  <TableCell sx={{ maxWidth: '350px' }}>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      spacing={2}
                    >
                      {!addressMode && (
                        <Checkbox
                          sx={{ height: 'fit-content' }}
                          checked={!!row?.isChecked}
                          onChange={() => {
                            checkItem &&
                              checkItem({
                                bookId: row.bookId,
                                isChecked: !row.isChecked,
                              });
                          }}
                        />
                      )}
                      <Box>
                        <ImageStyle
                          alt={row.name}
                          width="76"
                          height="76"
                          src={row.imageUrl}
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
                            {row.name}
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
                          handleIncreaseQuantity(row.bookId)
                        }
                        handleDecreaseQuantity={() =>
                          handleDecreaseQuantity &&
                          handleDecreaseQuantity(row.bookId)
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
                        onClick={() => handleDelete && handleDelete(row.bookId)}
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
