import { useTheme } from '@/context/ThemeContext';

export function CRTOverlay() {
  const { theme } = useTheme();

  if (theme !== 'dark') return null;

  return (
    <>
      {/* Scanlines */}
      <div className="crt-overlay" />
      
      {/* Vignette effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Subtle screen flicker */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9997] opacity-[0.015]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,243,255,0.1) 50%, transparent 100%)',
          animation: 'scan 4s linear infinite',
        }}
      />
    </>
  );
}
