export const useToast = (dispatch: any, toggleSnackbar: any) => {
  return ({ type, message }: { type: string; message: string }) => {
    dispatch(toggleSnackbar({ open: true, message, type }));
  };
};
