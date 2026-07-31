import type { Metadata } from 'next';
import { JetBrains_Mono, Outfit, Plus_Jakarta_Sans, Share_Tech_Mono } from 'next/font/google';
import './globals.css';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

const shareTech = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sharetech',
});

export const metadata: Metadata = {
  title: 'Angelo Benavides | Software, Robótica & Inteligencia Artificial',
  description: 'Portafolio interactivo tipo HUD de Angelo Benavides: desarrollador de software enfocado en IA aplicada, robótica biónica (BIOSTRIDE), backend asíncrono y ciberseguridad.',
  keywords: ['Angelo Benavides', 'BIOSTRIDE', 'Robótica', 'Inteligencia Artificial', 'RAG', 'Next.js', 'TypeScript', 'Developer', 'Portafolio HUD'],
  icons: {
    icon: 'https://github.com/AngeloAlexanderBenavides.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${mono.variable} ${outfit.variable} ${jakarta.variable} ${shareTech.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#050505] text-slate-100 font-mono scroll-smooth selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
