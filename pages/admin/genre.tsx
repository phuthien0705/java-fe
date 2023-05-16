import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import MainCard from '../../components/cards/MainCard';
import SearchAdminSection from '../../components/Header/SearchSection/SearchAdmin';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import CustomNoRowsOverlay from '../../components/empty/CustomNoRowsOverlay';
import AddIcon from '@mui/icons-material/Add';
import config from '../../config';
import MenuActionAdmin from '../../components/menus/MenuActionAdmin';
import { deleteGenre } from '../../apis/genre.api';
import GenreModal from '../../components/modals/GenreModal';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '../../store/snackbarReducer';
import { useMutation, useQueryClient } from 'react-query';
import { GENRES } from '../../constants/queryKeyName';
import useGetListGenre from '../../hooks/useGetListGenre';
import AdminLayout from '../../layout/AdminLayout';

const GenreManagement = () => {
  const queryClient = useQueryClient();
  const [searchContent, setSearchContent] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [currentProduct, setCurrentProduct] = useState<{ data: any } | null>(
    null
  );
  const { data, isLoading, refetch } = useGetListGenre(
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
  const { mutate, isLoading: isMutateLoading } = useMutation(deleteGenre, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(GENRES);
    },
    onError: () => {
      toast({
        type: 'error',
        message: 'Xảy ra lỗi trong quá trình xóa thể loại',
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
    { field: 'id', headerName: 'ID', description: 'ID sản phẩm', width: 50 },
    {
      field: 'name',
      headerName: 'Tên sản phẩm',
      description: 'Tên sản phẩm',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      description: 'Mô tả sản phẩm',
      flex: 1,
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
      <>
        <MainCard title="Danh sách thể loại" darkTitle>
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
          <GenreModal
            open={currentProduct !== null}
            currentProduct={currentProduct}
            handleClose={handleCloseModal}
          />
        </MainCard>
      </>
    </AdminLayout>
  );
};

export default GenreManagement;
