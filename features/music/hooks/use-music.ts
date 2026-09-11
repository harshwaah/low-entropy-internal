'use client';

import { useContext } from 'react';

import { MusicContext, type MusicContextValue } from '../context/music-provider';

export function useMusic(): MusicContextValue {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error(
      'useMusic must be used within a MusicProvider. Wrap the relevant patient experience with <MusicProvider>.'
    );
  }

  return context;
}
