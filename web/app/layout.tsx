import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';
import './globals.css';

const inter = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://termoclimat.kg'),
  title: {
    default: 'TermoClimat — инженерные системы для дома и бизнеса в Бишкеке',
    template: '%s — TermoClimat',
  },
  description:
    'Солнечные электростанции, тепловые насосы, вентиляция и очистные сооружения: проектирование, подбор, монтаж и сервис в Кыргызстане.',
  openGraph: { images: ['/assets/projects/38.webp'], locale: 'ru_RU', type: 'website' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
