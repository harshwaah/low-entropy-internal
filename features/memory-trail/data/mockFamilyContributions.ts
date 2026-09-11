import { FamilyContribution } from '../types';

export const MOCK_FAMILY_CONTRIBUTIONS: FamilyContribution[] = [
  {
    id: 'fc-daughter-photo',
    patientId: 'patient-1',
    locationId: 'childhood-home',
    type: 'photo',
    contentUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    photoCaption: '“This is one of our favourite days together.”',
    contributedBy: 'Ananya',
    relationship: 'Daughter',
    createdAt: '2 days ago',
  },
  {
    id: 'fc-son-audio',
    patientId: 'patient-1',
    locationId: 'relatives-house',
    type: 'audio',
    contentUrl: '',
    audioDuration: '0:15',
    photoCaption: '“Thinking of you always.”',
    contributedBy: 'Rohan',
    relationship: 'Son',
    createdAt: '5 days ago',
  },
  {
    id: 'fc-granddaughter-text',
    patientId: 'patient-1',
    locationId: 'local-market',
    type: 'text',
    contentText: '“Grandma, I bought your favourite marigolds from the Sunday market today!”',
    contributedBy: 'Riya',
    relationship: 'Granddaughter',
    createdAt: '1 week ago',
  },
];
