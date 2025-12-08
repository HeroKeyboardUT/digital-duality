import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GlitchTransition } from '@/components/GlitchTransition';
import { CRTOverlay } from '@/components/CRTOverlay';
import { SectionIndicator } from '@/components/SectionIndicator';
import { 
  HeroSection, 
  AboutSection, 
  ProjectsSection, 
  BlogSection, 
  ContactSection,
  AILabSection,
  APIPlaygroundSection
} from '@/components/sections';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <GlitchTransition />
        <CRTOverlay />
        <Header />
        <SectionIndicator />
        
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <AILabSection />
          <APIPlaygroundSection />
          <BlogSection />
          <ContactSection />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
