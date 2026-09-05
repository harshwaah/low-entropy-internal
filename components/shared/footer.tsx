import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12,2C12,2 12,8 18,10C12,12 12,18 12,22C12,18 6,18 6,10C6,8 12,2 12,2Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-white">SmritiSaathi</span>
              <SparkleIcon className="w-5 h-5 text-brand-light" />
            </div>
            <p className="text-sm text-brand-light/80 italic font-medium">Always with you</p>
            <p className="text-sm font-medium mt-4">More Memories. Brighter Days. Together.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-brand-light">Product</h4>
            <ul className="space-y-3 text-sm text-brand-light/70 font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">Patient App</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Caregiver App</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Practitioner Dashboard</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-brand-light">Company</h4>
            <ul className="space-y-3 text-sm text-brand-light/70 font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Our Mission</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Our Impact</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-brand-light">Legal</h4>
            <ul className="space-y-3 text-sm text-brand-light/70 font-medium">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-light/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-light/60 font-medium">
          <p>© 2025 SmritiSaathi. All rights reserved.</p>
          <div className="text-right">
            <span className="italic">Because every memory<br/>still matters </span>
            <Heart className="inline w-3 h-3 fill-brand-accent-orange text-brand-accent-orange ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
