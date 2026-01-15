import { MainLayout } from '@/layouts/MainLayout';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { SectionIndicator } from '@/components/SectionIndicator';

const Index = () => {
  return (
    <MainLayout showSectionIndicator>
      <SectionIndicator />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </MainLayout>
  );
};

export default Index;
