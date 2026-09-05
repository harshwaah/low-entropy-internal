/**
 * Centralized Route Map
 * 
 * Guarantees type safety across route transitions and prevents hardcoded URL typos.
 */

export const ROUTES = {
  HOME: '/',
  PATIENT: {
    ROOT: '/patient',
    MEMORIES: '/patient/memories',
    ROUTINES: '/patient/routines',
    GAMES: '/patient/games',
    COMPANION: '/patient/companion',
  },
  CAREGIVER: {
    ROOT: '/caregiver',
    MEMORIES: '/caregiver/memories',
    REMINDERS: '/caregiver/reminders',
    MONITORING: '/caregiver/monitoring',
    ALERTS: '/caregiver/alerts',
    ROUTINES: '/caregiver/reminders',
    STORIES: '/caregiver/memories',
    WELLBEING: '/caregiver/wellbeing',
  },
  PRACTITIONER: {
    ROOT: '/practitioner',
    ROSTER: '/practitioner/roster',
    TRENDS: '/practitioner/trends',
    REPORTS: '/practitioner/reports',
    NOTES: '/practitioner/notes',
  },
} as const;

export type AppRoutes = typeof ROUTES;
