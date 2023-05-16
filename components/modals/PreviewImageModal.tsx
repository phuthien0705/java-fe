/* eslint-disable @next/next/no-img-element */
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export type TDataImage = {
  createdAt: string | null;
  deletedAt: string | null;
  isDeleted: boolean;
  url: string;
  __v: number;
  _id: string;
};

export const PreviewImageModal = ({
  isOpen,
  closeModal,
  data,
}: {
  isOpen: boolean;
  closeModal: Function;
  data: TDataImage[] | null;
}) => {
  const handleClose = () => {
    closeModal();
  };
  return (
    <Dialog onClose={handleClose} open={isOpen} maxWidth={'sm'}>
      <DialogTitle>Hình ảnh sản phẩm</DialogTitle>
      {data ? (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {data.map((item) => (
            <ImageListItem key={item._id}>
              <img
                src={`${item.url}`}
                srcSet={`${item.url}`}
                alt={item._id}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <p>Sản phẩm chưa có hình ảnh</p>
      )}
    </Dialog>
  );
};
