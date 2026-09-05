import React from 'react';
import { PlaceholderModule } from '@/components/shared/placeholder-module';
import { BookOpen, Clock, Sparkles, MessageCircleHeart } from 'lucide-react';

export default function PatientPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900">
        <p className="font-semibold text-sm text-amber-950">
          Patient Experience Scaffolding
        </p>
        <p className="mt-1 text-amber-800 leading-relaxed">
          Designed with a sensory-calm palette, large touch targets, simplified cognitive pathways, and errorless interactions.
        </p>
      </div>

      <div className="space-y-3">
        <PlaceholderModule
          title="Daily Companion (Voice & Text)"
          description="Empathetic, soothing conversational companion that assists with orientation and reassuring conversations."
          icon={MessageCircleHeart}
          featureKey="features/companion"
          assignedTo="Contributor 6 (AI Architecture)"
          targetFolder="features/companion/*"
          badgeText="Contributor 6"
          badgeVariant="warning"
        />

        <PlaceholderModule
          title="Memory Scrapbook & Voices"
          description="Reminiscence photo album with recorded voice notes from family members and calming nostalgic prompts."
          icon={BookOpen}
          featureKey="features/memories"
          assignedTo="Contributor 1 (Memories Lead)"
          targetFolder="features/memories/*"
          badgeText="Contributor 1"
          badgeVariant="default"
        />

        <PlaceholderModule
          title="Today's Gentle Rhythm"
          description="Step-by-step guidance for morning tea, medication check-ins, walking, and quiet reading time."
          icon={Clock}
          featureKey="features/routines"
          assignedTo="Contributor 2 (Routines Lead)"
          targetFolder="features/routines/*"
          badgeText="Contributor 2"
          badgeVariant="secondary"
        />

        <PlaceholderModule
          title="Gentle Brain Moments"
          description="Frustration-free cognitive games, nostalgic music listening, and familiar picture association."
          icon={Sparkles}
          featureKey="features/cognition"
          assignedTo="Contributor 3 (Cognition Lead)"
          targetFolder="features/cognition/*"
          badgeText="Contributor 3"
          badgeVariant="secondary"
        />
      </div>
    </div>
  );
}
