import React from 'react';
import Link from 'next/link';
import { Mascot } from '@/components/shared/mascot';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function MemoryNotFound() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center text-center min-h-[60vh] space-y-6">
      <Mascot
        size="lg"
        state="encouraging"
        showSpeechBubble={true}
        speechPosition="top-right"
        speechText={<>Let us return to your<br/>warm scrapbook! 📖</>}
      />

      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-extrabold text-brand-dark">
          Moment Not Found
        </h1>
        <p className="text-lg text-brand-muted font-medium">
          We couldn&apos;t find this specific memory, but many more beautiful moments are waiting in your family album.
        </p>
      </div>

      <Link href="/patient/memories">
        <Button size="lg" className="rounded-full text-base h-14 px-8 font-bold shadow-md hover:scale-105 transition-all">
          <BookOpen className="w-5 h-5 mr-2" />
          Back to Scrapbook
        </Button>
      </Link>
    </div>
  );
}
