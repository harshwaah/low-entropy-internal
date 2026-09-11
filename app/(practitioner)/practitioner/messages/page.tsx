import React from 'react';
import { practitionerService, MessagesPortalView } from '@/features/practitioner';

export default async function PractitionerMessagesPage() {
  const threads = await practitionerService.getMessages();

  return (
    <div className="max-w-7xl mx-auto">
      <MessagesPortalView initialThreads={threads} />
    </div>
  );
}
