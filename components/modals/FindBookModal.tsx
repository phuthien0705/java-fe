/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  FormControl,
  IconButton,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { ListImage } from '../swiper/ListImage';
import { PhotoCamera } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleSnackbar } from '@/store/snackbarReducer';
import { MainContext } from '@/pages/_app';
import { resizeImage } from '@/utils/fileUtils';
import { useMutation } from 'react-query';
import { postFindBookByImage } from '@/apis/recommendation.api';
import { IEachProductData } from '@/interfaces/compontents/product.interface';
import ProductCardItems from '../cards/products/ProductCardItems';
import ProductCardItem from '../cards/products/ProductCardItem';

export const FindBookModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: Function;
}) => {
  const dispatch = useDispatch();
  const toast = ({ type, message }: { type: string; message: string }) => {
    dispatch(toggleSnackbar({ open: true, message, type }));
  };
  const handleClose = () => {
    closeModal();
  };
  const { setBackdrop } = useContext(MainContext);
  const [data, setData] = useState<IEachProductData[]>([]);
  const [value, setValue] = useState<File[]>([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const onSelectImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    setValues: Function
  ) => {
    const promises: Promise<string>[] = [];
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      const numberOfImage: number = Object.keys(fileList).length;
      if (numberOfImage > 15) {
        toast({
          type: 'warning',
          message: 'Bạn có thể chọn tối đa 15 ảnh',
        });
        return;
      }
      for (let key in fileList) {
        // the object is {File: 1, File: 2, length: 2, item: ...} so we need to skip loops where key is not number
        if (isNaN(parseFloat(key))) {
          continue;
        }
        promises.push(resizeImage(fileList[key]));
      }
      setValue((prev) => [fileList[0]]);
    }
  };

  const { mutate, isLoading } = useMutation(
    (data: FormData) => postFindBookByImage(data),
    {
      onSuccess: (res) => {
        setData(res);
        setIsSubmit(true);
      },
      onError: (err) => {
        setData([]);
        setIsSubmit(true);
      },
    }
  );

  const handleFindBook = () => {
    let formData = new FormData();
    formData.append('image', value[0]);
    mutate(formData);
  };

  useEffect(() => {
    setValue([]);
    setIsSubmit(false);
  }, [isOpen]);

  return (
    <Dialog onClose={handleClose} open={isOpen} maxWidth={'md'}>
      <DialogTitle>
        <div className="flex justify-between items-center gap-4">
          {isSubmit ? 'Kết quả tìm kiếm' : 'Nhập hình ảnh sản phẩm'}
          {isSubmit ? (
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                setIsSubmit(false);
                setValue([]);
              }}
            >
              Tìm lại
            </Button>
          ) : (
            <Button variant="contained" onClick={handleFindBook}>
              Tìm kiếm
            </Button>
          )}
        </div>
      </DialogTitle>
      <DialogContent>
        {!isSubmit && (
          <FormControl fullWidth>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                position: 'relative',
                backgroundColor: '#fafafa',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                '&:hover': {
                  border: '1px solid #000',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: !!value ? 'row' : 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  columnGap: '0.5rem',
                  rowGap: '0.5rem',
                }}
              >
                <div className="w-[300px] height-[300px] mt-3">
                  {value.length !== 0 ? (
                    <ListImage listImage={value} />
                  ) : (
                    <div className="mb-3">Chưa có hình ảnh</div>
                  )}
                </div>
                <IconButton
                  sx={{
                    width: 'fit-content',
                    height: 'fit-content',
                    padding: 0,
                  }}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    multiple
                    id="outlined-adornment-book_image"
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => onSelectImage(e, setValue)}
                  />
                  <PhotoCamera />
                </IconButton>
              </Box>
            </Box>
          </FormControl>
        )}
        {isSubmit && isLoading && (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        )}
        {isSubmit && !isLoading && data.length > 0 && (
          <Box sx={{ p: 1 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                columnGap: '5px',
                rowGap: '5px',
              }}
            >
              {data.map((product, index: number) => {
                return (
                  <ProductCardItem
                    key={index}
                    product={product}
                    index={index}
                  />
                );
              })}
            </div>
          </Box>
        )}
        {isSubmit && !isLoading && data.length === 0 && (
          <div className="flex justify-center items-center p-2">
            Không tìm thấy sách
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
