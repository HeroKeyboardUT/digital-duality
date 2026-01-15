import { ReactNode } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GlitchTransition } from '@/components/effects/GlitchTransition';
import { CRTOverlay } from '@/components/effects/CRTOverlay';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { PageProgress } from '@/components/ui/PageProgress';
import { CursorFollower } from '@/components/ui/CursorFollower';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { FloatingNav } from '@/components/ui/FloatingNav';

interface MainLayoutProps {
  children: ReactNode;
  showSectionIndicator?: boolean;
}

export function MainLayout({ children, showSectionIndicator = false }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <div className="min-h-screen flex flex-col bg-background">
        <PageProgress />
        <CursorFollower />
        <GlitchTransition />
        <CRTOverlay />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <FloatingNav />
      </div>
    </ThemeProvider>
  );
}
