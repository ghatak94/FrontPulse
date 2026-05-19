'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { setTheme } from './slices/uiSlice';

export default function StoreProvider({ children }) {
  // Check system preference on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      store.dispatch(setTheme(isDark));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
