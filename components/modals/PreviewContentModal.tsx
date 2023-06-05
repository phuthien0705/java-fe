import { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';

interface IPreviewContentModal {
  open: boolean;
  handleClose: Function;
  content: string;
}

const PreviewContentModal: FC<IPreviewContentModal> = ({
  open,
  handleClose,
  content,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="preview-content-dialog-title"
      aria-describedby="preview-content-dialog-description"
      fullWidth
      maxWidth="md"
      sx={{ '& .MuiPaper-root': { borderRadius: '14px' } }}
    >
      <DialogTitle
        sx={{ color: '#000', fontSize: '16px', paddingBottom: 1 }}
        id="preview-content-dialog-title"
      >
        Nội dung bài viết
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '16px' }}
          id="preview-content-dialog-description"
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewContentModal;
