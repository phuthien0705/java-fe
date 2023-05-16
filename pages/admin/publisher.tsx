import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import AdminLayout from '../../layout/AdminLayout';
import MainCard from '../../components/cards/MainCard';
import SearchAdminSection from '../../components/Header/SearchSection/SearchAdmin';
import CustomNoRowsOverlay from '../../components/empty/CustomNoRowsOverlay';
import MenuActionAdmin from '../../components/menus/MenuActionAdmin';
import PublisherModal from '../../components/modals/PublisherModal';
import { deletePublisher } from '../../apis/publisher.api';
import { PUBLISHERS } from '../../constants/queryKeyName';
import useGetListPublisher from '../../hooks/useGetListPublisher';
import { toggleSnackbar } from '../../store/snackbarReducer';
import config from '../../config';

const PublisherManagement = () => {
  const queryClient = useQueryClient();
  const [searchContent, setSearchContent] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const { data, isLoading, refetch } = useGetListPublisher(
    page,
    10,
    ['name', 'description'] as any,
    searchContent
  );
  const dispatch = useDispatch();
  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );
  console.log(data);
  const { mutate, isLoading: isDeleting } = useMutation(deletePublisher, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(PUBLISHERS);
    },
    onError: () => {
      toast({
        type: 'error',
        message: 'Xảy ra lỗi trong quá trình xóa nhà xuất bản',
      });
    },
  });

  const toggleModalEdit = useCallback((product: any) => {
    setCurrentProduct({ data: product });
  }, []);

  const handleCloseModal = useCallback(async () => {
    setCurrentProduct(null);
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      description: 'ID nhà xuất bản',
      width: 50,
    },
    {
      field: 'name',
      headerName: 'Tên nhà xuất bản',
      description: 'Tên nhà xuất bản',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      description: 'Email xuất bản',
      width: 100,
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      description: 'Mô tả nhà xuất bản',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      description: 'Địa chỉ nhà xuất bản',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      description: 'Mô tả nhà xuất bản',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      description: 'Thao tác',
      width: 80,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <MenuActionAdmin
            id={params?.row?.id}
            deleteCallback={() => mutate(params?.row?.id)}
            editCallback={() => toggleModalEdit(params?.row)}
          />
        );
      },
    },
  ];
  useEffect(() => {
    refetch();
  }, [refetch, page, searchContent]);
  return (
    <AdminLayout>
      <MainCard title="Danh sách nhà xuất bản" darkTitle>
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
          <Button
            disabled={isLoading}
            variant="contained"
            sx={{
              width: { xs: '100%', sm: '18rem' },
              whiteSpace: 'nowrap',
              boxShadow: 'none',
            }}
            onClick={() => setCurrentProduct({ data: null })}
          >
            <Stack
              sx={{ padding: '5px 10px 5px 2px' }}
              direction="row"
              alignItems="center"
              spacing={0.5}
            >
              <AddIcon fontSize="small" />
              <Typography>Thêm thể loại</Typography>
            </Stack>
          </Button>
        </Stack>
        <Box mt={2}>
          <DataGrid
            className="shadow"
            sx={{
              border: 'none !important',
              borderColor: 'rgba(0, 0, 0, 0.23)',
              borderRadius: `${config.borderRadius}px`,
              '.MuiDataGrid-footerContainer': {
                display: 'none',
              },
            }}
            disableSelectionOnClick
            autoHeight
            disableColumnMenu
            loading={isLoading || isDeleting}
            columns={columns}
            rows={data?.datas ?? []}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: LinearProgress,
            }}
          />
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1.5 }}
        >
          <Pagination
            className="shadow"
            sx={{ p: 2, borderRadius: '6px' }}
            variant="outlined"
            shape="rounded"
            color="primary"
            count={data?.totalPages ?? 0}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </Box>
        <PublisherModal
          open={currentProduct !== null}
          currentProduct={currentProduct}
          handleClose={handleCloseModal}
        />
      </MainCard>
    </AdminLayout>
  );
};

export default PublisherManagement;
