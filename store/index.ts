import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarReducer';
import snackbarReducer from './snackbarReducer';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    snackbar: snackbarReducer,
  },
});
