import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { useMutation, useQueryClient } from 'react-query';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import MainCard from '../../components/cards/MainCard';
import CustomNoRowsOverlay from '../../components/empty/CustomNoRowsOverlay';
import SearchAdminSection from '../../components/Header/SearchSection/SearchAdmin';
import MenuActionAdmin from '../../components/menus/MenuActionAdmin';
import { POST } from '../../constants/queryKeyName';
import AdminLayout from '../../layout/AdminLayout';
import PostModal from '@/components/modals/PostModal';
import useGetListPost from '@/hooks/post/useGetListPost';
import PreviewContentModal from '@/components/modals/PreviewContentModal';
import { useToast } from '@/hooks/useToast';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { deletePost } from '@/apis/post.api';
import config from '../../config';

const PostManagement = () => {
  const queryClient = useQueryClient();
  const [searchContent, setSearchContent] = useState<string>('');
  const [currentProduct, setCurrentProduct] = useState<{ data: any } | null>(
    null
  );
  const [previewContent, setPreviewContent] = useState('');
  const {
    queryReturn: { data, isLoading, refetch },
    page,
    setPage,
  } = useGetListPost();

  const dispatch = useDispatch();

  const toast = useToast(dispatch, toggleSnackbar);

  const { mutate, isLoading: isMutateLoading } = useMutation(deletePost, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(POST);
    },
    onError: () => {
      toast({
        type: 'error',
        message: 'Xảy ra lỗi trong quá trình xóa bài viết',
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
    { field: '_id', headerName: 'ID', description: 'ID bài viết', width: 50 },
    {
      field: 'title',
      headerName: 'Tên bài viết',
      description: 'Tên bài viết',
      width: 200,
    },
    {
      field: 'content',
      headerName: 'Nội dung',
      description: 'Nội dung bài viết',
      flex: 1,
      renderCell: (params: any) => (
        <Button
          variant="contained"
          onClick={() => {
            setPreviewContent(params?.row?.content);
          }}
        >
          Xem nội dung
        </Button>
      ),
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      description: 'Thao tác',
      width: 80,
      sortable: false,
      renderCell: (params: any) => (
        <MenuActionAdmin
          id={params?.row?._id}
          deleteCallback={() => mutate(params?.row?._id)}
          editCallback={() => toggleModalEdit(params?.row)}
        />
      ),
    },
  ];

  useEffect(() => {
    refetch();
  }, [refetch, page, searchContent]);

  return (
    <AdminLayout>
      <>
        <MainCard title="Danh sách bài viết" darkTitle>
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
                <Typography>Thêm bài viết</Typography>
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
              rows={
                data?.datas
                  ? data.datas.map((item, index) => ({ ...item, id: index }))
                  : []
              }
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
          <PostModal
            open={currentProduct !== null}
            currentProduct={currentProduct}
            handleClose={handleCloseModal}
          />
          <PreviewContentModal
            open={!!previewContent}
            content={previewContent as string}
            handleClose={() => setPreviewContent('')}
          />
        </MainCard>
      </>
    </AdminLayout>
  );
};

export default PostManagement;
