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
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import AddressForm from '../forms/AddressForm';
import { IReviewModal } from '@/interfaces/compontents/modal.interface';
import { useToast } from '@/hooks/useToast';
import { ImageOrderStyle } from '../orders/ImageOrderStyle';
import { addReview } from '@/apis/review.api';

const ReviewModal: React.FunctionComponent<IReviewModal> = ({
  open,
  handleClose,
  book,
  refetchReviews,
}) => {
  const dispatch = useDispatch();
  const toast = useToast(dispatch, toggleSnackbar);

  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');

  const [editMode, setEditMode] = useState<boolean | { data: any }>(false);

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    value: number | null
  ) => {
    setRating(value);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const { mutate: createReviewFunc, isLoading } = useMutation(
    (data: any) => addReview(data),
    {
      onSuccess: () => {
        toast({
          type: 'success',
          message: `Thêm đánh giá sản phẩm thành công`,
        });
        refetchReviews();
        handleClose();
      },
      onError: () => {
        toast({
          type: 'error',
          message: 'Xảy ra lỗi trong quá trình thêm đánh giá',
        });
      },
    }
  );

  const handleAddReview = () => {
    const reviewData = {
      rating: rating,
      comment: comment,
      bookId: book.id,
    };

    createReviewFunc(reviewData);
  };

  useEffect(() => {
    if (!open) {
      setRating(0);
      setComment('');
    }
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
              <Stack
                sx={{ position: 'relative', marginBottom: 1 }}
                direction="row"
              >
                <ImageOrderStyle
                  alt={book.name}
                  width="76"
                  height="76"
                  src={book.images}
                />
                <Typography
                  fontSize="14px"
                  color="black"
                  sx={{ marginLeft: 2, marginTop: 1 }}
                >
                  {book.name}
                </Typography>
              </Stack>
              <Box
                sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}
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
                  value={rating}
                  onChange={handleRatingChange}
                  precision={1}
                  size="large"
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
              </Box>
              <Box sx={{ alignItems: 'center', marginBottom: 1 }}>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ marginRight: 1, marginBottom: 1 }}
                >
                  Nhận xét:
                </Typography>
                <TextField
                  multiline
                  value={comment}
                  onChange={handleCommentChange}
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
              <Button
                variant="contained"
                disabled={!rating || !comment || isLoading}
                onClick={handleAddReview}
              >
                Hoàn thành
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </Dialog>
  );
};

export default ReviewModal;
