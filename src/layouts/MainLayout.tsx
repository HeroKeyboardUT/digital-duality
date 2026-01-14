import { ReactNode } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GlitchTransition } from '@/components/effects/GlitchTransition';
import { CRTOverlay } from '@/components/effects/CRTOverlay';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <GlitchTransition />
        <CRTOverlay />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
