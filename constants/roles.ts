import { PortalConfig } from '@/types/navigation';
import { ROUTES } from './routes';

export const PORTAL_CONFIGS: Record<'patient' | 'caregiver' | 'practitioner', PortalConfig> = {
  patient: {
    role: 'patient',
    portalTitle: 'Patient Companion',
    portalDescription: 'Distraction-free, accessible, warm daily companion experience',
    baseRoute: ROUTES.PATIENT.ROOT,
    primaryNavigation: [
      { label: 'Today', href: ROUTES.PATIENT.ROOT, iconName: 'Sun', description: "Today's rhythm & greeting" },
      { label: 'Memories', href: ROUTES.PATIENT.MEMORIES, iconName: 'BookOpen', description: 'Familiar photos & voices' },
      { label: 'Rhythm', href: ROUTES.PATIENT.ROUTINES, iconName: 'Clock', description: 'Gentle step-by-step guidance' },
      { label: 'Activities', href: ROUTES.PATIENT.GAMES, iconName: 'Sparkles', description: 'Gentle cognitive moments' },
    ],
  },
  caregiver: {
    role: 'caregiver',
    portalTitle: 'Caregiver Portal',
    portalDescription: 'Empathetic oversight, remote routine management, and emotional reassurance',
    baseRoute: ROUTES.CAREGIVER.ROOT,
    primaryNavigation: [
      { label: 'Overview', href: ROUTES.CAREGIVER.ROOT, iconName: 'Activity', description: 'Patient live status' },
      { label: 'Routines & Meds', href: ROUTES.CAREGIVER.ROUTINES, iconName: 'CalendarCheck', description: 'Schedule manager' },
      { label: 'Memory Vault', href: ROUTES.CAREGIVER.STORIES, iconName: 'HeartHandshake', description: 'Family stories & photos' },
      { label: 'Alerts', href: ROUTES.CAREGIVER.ALERTS, iconName: 'Bell', badge: 'Active', description: 'Instant notification stream' },
    ],
  },
  practitioner: {
    role: 'practitioner',
    portalTitle: 'Clinical Oversight Portal',
    portalDescription: 'Evidence-based cognitive trends, adherence metrics, and longitudinal insights',
    baseRoute: ROUTES.PRACTITIONER.ROOT,
    primaryNavigation: [
      { label: 'Cohort Dashboard', href: ROUTES.PRACTITIONER.ROOT, iconName: 'Users', description: 'Active patient roster' },
      { label: 'Cognitive Trends', href: ROUTES.PRACTITIONER.TRENDS, iconName: 'LineChart', description: 'Longitudinal scores' },
      { label: 'Clinical Reports', href: ROUTES.PRACTITIONER.REPORTS, iconName: 'FileText', description: 'Assessment outputs' },
      { label: 'Consult Notes', href: ROUTES.PRACTITIONER.NOTES, iconName: 'ClipboardList', description: 'Interdisciplinary logs' },
    ],
  },
};
