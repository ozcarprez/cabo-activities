import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'CaboXplore — Discover the Best of Cabo San Lucas',
  description: 'Book unforgettable activities, tours, and experiences in Cabo San Lucas, Mexico. From sport fishing to sunset sailing, find your perfect adventure.',
  keywords: 'Cabo San Lucas, activities, tours, experiences, fishing, snorkel, whale watching, sunset cruise, Mexico',
  openGraph: {
    title: 'CaboXplore — Adventures in Cabo San Lucas',
    description: 'Book unforgettable activities and tours in Los Cabos',
    images: ['https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200'],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
