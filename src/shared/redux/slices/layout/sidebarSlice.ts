import { createSlice } from '@reduxjs/toolkit';

import { SidebarState } from '../../types';

const initialState: SidebarState = {
  isSidebarOpen: true
};

const sidebarSlice = createSlice({
  name: 'sidebarSlice',
  initialState,
  reducers: {
    setIsSidebarOpen: (state, actions) => {
      state.isSidebarOpen = actions.payload;
    }
  }
});

export const { setIsSidebarOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
