import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'SmritiSaathi | AI Companion for Dementia Care',
  description:
    'An AI-assisted daily companion for dementia patients that helps preserve memories, maintain routines, encourage cognitive engagement, and strengthen caregiver support.',
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
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
