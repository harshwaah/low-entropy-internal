import type {Metadata} from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css'; // Global styles
import { SharedDataProvider } from '@/services/context/shared-data-context';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SmritiSaathi | AI Companion for Dementia Care',
  description:
    'An AI-assisted daily companion for dementia patients that helps preserve memories, maintain routines, encourage cognitive engagement, and strengthen caregiver support.',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'SmritiSaathi | AI Companion for Dementia Care',
    description:
      'An AI-assisted daily companion for dementia patients that helps preserve memories, maintain routines, encourage cognitive engagement, and strengthen caregiver support.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmritiSaathi | AI Companion for Dementia Care',
    description:
      'An AI-assisted daily companion for dementia patients that helps preserve memories, maintain routines, encourage cognitive engagement, and strengthen caregiver support.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body className="antialiased font-sans bg-brand-background text-brand-text min-h-screen selection:bg-brand-primary/20" suppressHydrationWarning>
        <SharedDataProvider>{children}</SharedDataProvider>
      </body>
    </html>
  );
}
