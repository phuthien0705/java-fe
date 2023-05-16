import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import { FC } from 'react';
import { ICustomModal } from '@/interfaces/compontents/modal.interface';

const CustomModal: FC<ICustomModal> = ({
  children,
  handleClose,
  open,
  title,
}) => {
  const matches = useMediaQuery('(min-width:768px)');
  return matches ? (
    <Dialog fullWidth maxWidth="sm" onClose={() => handleClose()} open={open}>
      <Stack
        direction="column"
        sx={{ paddingLeft: 2, paddingRight: 2, paddingBottom: 2 }}
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
            {title}
          </Typography>
          <IconButton
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>{children}</Box>
      </Stack>
    </Dialog>
  ) : (
    <Drawer
      open={open}
      anchor="bottom"
      onClose={() => handleClose()}
      PaperProps={{
        square: false,
        style: {
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Typography fontWeight="bold" fontSize="20px">
          {title}
        </Typography>
        <IconButton
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: 2 }}>{children}</Box>
    </Drawer>
  );
};

export default CustomModal;
