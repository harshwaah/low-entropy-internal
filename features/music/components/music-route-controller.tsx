'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useMusic } from '../hooks/use-music';
import type { MusicMode } from '../types';

const COGNITIVE_GAME_ROUTES = new Set([
  '/patient/activities/memory-match',
  '/patient/activities/what-comes-next',
  '/patient/activities/find-the-object',
  '/patient/activities/quick-pick-trail',
]);

export function getMusicModeForPathname(pathname: string): MusicMode {
  if (pathname.includes('/memory-trail')) {
    return 'memory-trail';
  }
  if (COGNITIVE_GAME_ROUTES.has(pathname)) {
    return 'cognitive';
  }
  return 'calm';
}

export function MusicRouteController() {
  const pathname = usePathname();
  const { setMode } = useMusic();

  useEffect(() => {
    void setMode(getMusicModeForPathname(pathname));
  }, [pathname, setMode]);

  return null;
}
