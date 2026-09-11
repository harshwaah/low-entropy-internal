'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Send, User, Lock, ArrowRight } from 'lucide-react';
import { ClinicalMessageThread } from '../types';

interface MessagesPortalViewProps {
  initialThreads: ClinicalMessageThread[];
}

export function MessagesPortalView({ initialThreads }: MessagesPortalViewProps) {
  const [threads, setThreads] = useState<ClinicalMessageThread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>(initialThreads[0]?.id || '');
  const [replyText, setReplyText] = useState('');

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSend = () => {
    if (!replyText.trim() || !activeThread) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'practitioner' as const,
      text: replyText.trim(),
      timestamp: 'Just now',
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? {
              ...t,
              lastMessage: newMsg.text,
              lastMessageTimestamp: 'Just now',
              messages: [...t.messages, newMsg],
            }
          : t
      )
    );
    setReplyText('');
  };

  return (
    <div className="flex flex-col w-full gap-6 text-[#151d19]">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#013625] tracking-tight">Clinical Messaging</h1>
        <p className="text-sm text-[#414944]">Direct secure communication with primary patient caregivers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-2xl shadow-xs border border-emerald-900/10 min-h-[550px]">
        {/* Left Thread List (4 cols) */}
        <div className="lg:col-span-4 border-r border-emerald-900/10 p-4 flex flex-col gap-2">
          <span className="text-xs uppercase font-bold text-[#717973] tracking-wider px-2 pb-1">Caregiver Conversations</span>
          {threads.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveThreadId(t.id)}
              className={`p-3 rounded-xl text-left transition-all flex flex-col gap-1 ${
                activeThread?.id === t.id
                  ? 'bg-[#1e4d3a] text-white shadow-xs'
                  : 'hover:bg-[#ecf6ee] text-[#151d19]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm truncate">{t.patientName}</span>
                <span className={`text-[10px] ${activeThread?.id === t.id ? 'text-white/80' : 'text-[#717973]'}`}>
                  {t.lastMessageTimestamp}
                </span>
              </div>
              <span className={`text-xs ${activeThread?.id === t.id ? 'text-white/90' : 'text-[#414944]'}`}>
                Caregiver: {t.caregiverName} ({t.caregiverRelation})
              </span>
              <p className={`text-xs line-clamp-1 mt-0.5 ${activeThread?.id === t.id ? 'text-white/80' : 'text-[#717973]'}`}>
                {t.lastMessage}
              </p>
            </button>
          ))}
        </div>

        {/* Right Active Message Chat (8 cols) */}
        {activeThread ? (
          <div className="lg:col-span-8 p-6 flex flex-col justify-between">
            {/* Header */}
            <div className="pb-4 border-b border-emerald-900/10 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#013625]">{activeThread.patientName}</h2>
                <p className="text-xs text-[#414944]">
                  Caregiver: <strong>{activeThread.caregiverName}</strong> ({activeThread.caregiverRelation})
                </p>
              </div>
              <Link
                href={`/practitioner/patient/${activeThread.patientId}`}
                className="text-xs font-semibold text-[#013625] hover:text-[#1e4d3a] inline-flex items-center gap-1"
              >
                <span>View Patient File</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Message Bubble Feed */}
            <div className="flex-1 my-4 space-y-3 overflow-y-auto max-h-[350px] pr-2">
              {activeThread.messages.map((m) => {
                const isPractitioner = m.sender === 'practitioner';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isPractitioner ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isPractitioner
                          ? 'bg-[#1e4d3a] text-white rounded-br-none'
                          : 'bg-[#ecf6ee] text-[#151d19] rounded-bl-none border border-emerald-900/5'
                      }`}
                    >
                      <p>{m.text}</p>
                    </div>
                    <span className="text-[10px] text-[#717973] mt-1 px-1">{m.timestamp}</span>
                  </div>
                );
              })}
            </div>

            {/* Input Row */}
            <div className="pt-3 border-t border-emerald-900/10 flex items-center gap-3">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your response to caregiver..."
                className="flex-1 p-3 bg-[#ecf6ee] rounded-xl text-xs text-[#151d19] focus:outline-none border border-emerald-900/10"
              />
              <button
                onClick={handleSend}
                className="p-3 bg-[#013625] hover:bg-[#1e4d3a] text-white rounded-xl transition-all shadow-xs"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
