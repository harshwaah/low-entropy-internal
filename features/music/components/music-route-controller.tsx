'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useMusic } from '../hooks/use-music';
import type { MusicMode } from '../types';

const COGNITIVE_GAME_ROUTES = new Set([
  '/patient/activities/memory-match',
  '/patient/activities/what-comes-next',
  '/patient/activities/find-the-object',
]);

export function getMusicModeForPathname(pathname: string): MusicMode {
  return COGNITIVE_GAME_ROUTES.has(pathname) ? 'cognitive' : 'calm';
}

export function MusicRouteController() {
  const pathname = usePathname();
  const { setMode } = useMusic();

  useEffect(() => {
    void setMode(getMusicModeForPathname(pathname));
  }, [pathname, setMode]);

  return null;
}
