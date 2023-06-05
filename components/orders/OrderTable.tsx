import {
  Box,
  Button,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Typography, Paper } from '@mui/material';
import { IOrderTable } from '@/interfaces/compontents/cart.interface';
import { moneyFormat } from '@/utils/moneyFormat';
import EmptyOrder from './EmptyOrder';
import { sortOrdersByDate } from '@/common/sortOrdersByDate';
import { ImageOrderStyle } from './ImageOrderStyle';

import statusMaping from '@/common/oderStatusMaping';
import { Fragment, useState } from 'react';
import ReviewModal from '../modals/ReviewModal';
const OrderTable: React.FunctionComponent<IOrderTable> = ({
  items,
  page,
  setPage,
  data,
}) => {
  const sortedItems = sortOrdersByDate(items);
  const [openReviewModal, setOpenReviewModal] = useState<boolean>(false);
  // const calcTotalBookPrice = useCallback((item: any) => {
  //   let total = 0;
  //   item?.books?.forEach((element: any) => {
  //     total += Number(element.price) * Number(element.quantity);
  //   });
  //   return total;
  // }, []);

  if (!sortedItems || sortedItems?.length === 0) {
    return (
      <Box
        className="shadow"
        sx={{ backgroundColor: '#fff', padding: 4, borderRadius: '8px' }}
      >
        <EmptyOrder />
      </Box>
    );
  }

  return (
    <div>
      {(sortedItems || []).map((row: any) => (
        <>
          <TableContainer
            className="shadow"
            component={Paper}
            key={row.id}
            sx={{ mb: 2 }}
          >
            <Table sx={{ maxWidth: 1762, marginTop: 0 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Stack display="flex" direction="row" alignItems="center">
                      {statusMaping(row?.status).icon}
                      <Typography ml={2} variant="h4">
                        {statusMaping(row?.status).content}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography textAlign="center">Đơn giá</Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Typography textAlign="center">Thành tiền</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(row?.books || []).map((item: any, _index: number) => (
                  <Fragment key={`${item.id}_${_index}`}>
                    <TableRow>
                      <TableCell sx={{ maxWidth: '350px' }}>
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          spacing={2}
                        >
                          <Box sx={{ position: 'relative' }}>
                            <ImageOrderStyle
                              alt={item.name}
                              width="76"
                              height="76"
                              src={item.imageUrl}
                            />
                            <span
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                position: 'absolute',
                                color: '#808089',
                                textAlign: 'center',
                                width: 35,
                                height: 35,
                                backgroundColor: 'rgb(235, 235, 240)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderTopLeftRadius: 10,
                                borderBottomRightRadius: 4,
                                bottom: 0,
                                right: 0,
                              }}
                            >
                              x{item?.quantity}
                            </span>
                          </Box>
                          <Typography
                            fontSize="14px"
                            textAlign="center"
                            color="black"
                          >
                            {item?.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {!item?.priceDiscount ? (
                          <Typography fontWeight="bold" textAlign="center">
                            {moneyFormat(item.price || 0)}
                          </Typography>
                        ) : (
                          <Stack>
                            <Typography fontWeight="bold" textAlign="center">
                              {moneyFormat(item.priceDiscount || 0)}
                            </Typography>
                            <Typography
                              fontWeight="lighter"
                              textAlign="center"
                              style={{ textDecorationLine: 'line-through' }}
                            >
                              {moneyFormat(item.price || 0)}
                            </Typography>
                          </Stack>
                        )}
                      </TableCell>
                      <TableCell>
                        {!item?.priceDiscount ? (
                          <Typography fontWeight="bold" textAlign="center">
                            {moneyFormat(item.price * item.quantity || 0)}
                          </Typography>
                        ) : (
                          <Stack>
                            <Typography fontWeight="bold" textAlign="center">
                              {moneyFormat(
                                item.priceDiscount * item.quantity || 0
                              )}
                            </Typography>
                          </Stack>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} align="right">
                        <Button
                          variant="contained"
                          sx={{
                            width: { xs: 'fit-content', sm: 'inherit' },
                            marginRight: '10px',
                          }}
                          onClick={() => setOpenReviewModal(true)}
                        >
                          Đánh giá
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          sx={{
                            marginRight: '30px',
                          }}
                        >
                          Mua lại
                        </Button>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                ))}
                <TableRow>
                  <TableCell colSpan={3}>
                    <Stack
                      display="flex"
                      direction="row"
                      justifyContent="flex-start"
                    >
                      <Typography>
                        Phí vận chuyển: {moneyFormat(row?.shipping?.value || 0)}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Stack
                      display="flex"
                      direction="row"
                      justifyContent="flex-start"
                    >
                      <Typography>
                        Giảm giá: {moneyFormat(row?.discount || 0)}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Stack
                      display="flex"
                      direction="row"
                      justifyContent="flex-start"
                    >
                      <Typography
                        fontWeight={700}
                        fontSize={'18px'}
                        color={'black'}
                      >
                        Tổng tiền: {moneyFormat(row?.totalPayment || 0)}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5, mb: 2 }}>
        <Pagination
          className="shadow"
          sx={{ p: 2, borderRadius: '8px' }}
          variant="outlined"
          shape="rounded"
          color="primary"
          count={data?.meta?.last_page || 0}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Box>
      <ReviewModal
        open={openReviewModal}
        handleClose={() => {
          setOpenReviewModal(false);
        }}
        bookId={''}
        refetchReviews={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};

export default OrderTable;
