/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { Box, Pagination, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import AdminLayout from '../../layout/AdminLayout';
import SearchAdminSection from '../../components/Header/SearchSection/SearchAdmin';
import CustomNoRowsOverlay from '../../components/empty/CustomNoRowsOverlay';
import { deleteBook } from '../../apis/product.api';
import statusMaping from '../../common/oderStatusMaping';
import { toggleSnackbar } from '../../store/snackbarReducer';
import useGetOrderAllUser from '../../hooks/order/useGetOrderAllUser';
import useGetListAuthor from '../../hooks/author/useGetListAuthor';
import MainCard from '../../components/cards/MainCard';
import config from '../../config';
import { useTheme } from '@mui/material/styles';
const OrderManagement = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchContent, setSearchContent] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [currentProduct, setCurrentProduct] = useState<{ data: any } | null>(
    null
  );

  const { data: authorData, isLoading: isAuthorLoading } = useGetListAuthor(
    1,
    100
  );

  const { data, isLoading, refetch } = useGetOrderAllUser(page, 5);

  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );
  const { mutate, isLoading: isMutateLoading } = useMutation(deleteBook, {
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      toast({
        type: 'error',
        message: 'Xảy ra lỗi trong quá trình xóa đơn hàng',
      });
    },
  });

  const toggleModalEdit = useCallback((product: any) => {
    setCurrentProduct({ data: product });
  }, []);
  const handleCloseModal = useCallback(() => {
    setCurrentProduct(null);
  }, []);
  const fetchData = useCallback(async () => {
    refetch();
  }, [refetch]);

  const columns: any[] = [
    {
      field: 'orderId',
      headerName: 'Order ID',
      description: 'ID đơn hàng',
      width: 150,
      renderCell: (params: any) => {
        return (
          <>
            <Typography
              style={{
                fontWeight: 'bold',
                textDecoration: 'underline',
              }}
            >
              #BOXO{params?.row?.orderId.substr(-8).toUpperCase()}
            </Typography>
          </>
        );
      },
    },
    {
      field: 'orderDate',
      headerName: 'Date',
      description: 'Ngày đặt hàng',
      width: 150,
      renderCell: (params: any) => {
        return <p>{dayjs(params?.row?.date).format('DD/MM/YYYY')}</p>;
      },
    },

    {
      field: 'userName',
      headerName: 'Customer',
      description: 'Tên khách hàng',
      width: 100,
    },
    {
      field: 'status',
      headerName: 'Status',
      description: 'Trạng thái',
      width: 150,
      renderCell: (params: any) => {
        const colors = statusMaping(params?.row?.status).color;
        return (
          <Box
            style={{
              backgroundColor: colors,
              padding: '5px 8px ',
              borderRadius: 8,
            }}
          >
            <Typography>
              {statusMaping(params?.row?.status).icon}
              {'  '}
              {statusMaping(params?.row?.status).content}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'quantity',
      headerName: 'Total Quantity',
      description: 'Số lượng sản phẩm trong đơn hàng',
      width: 150,
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      description: 'Tổng tiền đơn hàng',
      width: 100,
      renderCell: (params: any) => <p>{params?.row?.totalPrice}đ</p>,
    },

    // {
    //   field: 'actions',

    //   headerName: 'Thao tác',
    //   description: 'Thao tác',
    //   width: 80,
    //   sortable: false,
    //   renderCell: (params: any) => {
    //     return (
    //       <MenuActionAdmin
    //         id={params?.row?.id}
    //         deleteCallback={() => mutate(params?.row?.id)}
    //         editCallback={() => toggleModalEdit(params?.row)}
    //       />
    //     );
    //   },
    // },
  ];
  useEffect(() => {
    refetch();
  }, [refetch, page, searchContent]);
  return (
    <AdminLayout>
      {' '}
      <>
        <MainCard title="Danh sách các đơn hàng" darkTitle>
          <Stack
            direction={{ xs: 'column-reverse', sm: 'row' }}
            alignItems={{ xs: 'flex-end', sm: 'center' }}
            justifyContent={{ xs: 'space-between', sm: 'space-between' }}
            spacing={1}
          >
            <SearchAdminSection
              value={searchContent}
              setValue={setSearchContent}
              setPage={setPage}
            />
          </Stack>
          <Box mt={2} sx={{ height: 610, width: '100%' }}>
            <DataGrid
              getRowId={(row) => row.orderId}
              className="shadow"
              sx={{
                border: 'none !important',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                borderRadius: `${config.borderRadius}px`,
                '.MuiDataGrid-cellContent': {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                },
                '.MuiDataGrid-footerContainer': {
                  display: 'none',
                },
              }}
              disableSelectionOnClick
              rowHeight={100}
              disableColumnMenu
              loading={isLoading || isMutateLoading}
              columns={columns}
              rows={data?.datas ?? []}
              components={{
                NoRowsOverlay: CustomNoRowsOverlay,
                LoadingOverlay: LinearProgress,
              }}
              hideFooterPagination
            />
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1.5 }}
          >
            <Pagination
              className="shadow"
              sx={{ p: 2, borderRadius: '8px' }}
              variant="outlined"
              shape="rounded"
              color="primary"
              count={data?.totalPages ?? 0}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          </Box>
          {/* <BookModal
            open={currentProduct !== null}
            currentProduct={currentProduct}
            handleClose={handleCloseModal}
            refetchAfterClose={fetchData}
            authors={authorData?.datas}
            genres={genreData?.datas}
            publishers={publisherData?.datas}
            findAuthor={findAuthor}
            findGenre={findGenre}
            findPublisher={findPublisher}
          />
          <PreviewImageModal
            isOpen={!!previewImage}
            closeModal={() => {
              setPreViewImage(null);
            }}
            data={previewImage}
          /> */}
        </MainCard>
      </>
    </AdminLayout>
  );
};

export default OrderManagement;
