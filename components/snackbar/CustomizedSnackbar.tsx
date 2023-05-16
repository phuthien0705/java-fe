import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from '../../store/snackbarReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbar: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const openSnackbar = useSelector((state: any) => state.snackbar.open);
  const messageSnackbar = useSelector((state: any) => state.snackbar.message);
  const typeSnackbar = useSelector((state: any) => state.snackbar.type);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={openSnackbar}
      autoHideDuration={2000}
      onClose={() => {
        dispatch(closeSnackbar());
      }}
    >
      <Alert
        onClose={() => {
          dispatch(closeSnackbar());
        }}
        severity={typeSnackbar || 'success'}
        sx={{ width: '100%', color: '#fff' }}
      >
        {messageSnackbar}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbar;
