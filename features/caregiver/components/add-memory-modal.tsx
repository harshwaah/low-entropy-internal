'use client';

import React, { useState } from 'react';
import {
  X,
  Upload,
  Heart,
  Calendar,
  MapPin,
  Sparkles,
  Check,
  Image as ImageIcon,
} from 'lucide-react';
import Image from 'next/image';
import { MemoryCategoryKey } from '@/features/memories/types';

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMemory: (memory: {
    title: string;
    category: MemoryCategoryKey;
    story: string;
    dateEra: string;
    location: string;
    familyNote: {
      author: string;
      relation: string;
      text: string;
    };
    coverImage: string;
  }) => void;
}

const PRESET_PHOTOS = [
  {
    name: 'Family Garden',
    url: 'https://picsum.photos/seed/familygarden/800/600',
  },
  {
    name: 'Old Terrace',
    url: 'https://picsum.photos/seed/terracechai/800/600',
  },
  {
    name: 'Vintage Festival',
    url: 'https://picsum.photos/seed/diwalilight/800/600',
  },
  {
    name: 'Grandkids Laughter',
    url: 'https://picsum.photos/seed/grandkids/800/600',
  },
];

export function AddMemoryModal({ isOpen, onClose, onAddMemory }: AddMemoryModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MemoryCategoryKey>('family');
  const [story, setStory] = useState('');
  const [dateEra, setDateEra] = useState('Winter 1985');
  const [location, setLocation] = useState('New Delhi');
  const [noteAuthor, setNoteAuthor] = useState('Priya');
  const [noteRelation] = useState('Daughter');
  const [noteText, setNoteText] = useState('Papa, we cherish these memories of your laughter so much! ❤️');
  const [selectedPhoto, setSelectedPhoto] = useState(PRESET_PHOTOS[0].url);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddMemory({
      title: title.trim(),
      category,
      story: story.trim() || 'A beautiful family keepsake preserved for daily reminiscence.',
      dateEra: dateEra.trim() || 'Circa 1980s',
      location: location.trim() || 'India',
      familyNote: {
        author: noteAuthor.trim() || 'Priya',
        relation: noteRelation,
        text: noteText.trim() || 'We love you and remember this warm day!',
      },
      coverImage: selectedPhoto,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div
        id="add-memory-dialog"
        className="relative w-full max-w-2xl rounded-3xl bg-white border border-brand-border p-6 sm:p-8 shadow-2xl transition-all my-8"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-all"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-brand-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Family Scrapbook Curator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-dark mt-1">
            Add a Cherished Memory
          </h2>
          <p className="text-xs text-brand-muted mt-0.5">
            Add a nostalgic photo and heartfelt story for Papa&apos;s companion scrapbook.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          
          {/* Photo Selector / Placeholder */}
          <div>
            <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">
              Memory Photograph
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PRESET_PHOTOS.map((photo) => (
                <button
                  type="button"
                  key={photo.name}
                  onClick={() => setSelectedPhoto(photo.url)}
                  className={`relative aspect-4/3 rounded-xl overflow-hidden border-2 transition-all group ${
                    selectedPhoto === photo.url
                      ? 'border-brand-primary ring-2 ring-brand-primary/30 shadow-xs'
                      : 'border-slate-200 opacity-75 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={photo.url}
                    alt={photo.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {selectedPhoto === photo.url && (
                    <div className="absolute inset-0 bg-brand-primary/30 flex items-center justify-center">
                      <div className="rounded-full bg-white p-1 shadow-sm">
                        <Check className="h-3.5 w-3.5 text-brand-primary font-bold" />
                      </div>
                    </div>
                  )}
                  <span className="absolute bottom-0 inset-x-0 bg-slate-900/75 text-[10px] text-white font-medium py-0.5 text-center">
                    {photo.name}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2 text-[11px] text-brand-muted">
              <Upload className="h-3.5 w-3.5 text-brand-primary" />
              <span>Caregiver photo upload preview active • Preset selected</span>
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="memory-title-input" className="block text-xs font-bold text-brand-dark mb-1">
                Memory Title *
              </label>
              <input
                id="memory-title-input"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sunday Samosas at Old Delhi with Ma"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label htmlFor="memory-category-select" className="block text-xs font-bold text-brand-dark mb-1">
                Life Chapter / Category
              </label>
              <select
                id="memory-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as MemoryCategoryKey)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              >
                <option value="family">👨‍👩‍👧 Family Keepsakes</option>
                <option value="childhood">🏠 Childhood & Courtyards</option>
                <option value="school">🏫 School & College Days</option>
                <option value="celebrations">🎂 Festivals & Celebrations</option>
                <option value="places">🌳 Favorite Places & Travel</option>
                <option value="things">❤️ Cherished Possessions & Melodies</option>
              </select>
            </div>
          </div>

          {/* Era & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="memory-era-input" className="block text-xs font-bold text-brand-dark mb-1">
                Approximate Era / Year
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  id="memory-era-input"
                  type="text"
                  value={dateEra}
                  onChange={(e) => setDateEra(e.target.value)}
                  placeholder="e.g. Winter 1985 or Early 90s"
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="memory-location-input" className="block text-xs font-bold text-brand-dark mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  id="memory-location-input"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Greater Kailash, Delhi or Shimla"
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2.5 text-xs text-brand-dark focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>

          {/* Memory Story */}
          <div>
            <label htmlFor="memory-story-input" className="block text-xs font-bold text-brand-dark mb-1">
              Memory Story Narrative *
            </label>
            <textarea
              id="memory-story-input"
              rows={3}
              required
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Tell the warm story of this moment in vivid, gentle detail..."
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-brand-dark focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary leading-relaxed"
            />
          </div>

          {/* Family Love Note */}
          <div className="rounded-2xl bg-rose-50/70 border border-rose-200/60 p-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 mb-2">
              <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
              <span>Family Love Note (Affectionate message shown on memory card)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  value={noteAuthor}
                  onChange={(e) => setNoteAuthor(e.target.value)}
                  placeholder="Your Name (e.g. Priya)"
                  className="w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs text-slate-800"
                />
              </div>
              <div className="sm:col-span-2">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Affectionate note from family..."
                  className="w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-add-memory-btn"
              className="rounded-full bg-brand-dark px-6 py-2.5 text-xs font-bold text-white hover:bg-brand-dark/90 shadow-sm transition-all"
            >
              Save to Scrapbook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
