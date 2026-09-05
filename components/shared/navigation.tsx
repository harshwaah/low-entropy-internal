import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12,2C12,2 12,8 18,10C12,12 12,18 12,22C12,18 6,18 6,10C6,8 12,2 12,2Z" />
    </svg>
  );
}

export function Navigation() {
  return (
    <header className="sticky top-0 z-40 bg-brand-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-brand-dark tracking-tight">SmritiSaathi</span>
          <SparkleIcon className="w-5 h-5 text-brand-primary" />
          <div className="flex flex-col">
             <span className="text-[10px] uppercase font-bold text-brand-primary tracking-wider -mt-1 ml-1">Always with you</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-semibold text-brand-text">
          <Link href="#" className="hover:text-brand-primary transition-colors">Home</Link>
          <Link href="#" className="hover:text-brand-primary transition-colors">About</Link>
          <Link href="#" className="hover:text-brand-primary transition-colors">Features</Link>
          <Link href="#" className="hover:text-brand-primary transition-colors">Our Impact</Link>
        </nav>
        <Button className="rounded-full font-bold">Get Started</Button>
      </div>
    </header>
  );
}
