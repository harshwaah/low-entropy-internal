'use client';

import React, { useState } from 'react';
import {
  SAMPLE_MEMORIES,
  MEMORY_CATEGORIES,
} from '@/features/memories/data/sample-memories';
import { MemoryItem, MemoryCategoryKey } from '@/features/memories/types';
import { AddMemoryModal } from '@/features/caregiver';
import {
  BookHeart,
  Plus,
  Heart,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Mascot } from '@/components/shared/mascot';

export default function CaregiverMemoriesPage() {
  const [memories, setMemories] = useState<MemoryItem[]>(SAMPLE_MEMORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAddMemory = (newMem: {
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
  }) => {
    const created: MemoryItem = {
      id: `mem-caregiver-${Date.now()}`,
      patientId: 'patient-kamal-sharma',
      title: newMem.title,
      shortDescription: newMem.story.slice(0, 100) + '...',
      story: [newMem.story],
      dateEra: newMem.dateEra,
      location: newMem.location,
      category: newMem.category,
      emotionalTag: 'Warm Nostalgia',
      companionIntro: `Papa, here is a lovely memory curated by ${newMem.familyNote.author}.`,
      coverImage: newMem.coverImage,
      imageAlt: newMem.title,
      familiarPeople: [newMem.familyNote.author],
      familyNotes: [
        {
          id: `fn-${Date.now()}`,
          author: newMem.familyNote.author,
          relation: newMem.familyNote.relation,
          text: newMem.familyNote.text,
          date: 'Just now',
          avatarInitials: newMem.familyNote.author.slice(0, 2).toUpperCase(),
          avatarBg: 'bg-rose-100 text-rose-800',
        },
      ],
      createdAt: new Date().toISOString(),
    };

    setMemories([created, ...memories]);
    showToast(`Added "${created.title}" to Papa's memory vault!`);
  };

  const filteredMemories = memories.filter((m) => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.story.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.location && m.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const recentlyAdded = memories.slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="caregiver-memories-toast"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-brand-dark px-5 py-3 text-xs font-bold text-white shadow-xl animate-fade-in"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
            <BookHeart className="h-4 w-4" />
            <span>Family Scrapbook Curation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight mt-0.5">
            Memory Vault Management
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Preserve family photographs, nostalgic stories, and love notes that comfort and orient Papa.
          </p>
        </div>

        <button
          type="button"
          id="add-memory-button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-dark/90 transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Memory</span>
        </button>
      </div>

      {/* Companion Scrapbook Guidance Callout */}
      <div className="rounded-3xl bg-brand-light/70 border border-brand-primary/20 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
        <div className="shrink-0">
          <Mascot size="sm" state="holding-book" />
        </div>
        <div className="flex-1 text-xs sm:text-sm leading-relaxed text-brand-text">
          <h3 className="font-bold text-brand-dark text-sm sm:text-base">
            Reminiscence Therapy Philosophy
          </h3>
          <p className="mt-1 text-brand-muted">
            Memories are not cognitive quizzes. They provide emotional grounding, ease sundowning restlessness, and remind Papa of his deep, loving family connections. Stories with family notes stimulate both visual and emotional memory pathways.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 text-xs font-bold bg-white rounded-2xl px-4 py-3 border border-brand-border/80 shadow-xs">
          <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
          <div>
            <span className="block text-brand-dark">{memories.length} Keepsakes</span>
            <span className="text-[11px] text-brand-muted font-normal">Active in rotation</span>
          </div>
        </div>
      </div>

      {/* Recently Added Memories Section */}
      <section aria-label="Recently Added Memories" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-brand-dark">
            Recently Added & Highlighted Memories
          </h2>
          <span className="text-xs text-brand-muted">
            Showing top {recentlyAdded.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentlyAdded.map((mem) => (
            <div
              key={`recent-${mem.id}`}
              className="rounded-2xl bg-white border border-brand-border/80 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 rounded-xl overflow-hidden border border-slate-200">
                  <Image
                    src={mem.coverImage}
                    alt={mem.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 rounded-md bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold text-brand-dark shadow-xs">
                    {mem.dateEra}
                  </div>
                </div>
                <h3 className="mt-3 text-sm font-bold text-brand-dark line-clamp-1">
                  {mem.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {mem.shortDescription || mem.story[0]}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-brand-muted">
                <span className="capitalize text-brand-primary font-bold">
                  {mem.category}
                </span>
                <span className="flex items-center gap-1 font-semibold text-rose-800">
                  <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />
                  {mem.familyNotes.length} notes
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter and Search Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap',
              selectedCategory === 'all'
                ? 'bg-brand-dark text-white shadow-xs'
                : 'bg-white border border-slate-200 text-brand-text hover:bg-slate-50'
            )}
          >
            All Chapters ({memories.length})
          </button>
          {MEMORY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap',
                selectedCategory === cat.id
                  ? 'bg-brand-dark text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-brand-text hover:bg-slate-50'
              )}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories, places, era..."
            className="w-full rounded-full border border-slate-200 bg-white pl-9 pr-3.5 py-1.5 text-xs text-brand-dark focus:border-brand-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Existing Memories Grid */}
      <section aria-label="Existing Memories Grid">
        {filteredMemories.length === 0 ? (
          <div className="rounded-3xl bg-white border border-brand-border/80 p-12 text-center">
            <BookHeart className="mx-auto h-8 w-8 text-slate-300" />
            <h3 className="mt-2 text-sm font-bold text-brand-dark">No memories match your filter</h3>
            <p className="mt-1 text-xs text-brand-muted">Try choosing another chapter or reset search query.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 rounded-full bg-brand-light px-4 py-1.5 text-xs font-bold text-brand-dark hover:bg-brand-primary hover:text-white transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemories.map((memory) => (
              <div
                key={memory.id}
                id={`memory-card-${memory.id}`}
                className="group rounded-3xl bg-white border border-brand-border/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={memory.coverImage}
                      alt={memory.imageAlt || memory.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    
                    {/* Top Era & Category Tags */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                      <span className="rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-brand-dark shadow-xs capitalize">
                        {memory.category}
                      </span>
                      <span className="rounded-full bg-brand-dark/80 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                        {memory.dateEra}
                      </span>
                    </div>

                    {/* Bottom Location */}
                    {memory.location && (
                      <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-[11px] font-medium text-white/95">
                        <MapPin className="h-3 w-3" />
                        <span>{memory.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-brand-dark leading-snug">
                      {memory.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {memory.story[0]}
                    </p>
                  </div>
                </div>

                {/* Love Notes & Metadata Footer */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                  <div className="pt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-brand-muted">
                      <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                      <span className="font-semibold text-rose-900">
                        {memory.familyNotes.length} Family {memory.familyNotes.length === 1 ? 'Note' : 'Notes'}
                      </span>
                    </div>
                    <span className="rounded-full bg-brand-light px-2.5 py-0.5 text-[10px] font-bold text-brand-dark">
                      {memory.emotionalTag}
                    </span>
                  </div>

                  {/* Family Note Snippet if exists */}
                  {memory.familyNotes.length > 0 && (
                    <div className="mt-2.5 rounded-xl bg-rose-50/70 border border-rose-200/60 p-2 text-[11px] text-rose-950">
                      <span className="font-bold">{memory.familyNotes[0].author}: </span>
                      <span className="italic">&ldquo;{memory.familyNotes[0].text}&rdquo;</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add Memory Modal */}
      <AddMemoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMemory={handleAddMemory}
      />

    </div>
  );
}
