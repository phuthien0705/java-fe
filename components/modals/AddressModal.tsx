import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import { useMutation } from 'react-query';
import { deleteAddress, setDefaultAddress } from '@/apis/address.api';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import LoadingButton from '@mui/lab/LoadingButton';
import AddressForm from '../forms/AddressForm';
import { IAddressModal } from '@/interfaces/compontents/modal.interface';
import { useToast } from '@/hooks/useToast';
import { IEachAddressOfUserData } from '@/interfaces/address.interface';
import ConfirmModal from './ConfirmModal';

const AddressModal: React.FunctionComponent<IAddressModal> = ({
  open,
  handleClose,
  listAddress,
  refetchAddress,
}) => {
  const defaultAddress = (listAddress || []).find(
    (item: any) => item?.isDefault === true
  );
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);

  const [value, setValue] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean | { data: any }>(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(
    null
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event?.target as any).value);
  };

  const { mutate: changeDefaultAddressFunc, isLoading } = useMutation(
    (id: string) => setDefaultAddress(id, true),
    {
      onSuccess: () => {
        refetchAddress();
        handleClose();
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình cập nhật địa chỉ nhận hàng',
        });
      },
    }
  );
  const { mutate: deleteAddressFunc } = useMutation(
    (id: string | number) => deleteAddress(id),
    {
      onSuccess: (data, variables) => {
        if (
          listAddress &&
          defaultAddress?.id === variables &&
          listAddress[0]?.id === variables &&
          listAddress?.length === 1
        ) {
          refetchAddress();
          handleClose();
        } else if (
          listAddress &&
          defaultAddress?.id === variables &&
          listAddress[0]?.id === variables &&
          listAddress?.length !== 1
        ) {
          changeDefaultAddressFunc(listAddress[1]?.id);
        } else if (
          listAddress &&
          defaultAddress?.id === variables &&
          listAddress[0]?.id !== variables
        ) {
          changeDefaultAddressFunc(listAddress[0]?.id);
        } else {
          refetchAddress();
          handleClose();
        }
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình xóa địa chỉ nhận hàng',
        });
      },
    }
  );
  const renderListAddress = () => {
    if (listAddress && listAddress?.length > 0) {
      return (
        <FormControl>
          <RadioGroup
            defaultValue={defaultAddress?.id}
            name="radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {listAddress.map((item: IEachAddressOfUserData, _index: number) => {
              return (
                <>
                  <FormControlLabel
                    sx={{
                      width: '100%',
                      '.MuiFormControlLabel-label': { width: '100%' },
                    }}
                    key={_index}
                    value={item?.id}
                    control={<Radio />}
                    label={
                      <Stack
                        sx={{ paddingLeft: 1 }}
                        justifyContent={'space-between'}
                        direction="row"
                        spacing={1}
                        alignItems={'center'}
                      >
                        <Stack spacing={0.5}>
                          <Box>
                            <Typography sx={{ fontWeight: 500 }}>
                              <b>{item?.name}</b> | {item?.phone}
                            </Typography>
                            <Typography>{item?.description}</Typography>
                          </Box>
                        </Stack>
                        <Stack>
                          <Button
                            onClick={() => setEditMode({ data: item })}
                            sx={{
                              width: 'fit-content',
                              whiteSpace: 'nowrap',
                              height: 'fit-content',
                            }}
                          >
                            Cập nhật
                          </Button>
                          <Button
                            color="error"
                            // onClick={() => deleteAddressFunc(item?.id)}
                            onClick={() => {
                              setShowConfirm(true);
                              setDeletingAddressId(item?.id);
                            }}
                          >
                            Xóa
                          </Button>
                        </Stack>
                      </Stack>
                    }
                  />
                  <Divider sx={{ margin: '10px 0' }} />
                </>
              );
            })}
          </RadioGroup>
        </FormControl>
      );
    }
    if (listAddress && listAddress?.length === 0) {
      return (
        <Typography sx={{ paddingBottom: 2 }}>
          Hình như bạn vẫn chưa tạo địa chỉ giao hàng. Bấm vào nút bên dưới để
          tạo địa chỉ.
        </Typography>
      );
    }
    return null;
  };

  const handleSubmit = () => {
    const newDefaultAddress = listAddress?.find(
      (item: IEachAddressOfUserData) => item?.id === value
    );
    if (defaultAddress?.id === newDefaultAddress?.id) {
      handleClose();
    } else {
      changeDefaultAddressFunc(newDefaultAddress?.id as string);
    }
    // close after 500ms
  };
  useEffect(() => {
    const defaultAddress = (listAddress || []).find(
      (item: IEachAddressOfUserData) => item?.isDefault === true
    );
    if (defaultAddress) {
      setValue(defaultAddress?.id ?? null);
    }
  }, [listAddress, open]);
  useEffect(() => {
    setEditMode(false);
  }, [open]);
  return (
    <Dialog onClose={() => handleClose()} open={open} fullWidth maxWidth="sm">
      <Stack
        direction="column"
        sx={{ paddingLeft: 2, paddingRight: 2, paddingBottom: 0 }}
        spacing={2}
      >
        <Box
          sx={{
            paddingTop: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            backgroundColor: '#fff',
            zIndex: 100,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <Typography fontWeight="bold" fontSize="20px">
            Địa chỉ của tôi
          </Typography>
          <IconButton
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {editMode ? (
          <AddressForm
            setEditMode={setEditMode}
            currentAddress={editMode}
            refetchAddress={refetchAddress}
          />
        ) : (
          <>
            <Stack sx={{ marginBottom: 2 }} direction="column">
              {renderListAddress()}

              <Button
                startIcon={<AddIcon />}
                sx={{ width: 'fit-content' }}
                variant="outlined"
                onClick={() => setEditMode(true)}
              >
                Thêm địa chỉ mới
              </Button>
            </Stack>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                position: 'sticky',
                bottom: 0,
                backgroundColor: '#fff',
                paddingBottom: 2,
                marginTop: 0,
                paddingTop: 2,
                borderTop: '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <LoadingButton
                loading={isLoading}
                onClick={() => handleSubmit()}
                variant="contained"
              >
                Xác nhận
              </LoadingButton>
            </Box>
          </>
        )}
      </Stack>
      <ConfirmModal
        open={showConfirm}
        handleClose={() => {
          setShowConfirm(false);
        }}
        handleConfirm={() => {
          setShowConfirm(false);
          if (deletingAddressId) {
            deleteAddressFunc(deletingAddressId);
          }
          handleClose();
        }}
        contentHeader="Xác nhận xóa"
        textContent="Bạn có chắc chắn xóa địa chỉ này?"
        confirmContent="Có"
        cancelContent="Không"
      />
    </Dialog>
  );
};

export default AddressModal;
