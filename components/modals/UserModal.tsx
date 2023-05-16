import { Box, FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import { useState, FC, useEffect, SyntheticEvent } from 'react';
import CustomModal from './CustomModal';
import ConfirmModal from './ConfirmModal';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '../../store/snackbarReducer';
import { IModal } from '@/interfaces/compontents/modal.interface';
import authService from '@/services/authService';
import { assignRole, removeRole } from '@/apis/user.api';
import { useMutation } from 'react-query';

const UserModal: FC<IModal> = ({
  handleClose,
  open,
  currentProduct,
  refetchAfterClose,
}) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState<any>(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [values, setValues] = useState<{ [key: string]: any }>({
    user: false,
    manager: false,
    admin: false,
  });
  const data = currentProduct?.data;

  const handleExit = () => {
    handleClose();
  };
  const toast = ({ type, message }: { type: string; message: string }) => {
    dispatch(toggleSnackbar({ open: true, message, type }));
  };

  const { mutate: assginRoleFunc } = useMutation(
    (data: { user_id: number; role_id: number }) => assignRole(data),
    {
      onSuccess: () => {
        toast({
          type: 'success',
          message: 'Thay đổi thành công',
        });
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình thay đổi vai trò của tài khoản',
        });
      },
    }
  );

  const { mutate: removeRoleFunc } = useMutation(
    (data: { user_id: number; role_id: number }) => removeRole(data),
    {
      onSuccess: () => {
        toast({
          type: 'success',
          message: 'Thay đổi thành công',
        });
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình thay đổi vai trò của tài khoản',
        });
      },
    }
  );

  useEffect(() => {
    setValues({
      user: data?.roles?.includes('User') ? true : false,
      manager: data?.roles?.includes('Manager') ? true : false,
      admin: data?.roles?.includes('Admin') ? true : false,
    });
  }, [open]);
  return open ? (
    <>
      <CustomModal
        open={open}
        handleClose={() => {
          handleExit();
        }}
        title={'Chỉnh sửa người dùng'}
      >
        <Box>
          <FormGroup>
            <FormControlLabel
              checked={!!values?.user}
              onChange={(
                event: SyntheticEvent<Element, Event>,
                checked: boolean
              ) => {
                if (checked) {
                  assginRoleFunc({ user_id: data?.id, role_id: 1 });
                } else {
                  removeRoleFunc({ user_id: data?.id, role_id: 1 });
                }
                setValues((prev) => ({ ...prev, user: checked }));
              }}
              control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
              label="User"
            />
            <FormControlLabel
              checked={!!values?.manager}
              disabled={authService.isManger() && !authService.isAdmin()}
              onChange={(
                event: SyntheticEvent<Element, Event>,
                checked: boolean
              ) => {
                if (checked) {
                  assginRoleFunc({ user_id: data?.id, role_id: 2 });
                } else {
                  removeRoleFunc({ user_id: data?.id, role_id: 2 });
                }
                setValues((prev) => ({
                  ...prev,
                  manager: checked,
                }));
              }}
              control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
              label="Manager"
            />
            <FormControlLabel
              disabled={true}
              checked={!!values?.admin}
              onChange={(
                event: SyntheticEvent<Element, Event>,
                checked: boolean
              ) => {
                if (checked) {
                  assginRoleFunc({ user_id: data?.id, role_id: 3 });
                } else {
                  removeRoleFunc({ user_id: data?.id, role_id: 3 });
                }
                setValues((prev) => ({
                  ...prev,
                  admin: checked,
                }));
              }}
              control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
              label="Admin"
            />
          </FormGroup>
        </Box>
      </CustomModal>
      <ConfirmModal
        open={showConfirm}
        handleClose={() => {
          setShowConfirm(false);
        }}
        handleConfirm={() => {
          setShowConfirm(false);
          handleClose();
        }}
      />
    </>
  ) : null;
};

export default UserModal;
