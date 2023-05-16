import { IConfirmModal } from '@/interfaces/compontents/modal.interface';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': { maxWidth: '320px', borderRadius: '14px' },
  },
});

const ConfirmModal: FC<IConfirmModal> = ({
  open,
  handleClose,
  handleConfirm,
  contentHeader = 'Thay đổi chưa lưu',
  textContent = 'Thay đổi của bạn chưa được lưu. Bạn vẫn muốn thoát mà không lưu?',
  confirmContent = 'Thoát',
  cancelContent = 'Ở lại',
}) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.root}
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ color: 'rgb(239,68,68)', fontSize: '16px', paddingBottom: 1 }}
        id="alert-dialog-title"
      >
        {contentHeader}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ color: 'rgba(0,0,0,0.6)', fontSize: '16px' }}
          id="alert-dialog-description"
        >
          {textContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ color: 'rgb(239,68,68)', fontSize: '16px' }}
          onClick={() => handleConfirm()}
        >
          {confirmContent}
        </Button>
        <Button
          sx={{ color: 'black', fontSize: '16px', marginLeft: '0 !important' }}
          onClick={() => handleClose()}
        >
          {cancelContent}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
