import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useMutation, useQueryClient } from 'react-query';
import LinearProgress from '@mui/material/LinearProgress';
import dayjs from 'dayjs';
import AdminLayout from '../../layout/AdminLayout';
import MainCard from '../../components/cards/MainCard';
import SearchAdminSection from '../../components/Header/SearchSection/SearchAdmin';
import CustomNoRowsOverlay from '../../components/empty/CustomNoRowsOverlay';
import MenuActionAdmin from '../../components/menus/MenuActionAdmin';
import AuthorModal from '../../components/modals/AuthorModal';
import { AUTHORS } from '../../constants/queryKeyName';
import { toggleSnackbar } from '../../store/snackbarReducer';
import useGetListAuthor from '../../hooks/author/useGetListAuthor';
import { deleteAuthor } from '../../apis/author.api';
import config from '../../config';
const AuthorManagement = () => {
  const [page, setPage] = useState<number>(1);
  const [searchContent, setSearchContent] = useState<string>('');
  const queryClient = useQueryClient();
  const { data, isLoading, refetch } = useGetListAuthor(
    page,
    10,
    ['name', 'description'] as any,
    searchContent
  );

  const [currentProduct, setCurrentProduct] = useState<{ data: any } | null>(
    null
  );
  const dispatch = useDispatch();
  const toast = useCallback(
    ({ type, message }: { type: string; message: string }) => {
      dispatch(toggleSnackbar({ open: true, message, type }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch]
  );
  const { mutate, isLoading: isMutateLoading } = useMutation(deleteAuthor, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(AUTHORS);
    },
    onError: () => {
      toast({
        type: 'error',
        message: 'Xảy ra lỗi trong quá trình xóa tác giả',
      });
    },
  });

  const toggleModalEdit = useCallback((product: any) => {
    setCurrentProduct({ data: product });
  }, []);
  const handleCloseModal = useCallback(() => {
    setCurrentProduct(null);
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', description: 'ID sản phẩm', width: 50 },
    {
      field: 'name',
      headerName: 'Tên tác giả',
      description: 'Tên tác giả',
      flex: 1,
    },
    {
      field: 'biography',
      headerName: 'Tiểu sử',
      description: 'Tiểu sử tác giả',
      flex: 1,
    },
    {
      field: 'birthDate',
      headerName: 'Ngày sinh',
      description: 'Ngày sinh tác giả',
      flex: 1,
      renderCell: (params: any) => {
        return <p>{dayjs(params?.row?.birthDate).format('DD/MM/YYYY')}</p>;
      },
    },
    {
      field: 'deathDate',
      headerName: 'Ngày mất',
      description: 'Ngày mất tác giả',
      flex: 1,
      renderCell: (params: any) => {
        return <p>{dayjs(params?.row?.deathDate).format('DD/MM/YYYY')}</p>;
      },
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
      {' '}
      <>
        <MainCard title="Danh sách tác giả" darkTitle>
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
                <Typography>Thêm tác giả</Typography>
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
              loading={isLoading || isMutateLoading}
              columns={columns}
              rows={data?.datas ?? []}
              components={{
                NoRowsOverlay: CustomNoRowsOverlay,
                LoadingOverlay: LinearProgress,
              }}
            />
          </Box>{' '}
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
          <AuthorModal
            open={currentProduct !== null}
            currentProduct={currentProduct}
            handleClose={handleCloseModal}
          />
        </MainCard>
      </>
    </AdminLayout>
  );
};

export default AuthorManagement;
