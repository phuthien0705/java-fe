/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import AdminLayout from '../../layout/AdminLayout';
import SearchAdminSection from '../../components/Header/SearchSection/SearchAdmin';
import CustomNoRowsOverlay from '../../components/empty/CustomNoRowsOverlay';
import MenuActionAdmin from '../../components/menus/MenuActionAdmin';
import { deleteBook } from '../../apis/product.api';
import { toggleSnackbar } from '../../store/snackbarReducer';
import BookModal from '../../components/modals/BookModal';
import useGetListBook from '../../hooks/useGetListBook';
import useGetListGenre from '../../hooks/useGetListGenre';
import useGetListAuthor from '../../hooks/useGetListAuthor';
import useGetListPublisher from '../../hooks/useGetListPublisher';
import MainCard from '../../components/cards/MainCard';
import config from '../../config';
import {
  PreviewImageModal,
  TDataImage,
} from '@/components/modals/PreviewImageModal';

const ImageStyle = styled('img')({
  borderRadius: 4,
  objectFit: 'cover',
  padding: '5px 0',
  height: '100px',
});
const ProductManagement = () => {
  const dispatch = useDispatch();
  const [searchContent, setSearchContent] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [currentProduct, setCurrentProduct] = useState<{ data: any } | null>(
    null
  );
  const [previewImage, setPreViewImage] = useState<TDataImage[] | null>(null);

  const { data: authorData, isLoading: isAuthorLoading } = useGetListAuthor(
    1,
    100
  );
  const { data: publisherData, isLoading: isPublisherLoading } =
    useGetListPublisher(1, 100);
  const { data: genreData, isLoading: isGenreLoading } = useGetListGenre(
    1,
    100
  );
  const {
    data: bookData,
    isLoading: isBookLoading,
    refetch,
  } = useGetListBook(page, 5, ['name', 'description'] as any, searchContent);

  const findPublisher = useCallback((id: any) => {
    if (publisherData?.data) {
      return publisherData?.data.find((publisher: any) => publisher.id === id);
    }
  }, []);
  const findGenre = useCallback((id: any) => {
    if (genreData?.data) {
      return genreData?.data.find((genre: any) => genre.id === id);
    }
  }, []);
  const findAuthor = useCallback((id: any) => {
    if (authorData?.data) {
      return authorData?.data.find((author: any) => author.id === id);
    }
  }, []);

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
        message: 'Xảy ra lỗi trong quá trình xóa sản phẩm',
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
      field: '_id',
      headerName: 'ID',
      description: 'ID sản phẩm',
      width: 50,
      renderCell: (params: any) => {
        return <p className="truncate">{params?.row?._id}</p>;
      },
    },
    {
      field: 'image',
      headerName: 'Hình ảnh',
      description: 'Hình ảnh sản phẩm',
      width: 150,
      renderCell: (params: any) => {
        return (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setPreViewImage(params?.row?.images as unknown as TDataImage[]);
            }}
          >
            Xem ảnh
          </Button>
        );
      },
    },
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
      field: 'price',
      headerName: 'Giá',
      description: 'Giá sản phẩm',
      width: 100,
      renderCell: (params: any) => <p>{params?.value}đ</p>,
    },

    {
      field: 'availableQuantity',
      headerName: 'Số lượng',
      description: 'Số lượng sản phẩm',
      width: 100,
    },
    {
      field: 'totalPages',
      headerName: 'Số trang',
      description: 'Số trang',
      width: 100,
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
            deleteCallback={() => mutate(params?.row?._id)}
            editCallback={() => toggleModalEdit(params?.row)}
          />
        );
      },
    },
  ];
  useEffect(() => {
    refetch();
  }, [refetch, page, searchContent]);
  console.log(bookData);
  return (
    <AdminLayout>
      {' '}
      <>
        <MainCard title="Danh sách các sản phẩm" darkTitle>
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
              disabled={
                isAuthorLoading ||
                isGenreLoading ||
                isPublisherLoading ||
                isBookLoading ||
                isMutateLoading
              }
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
                <Typography>Thêm sản phẩm</Typography>
              </Stack>
            </Button>
          </Stack>
          <Box mt={2} sx={{ height: 610, width: '100%' }}>
            <DataGrid
              getRowId={(row) => row._id}
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
              loading={isBookLoading || isMutateLoading}
              columns={columns}
              rows={bookData?.datas ?? []}
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
              count={bookData?.totalPage ?? 0}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          </Box>
          <BookModal
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
          />
        </MainCard>
      </>
    </AdminLayout>
  );
};

export default ProductManagement;
