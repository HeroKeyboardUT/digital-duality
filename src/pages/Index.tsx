import { ThemeProvider } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GlitchTransition } from '@/components/GlitchTransition';
import { CRTOverlay } from '@/components/CRTOverlay';
import { BioModule } from '@/components/BioModule';
import { TechStack } from '@/components/TechStack';
import { ProjectsGrid } from '@/components/ProjectCard';
import { CommitLog } from '@/components/CommitLog';
import { StatsModule } from '@/components/StatsModule';
import { ContactModule } from '@/components/ContactModule';
import { useTheme, t } from '@/context/ThemeContext';

function MainContent() {
  const { language } = useTheme();
  
  return (
    <main className="flex-1 container mx-auto">
      {/* Main Bento Grid - Dense Layout */}
      <div className="grid grid-cols-4 auto-rows-min">
        {/* Row 1-2: Bio (2x2) + Tech Stack (2x1) + Commit Log (2x2) */}
        <div className="col-span-4 md:col-span-2 row-span-2">
          <BioModule />
        </div>
        <div className="col-span-4 md:col-span-2">
          <TechStack />
        </div>
        <div className="col-span-4 md:col-span-2 row-span-2">
          <CommitLog />
        </div>
        
        {/* Stats Row */}
        <div className="col-span-4">
          <StatsModule />
        </div>
        
        {/* Projects Section */}
        <ProjectsGrid />
        
        {/* Bottom Row: Contact + Info cells */}
        <div className="col-span-4 md:col-span-2">
          <ContactModule />
        </div>
        
        <div className="col-span-2 md:col-span-1 grid-cell">
          <div className="label-text mb-1">TIMEZONE</div>
          <div className="text-[11px] font-sans font-bold">UTC+7 / ICT</div>
          <div className="text-[9px] text-muted-foreground mt-1">Asia/Ho_Chi_Minh</div>
          <div className="text-[8px] mt-2 text-muted-foreground">
            {t(language, 'Working hours: 09:00-18:00', 'Giờ làm việc: 09:00-18:00')}
          </div>
        </div>
        
        <div className="col-span-2 md:col-span-1 grid-cell">
          <div className="label-text mb-1">{t(language, 'AVAILABILITY', 'KHẢ DỤNG')}</div>
          <div className="text-[11px] font-sans font-bold">{t(language, 'Open for Projects', 'Nhận Dự Án')}</div>
          <div className="text-[9px] text-muted-foreground mt-1">Q1 2025 slots available</div>
          <div className="text-[8px] mt-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-1" />
            {t(language, 'ACCEPTING NEW CLIENTS', 'ĐANG NHẬN KHÁCH MỚI')}
          </div>
        </div>
      </div>
    </main>
  );
}

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <GlitchTransition />
        <CRTOverlay />
        <Header />
        <MainContent />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
