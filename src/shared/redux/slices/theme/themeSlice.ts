import { createSlice } from '@reduxjs/toolkit';

import { RootState, ThemeState } from '../../types';

const persistRoot = localStorage.getItem('persist:root');

const initialState: ThemeState = {
  mytheme: 'light'
};

if (persistRoot) {
  // Parse the localStorage string
  const parsedPersistRoot: RootState = JSON.parse(persistRoot);

  // Convert `themeState` to its appropriate object format, if necessary
  if (typeof parsedPersistRoot.themeState === 'string') {
    parsedPersistRoot.themeState = JSON.parse(parsedPersistRoot.themeState);
  }

  // Check if the theme is dark
  if (parsedPersistRoot.themeState.mytheme === 'dark') {
    document.documentElement.classList.add('dark');
    initialState.mytheme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    initialState.mytheme = 'light';
  }
} else {
  // If there is no persistRoot, Use the user's preference for dark mode
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
    initialState.mytheme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    initialState.mytheme = 'light';
  }
}

const themeSlice = createSlice({
  name: 'mytheme',
  initialState,
  reducers: {
    toggleTheme: (state: ThemeState) => {
      state.mytheme = state.mytheme === 'light' ? 'dark' : 'light';

      if (state.mytheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
