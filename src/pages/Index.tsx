import { MainLayout } from '@/layouts/MainLayout';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </MainLayout>
  );
};

export default Index;
