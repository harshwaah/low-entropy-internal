import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/shared/brand-logo';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HACKATHON_TEAM_MATRIX } from '@/constants/team';
import {
  Smartphone,
  LayoutDashboard,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  FolderTree,
  GitPullRequest,
  CheckCircle2,
  FileCode2,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function RootHomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <BrandLogo size="md" showTagline />
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              Architecture Foundation Ready
            </span>
            <div className="flex items-center gap-2 text-xs font-medium">
              <Badge variant="outline">Next.js 15 App Router</Badge>
              <Badge variant="outline">TypeScript</Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
        {/* Architectural Hero & Mission */}
        <section id="hero-section" className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-100/70 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-900">
            <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
            5-Day Hackathon Architecture Foundation • 6 Contributors
          </div>
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              SmritiSaathi
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              An AI-assisted daily companion for dementia patients that helps preserve memories, maintain routines, encourage cognitive engagement, and strengthen caregiver support.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Feature-Based Architecture
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Zero Merge-Conflict Route Groups
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Vercel Deployment Target
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Strict Scope Scaffolding
            </span>
          </div>
        </section>

        {/* Section 1: Three Dedicated Route Experiences */}
        <section id="portal-experiences" className="space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Independent Experience Portals (Route Groups)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Each portal utilizes independent layouts, navigation schemes, and cognitive constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Patient Portal Card */}
            <Link
              id="portal-card-patient"
              href="/patient"
              className="group block rounded-xl border border-amber-200 bg-amber-50/40 p-6 transition-all hover:bg-amber-50/80 hover:border-amber-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-900">
                  <Smartphone className="h-6 w-6" />
                </div>
                <Badge variant="warning">Route: /patient</Badge>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-amber-900 flex items-center justify-between">
                <span>Patient Companion</span>
                <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1 text-amber-700" />
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                <strong>Mobile-first layout</strong> tailored for individuals with mild cognitive impairment. Low cognitive friction, large touch points, sensory-calm color tones, and orientation banners.
              </p>
              <div className="mt-4 pt-3 border-t border-amber-200/60 text-[11px] text-amber-800 font-medium">
                Layout: <span className="font-mono">app/(patient)/patient/layout.tsx</span>
              </div>
            </Link>

            {/* Caregiver Portal Card */}
            <Link
              id="portal-card-caregiver"
              href="/caregiver"
              className="group block rounded-xl border border-emerald-200 bg-emerald-50/40 p-6 transition-all hover:bg-emerald-50/80 hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-900">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <Badge variant="success">Route: /caregiver</Badge>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-emerald-900 flex items-center justify-between">
                <span>Caregiver Oversight</span>
                <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1 text-emerald-700" />
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                <strong>Responsive layout</strong> for families and home caregivers. Live check-in telemetry, medication schedule managers, family scrapbook uploads, and caregiver respite resources.
              </p>
              <div className="mt-4 pt-3 border-t border-emerald-200/60 text-[11px] text-emerald-800 font-medium">
                Layout: <span className="font-mono">app/(caregiver)/caregiver/layout.tsx</span>
              </div>
            </Link>

            {/* Practitioner Portal Card */}
            <Link
              id="portal-card-practitioner"
              href="/practitioner"
              className="group block rounded-xl border border-blue-200 bg-blue-50/40 p-6 transition-all hover:bg-blue-50/80 hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <Badge variant="clinical">Route: /practitioner</Badge>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>Practitioner Portal</span>
                <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1 text-blue-700" />
              </h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                <strong>Desktop dashboard layout</strong> with dense clinical sidebars. Patient cohort management, longitudinal cognitive trends, adherence tracking, and consultation notes.
              </p>
              <div className="mt-4 pt-3 border-t border-blue-200/60 text-[11px] text-blue-800 font-medium">
                Layout: <span className="font-mono">app/(practitioner)/practitioner/layout.tsx</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Section 2: Hackathon Contributor Ownership Matrix */}
        <section id="contributor-matrix" className="space-y-4">
          <div className="border-b border-slate-200 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                6-Contributor Hackathon Ownership Matrix
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Strict folder and feature ownership prevents git merge conflicts and facilitates asynchronous sprints.
              </p>
            </div>
            <Badge variant="secondary" className="self-start">Sprint Schedule: 5 Days</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {HACKATHON_TEAM_MATRIX.map((contributor) => (
              <Card key={contributor.id} className="border-slate-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge variant="outline" className="text-[10px] uppercase font-mono">
                        {contributor.id}
                      </Badge>
                      <CardTitle className="text-sm font-bold mt-1.5 text-slate-900">
                        {contributor.contributorName}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-xs font-medium text-emerald-800">
                    {contributor.primaryDomain}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700 block text-[11px] mb-1">
                      Owned Folders (Exclusive Write):
                    </span>
                    <div className="space-y-0.5 font-mono text-[11px] text-slate-600 bg-slate-50 p-2 rounded-md">
                      {contributor.ownedFolders.map((f) => (
                        <div key={f} className="truncate">• {f}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 block text-[11px] mb-1">
                      Key Deliverables:
                    </span>
                    <ul className="list-disc pl-4 text-slate-600 space-y-0.5 text-[11px]">
                      {contributor.keyDeliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 3: Architecture & System Boundaries */}
        <section id="architecture-overview" className="space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              System Architecture & Modularity
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Production-grade scaffolding designed for rapid scalability and minimal refactoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                <FolderTree className="h-4 w-4 text-emerald-700" />
                <span>Feature Architecture</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Self-contained feature folders in <code className="font-mono text-emerald-700">features/*</code> with individual components, types, services, and public barrel exports.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                <Layers className="h-4 w-4 text-blue-700" />
                <span>Route Groups</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Isolated Next.js route groups <code className="font-mono text-blue-700">(patient)</code>, <code className="font-mono text-blue-700">(caregiver)</code>, and <code className="font-mono text-blue-700">(practitioner)</code> allow simultaneous UI iteration.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                <span>Server-Side AI</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gemini API tokens and sensitive clinical prompt logic remain strictly server-side with zero browser leak exposure.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                <FileCode2 className="h-4 w-4 text-slate-700" />
                <span>Vercel Deployable</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standard Next.js 15 configuration with standalone output, zero hydration bugs, and full static/dynamic optimization.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Documentation Index */}
        <section id="docs-index" className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-5 w-5 text-slate-700" />
              <h3 className="text-base font-bold text-slate-900">
                Core Architectural Documentation
              </h3>
            </div>
            <Badge variant="outline">Generated in Codebase</Badge>
          </div>
          <p className="text-xs text-slate-600">
            Comprehensive markdown specifications have been generated at the repository root and in <code className="font-mono text-slate-800">/docs</code> to guide every contributor:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs font-mono">
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center text-slate-800">
              README.md
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center text-slate-800">
              ARCHITECTURE.md
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center text-slate-800">
              DESIGN.md
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center text-slate-800">
              CONTRIBUTING.md
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center text-slate-800">
              AGENT_CONTEXT.md
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center text-slate-800">
              CHANGELOG.md
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            SmritiSaathi © 2026 • AI-Assisted Companion for Dementia Care.
          </p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/patient" className="text-amber-800 hover:underline">
              Patient
            </Link>
            <Link href="/caregiver" className="text-emerald-800 hover:underline">
              Caregiver
            </Link>
            <Link href="/practitioner" className="text-blue-800 hover:underline">
              Practitioner
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
