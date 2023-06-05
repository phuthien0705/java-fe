import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import Switch from '@mui/material/Switch';
import { Box, Pagination, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import AdminLayout from '../../layout/AdminLayout';
import MainCard from '../../components/cards/MainCard';
import SearchAdminSection from '../../components/Header/SearchSection/SearchAdmin';
import CustomNoRowsOverlay from '../../components/empty/CustomNoRowsOverlay';
import MenuActionAdmin from '../../components/menus/MenuActionAdmin';
import CustomChip from '../../components/chip/CustomChip';
import { activeUser, unactiveUser } from '@/apis/user.api';
import { toggleSnackbar } from '@/store/snackbarReducer';
import UserModal from '@/components/modals/UserModal';
import { useToast } from '@/hooks/useToast';
import config from '../../config';
import useGetListUser from '@/hooks/user/useGetListUser';

const ImageStyle = styled('img')({
  width: '80%',
  borderRadius: 4,
  objectFit: 'cover',
});

const UserManagement = () => {
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchContent, setSearchContent] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, refetch } = useGetListUser(
    page,
    10,
    ['name', 'description'] as any,
    searchContent
  );
  const deleteUser = useCallback((id: any) => () => {}, []);
  const toggleModalEdit = useCallback((user: any) => {
    setCurrentUser({ data: user });
  }, []);

  const { mutate: activeUserFunc } = useMutation(
    (data: { userId: string }) => activeUser(data),
    {
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình chuyển trạng thái',
        });
      },
      onSuccess: () => {
        refetch();
      },
    }
  );
  const { mutate: unactiveUserFunc } = useMutation(
    (data: { userId: string }) => unactiveUser(data),
    {
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình chuyển trạng thái',
        });
      },
      onSuccess: () => {
        refetch();
      },
    }
  );
  const columns = [
    { field: 'id', headerName: 'ID', description: 'ID', width: 50 },
    {
      field: 'avatar',
      headerName: 'Avatar',
      description: 'Hình nền',
      width: 100,
      renderCell: (params: any) => {
        // return <ImageStyle src={params.value} alt={params?.row?.name} />;
        return <h1>NO IMAGE</h1>;
      },
    },
    { field: 'name', headerName: 'Họ tên', description: 'Họ tên', flex: 1 },
    { field: 'bio', headerName: 'Mô tả', description: 'Mô tả', flex: 1 },

    { field: 'email', headerName: 'Email', description: 'Email', flex: 1 },
    {
      field: 'role',
      width: 200,
      headerName: 'Phân quyền',
      description: 'Phân quyền',
      renderCell: (params: any) => {
        return (
          <Stack direction="row" spacing={0.5}>
            {params?.row?.roles.map((i: any, _index: number) => (
              <CustomChip key={_index} content={i} type={'default'} />
            ))}
          </Stack>
        );
      },
    },
    {
      field: 'is_active',
      width: 100,
      description: 'Trạng thái của user',
      headerName: 'Trạng thái',
      renderCell: (params: any) => {
        return (
          <Box>
            <Switch
              checked={params?.row?.isActive}
              disabled={params?.row?.roles?.includes('admin')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.checked) {
                  activeUserFunc({ userId: params?.row?.id });
                } else {
                  unactiveUserFunc({ userId: params?.row?.id });
                }
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>
        );
      },
    },
    {
      field: 'actions',

      headerName: 'Thao tác',
      description: 'Thao tác',
      width: 80,

      renderCell: (params: any) => {
        return (
          <MenuActionAdmin
            userMode={true}
            id={params?.row?.id}
            deleteCallback={() => deleteUser(params?.row?.id)}
            editCallback={() => toggleModalEdit(params?.row)}
          />
        );
      },
    },
  ];

  return (
    <AdminLayout>
      <>
        <MainCard title="Danh sách người dùng" darkTitle>
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
              loading={isLoading}
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
              sx={{ p: 2, borderRadius: '8px' }}
              variant="outlined"
              shape="rounded"
              color="primary"
              count={data?.meta?.last_page || 0}
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          </Box>
        </MainCard>
      </>
      <UserModal
        open={currentUser !== null}
        currentProduct={currentUser}
        handleClose={() => setCurrentUser(null)}
        refetchAfterClose={refetch}
      />
    </AdminLayout>
  );
};

export default UserManagement;
