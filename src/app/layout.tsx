import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import { AudioProvider } from '@/contexts/AudioContext';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JADU — Visual Effects Compositor & Post Production Artist',
  description: 'Portfolio of JADU, a Visual Effects Compositor and Post Production Artist specializing in commercials, music videos, film, CG compositing, and post-production.',
  keywords: ['visual effects', 'compositor', 'VFX', 'post production', 'motion design', 'JADU'],
  authors: [{ name: 'JADU' }],
  icons: {
    icon: '/assets/jadu-logo.png',
    apple: '/assets/jadu-logo.png',
  },
  openGraph: {
    title: 'JADU — Visual Effects Compositor',
    description: 'Portfolio of JADU, a Visual Effects Compositor and Post Production Artist.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen antialiased">
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
