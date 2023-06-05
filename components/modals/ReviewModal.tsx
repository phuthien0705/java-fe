import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useMutation } from 'react-query';
import { deleteAddress, setDefaultAddress } from '@/apis/address.api';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import LoadingButton from '@mui/lab/LoadingButton';
import AddressForm from '../forms/AddressForm';
import {
  IAddressModal,
  IReviewModal,
} from '@/interfaces/compontents/modal.interface';
import { useToast } from '@/hooks/useToast';
import { IEachAddressOfUserData } from '@/interfaces/address.interface';
import ConfirmModal from './ConfirmModal';

const ReviewModal: React.FunctionComponent<IReviewModal> = ({
  open,
  handleClose,
  bookId,
}) => {
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);

  const [rating, setRating] = useState<number | null>(null);

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    value: number | null
  ) => {
    setRating(value);
  };

  const [value, setValue] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean | { data: any }>(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event?.target as any).value);
  };

  const { mutate: changeDefaultAddressFunc, isLoading } = useMutation(
    (id: string) => setDefaultAddress(id, true),
    {
      onSuccess: () => {
        handleClose();
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình thêm đánh giá sản phẩm',
        });
      },
    }
  );

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
            Đánh giá sản phẩm
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
            refetchAddress={() => {}}
          />
        ) : (
          <>
            <Stack sx={{ marginBottom: 2 }} direction="column">
              <Box
                sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}
              >
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ marginRight: 1 }}
                >
                  Chọn số sao:
                </Typography>
                <Rating
                  name="rating"
                  value={2}
                  onChange={handleRatingChange}
                  precision={1}
                  size="large"
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
              </Box>
              <Box
                sx={{ alignItems: 'center', marginBottom: 1 }}
              >
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ marginRight: 1, marginBottom: 1 }}
                >
                  Nhận xét:
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  placeholder="Nhập lời nhận xét của bạn..."
                  fullWidth
                  variant="outlined"
                />
              </Box>
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
              <LoadingButton loading={isLoading} variant="contained">
                Hoàn thành
              </LoadingButton>
            </Box>
          </>
        )}
      </Stack>
    </Dialog>
  );
};

export default ReviewModal;
