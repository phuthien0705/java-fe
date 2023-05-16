import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: true,
  isOpen: [],
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.open = !state.open;
    },
    setMenu: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { toggleSidebar, setMenu } = sidebarSlice.actions;

export default sidebarSlice.reducer;
