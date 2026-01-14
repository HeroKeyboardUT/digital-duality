import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CRTOverlay } from '@/components/CRTOverlay';
import { GlitchTransition } from '@/components/GlitchTransition';
import { CVPage } from '@/components/CVPage';

export default function CV() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <GlitchTransition />
        <CRTOverlay />
        <Header />
        <main className="flex-1">
          <CVPage />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
