/**
 * Hackathon Team Contributor & Module Ownership Matrix
 * 
 * Defines clear bounded contexts for the 6 contributors to enable rapid
 * parallel development with zero merge conflicts.
 */

export interface ContributorOwnership {
  id: string;
  contributorName: string;
  roleTitle: string;
  primaryDomain: string;
  ownedFolders: string[];
  ownedFeatures: string[];
  keyDeliverables: string[];
}

export const HACKATHON_TEAM_MATRIX: ContributorOwnership[] = [
  {
    id: 'contributor-1',
    contributorName: 'Contributor 1 (Memories & Reminiscence Lead)',
    roleTitle: 'Frontend & Reminiscence Engineer',
    primaryDomain: 'Memory Scrapbook & Reminiscence Therapy',
    ownedFolders: ['features/memories/*', 'app/(patient)/patient/memories/*'],
    ownedFeatures: ['Photo reminiscence viewer', 'Audio voice note playback', 'Gentle memory cues'],
    keyDeliverables: ['Accessible multi-sensory scrapbook cards', 'Audio player component', 'Memory trigger service'],
  },
  {
    id: 'contributor-2',
    contributorName: 'Contributor 2 (Routines & Circadian Rhythm Lead)',
    roleTitle: 'Routine & Accessibility Engineer',
    primaryDomain: 'Daily Schedule & Circadian Alignment',
    ownedFolders: ['features/routines/*', 'app/(patient)/patient/routines/*'],
    ownedFeatures: ['Step-by-step routine checklists', 'Circadian orientation banner', 'Medication prompt scaffolding'],
    keyDeliverables: ['High-contrast step cards', 'Orientation time provider', 'Routine state machine hook'],
  },
  {
    id: 'contributor-3',
    contributorName: 'Contributor 3 (Cognitive Engagement & Activities Lead)',
    roleTitle: 'Interactive & Engagement Engineer',
    primaryDomain: 'Gentle Cognitive Stimulation',
    ownedFolders: ['features/cognition/*', 'app/(patient)/patient/games/*'],
    ownedFeatures: ['Errorless learning games', 'Music reminiscence quiz', 'Familiar item identification'],
    keyDeliverables: ['Frustration-free game cards', 'Adaptive scoring contract', 'Engagement telemetry events'],
  },
  {
    id: 'contributor-4',
    contributorName: 'Contributor 4 (Caregiver Experience Lead)',
    roleTitle: 'Caregiver Portal & Monitoring Engineer',
    primaryDomain: 'Family & Primary Caregiver Workflow',
    ownedFolders: ['features/caregiver/*', 'app/(caregiver)/caregiver/*'],
    ownedFeatures: ['Remote status timeline', 'Memory vault content upload', 'Routine configuration editor'],
    keyDeliverables: ['Caregiver dashboard widgets', 'Alerts stream drawer', 'Caregiver respite resources'],
  },
  {
    id: 'contributor-5',
    contributorName: 'Contributor 5 (Practitioner & Analytics Lead)',
    roleTitle: 'Clinical Oversight & Insights Engineer',
    primaryDomain: 'Geriatric & Neurological Oversight',
    ownedFolders: ['features/practitioner/*', 'app/(practitioner)/practitioner/*'],
    ownedFeatures: ['Cognitive score longitudinal charts', 'Patient cohort filter', 'Clinical visit summary export'],
    keyDeliverables: ['Recharts metric widgets', 'Clinical note drawer', 'Standardized assessment models'],
  },
  {
    id: 'contributor-6',
    contributorName: 'Contributor 6 (AI Architecture & Core Platform Lead)',
    roleTitle: 'Staff Architect & AI Platform Engineer',
    primaryDomain: 'Gemini Companion Engine & Core Scaffolding',
    ownedFolders: ['services/*', 'features/companion/*', 'lib/*', 'components/ui/*'],
    ownedFeatures: ['Server-side Gemini orchestration', 'Shared UI primitives', 'Global types & contracts'],
    keyDeliverables: ['Gemini prompt templates', 'Empathetic voice response schema', 'CI/CD & Vercel deployment integrity'],
  },
];
