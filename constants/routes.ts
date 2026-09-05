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
    MONITORING: '/caregiver/monitoring',
    ROUTINES: '/caregiver/routines',
    STORIES: '/caregiver/stories',
    ALERTS: '/caregiver/alerts',
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
