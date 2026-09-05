/**
 * Navigation Types
 */

import { ReactNode } from 'react';
import { UserRole } from './user';

export interface NavItem {
  label: string;
  href: string;
  iconName?: string;
  badge?: string | number;
  description?: string;
  isExternal?: boolean;
}

export interface PortalConfig {
  role: UserRole;
  portalTitle: string;
  portalDescription: string;
  baseRoute: string;
  primaryNavigation: NavItem[];
}
