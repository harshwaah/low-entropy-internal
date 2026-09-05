'use client';

import { usePathname } from 'next/navigation';
import { UserRole } from '@/types/user';

export function useActivePortal(): {
  role: UserRole | 'public';
  isPatient: boolean;
  isCaregiver: boolean;
  isPractitioner: boolean;
  pathname: string;
} {
  const pathname = usePathname() || '/';

  const isPatient = pathname.startsWith('/patient');
  const isCaregiver = pathname.startsWith('/caregiver');
  const isPractitioner = pathname.startsWith('/practitioner');

  let role: UserRole | 'public' = 'public';
  if (isPatient) role = 'patient';
  else if (isCaregiver) role = 'caregiver';
  else if (isPractitioner) role = 'practitioner';

  return {
    role,
    isPatient,
    isCaregiver,
    isPractitioner,
    pathname,
  };
}
