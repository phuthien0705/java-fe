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
  const [data, setData] = useState([]);
  const [value, setValue] = useState<string[]>([]);
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
      setBackdrop(true);
      for (let key in fileList) {
        // the object is {File: 1, File: 2, length: 2, item: ...} so we need to skip loops where key is not number
        if (isNaN(parseFloat(key))) {
          continue;
        }
        promises.push(resizeImage(fileList[key]));
      }
      Promise.all(promises)
        .then((result) => {
          setBackdrop(false);
          setValues(result);
        })
        .catch(() => {
          setBackdrop(false);
        });
    }
  };

  const { mutate, isLoading } = useMutation(
    (data: any) => postFindBookByImage(data),
    {
      onSuccess: (res) => {
        setData(res as any);
      },
      onError: (err) => {
        setData([]);
      },
    }
  );

  const handleFindBook = () => {
    setIsSubmit(true);
  };

  useEffect(() => {
    setValue([]);
    setIsSubmit(false);
  }, [isOpen]);

  return (
    <Dialog onClose={handleClose} open={isOpen} maxWidth={'md'}>
      <DialogTitle>Nhập hình ảnh sản phẩm</DialogTitle>
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
        {isSubmit && !isLoading && data.length > 0 ? (
          <div>
            {data.map((item, index: number) => {
              return <div key={index}>{index}</div>;
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center p-2">
            Không tìm thấy sách
          </div>
        )}
        <div className="flex justify-center mt-4">
          {isSubmit ? (
            <Button
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
      </DialogContent>
    </Dialog>
  );
};
