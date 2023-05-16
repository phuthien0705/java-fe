import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: '',
  type: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    toggleSnackbar: (state, action) => {
      state.open = action.payload.open;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { toggleSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
