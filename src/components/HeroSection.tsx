import React from 'react';
import { LayoutGrid, ArrowRight, Bell } from 'lucide-react';

interface HeroSectionProps {
  onEmergencyAlertClick: () => void;
  onServicesClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEmergencyAlertClick,
  onServicesClick,
}) => {
  return (
    <section className="relative w-full min-h-[calc(100vh-100px)] flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto overflow-hidden select-none py-6 lg:py-12">
      
      {/* ---------------- BACKGROUND WATERMARK TYPOGRAPHY ---------------- */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none z-0 text-stroke-faint font-outfit font-black uppercase text-[120px] sm:text-[180px] md:text-[230px] lg:text-[280px] leading-none tracking-tighter opacity-70 transform -rotate-12 -translate-x-12 select-none"
        aria-hidden="true"
      >
        EMERGENCY
      </div>

      {/* ---------------- DECORATIVE GRAPHICS ---------------- */}
      
      {/* Top Right Dot Grid Matrix */}
      <div className="absolute top-12 right-8 sm:right-16 md:right-24 z-10 grid grid-cols-4 gap-3 sm:gap-4 pointer-events-none opacity-85">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={`tr-dot-${i}`} className="cyan-dot" />
        ))}
      </div>

      {/* Bottom Left Dot Grid Matrix */}
      <div className="absolute bottom-16 left-6 sm:left-12 md:left-16 z-10 grid grid-cols-4 gap-3 sm:gap-4 pointer-events-none opacity-85">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={`bl-dot-${i}`} className="cyan-dot" />
        ))}
      </div>

      {/* Bottom Right Wireframe Crosses & Dot Matrix */}
      <div className="absolute bottom-8 right-6 sm:right-12 md:right-20 z-10 flex items-end gap-6 sm:gap-10 pointer-events-none">
        
        {/* Wireframe Medical Crosses (Outlined Cyan) */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36">
          {/* Main Large Cross */}
          <svg className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 text-[#00e5ff] opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7V2z" />
          </svg>
          
          {/* Middle Floating Cross */}
          <svg className="absolute top-4 right-6 w-10 h-10 sm:w-14 sm:h-14 text-[#00e5ff] opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7V2z" />
          </svg>

          {/* Top Small Cross */}
          <svg className="absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 text-[#00e5ff] opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7V2z" />
          </svg>
        </div>

        {/* Bottom Right 4x4 Cyan Dot Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-4 opacity-80 mb-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={`br-dot-${i}`} className="cyan-dot" />
          ))}
        </div>
      </div>

      {/* ---------------- MAIN HERO CONTENT ---------------- */}
      <div className="relative z-20 my-auto max-w-2xl lg:max-w-3xl pt-4 sm:pt-8">
        
        {/* Main Headline Stack */}
        <h1 className="font-outfit font-black text-4xl sm:text-6xl md:text-7xl lg:text-[82px] leading-[0.93] tracking-tight uppercase text-left">
          <span className="block text-white">EMERGENCY</span>
          <span className="block text-[#00e5ff] drop-shadow-[0_0_20px_rgba(0,229,255,0.35)]">MEDICAL</span>
          <span className="block text-white">ASSISTANT</span>
        </h1>

        {/* Heartbeat ECG Line */}
        <div className="relative w-full max-w-md my-6 sm:my-8 flex items-center">
          <svg className="w-full h-8 sm:h-10 text-[#00e5ff] animate-heartbeat overflow-visible" viewBox="0 0 380 40" fill="none">
            {/* Horizontal Line Left */}
            <path d="M0 20 H220 L226 12 L232 28 L240 2 L250 38 L258 16 L264 24 L270 20 H380" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Subtitle */}
        <p className="text-white/95 font-outfit text-xl sm:text-2xl font-normal tracking-wide text-left mb-8 sm:mb-10">
          Your health is our priority
        </p>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 sm:gap-5 max-w-4xl">
          
          {/* Button 1: SEARCH NEARBY (Gradient Fill) */}
          <button
            onClick={onServicesClick}
            className="group relative flex items-center justify-center gap-3 px-7 py-4 rounded-md bg-gradient-to-r from-[#00E5FF] via-[#00B2FF] to-[#007AFF] text-black font-outfit font-extrabold text-sm sm:text-base tracking-wider uppercase cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] active:scale-95"
          >
            <LayoutGrid className="w-5 h-5 fill-black stroke-black group-hover:animate-bounce" />
            <span>SERVICES</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
          </button>

          {/* Button 2: EMERGENCY ALERT (Cyan Border + Red Bell) */}
          <button
            onClick={onEmergencyAlertClick}
            className="group relative flex items-center justify-center gap-3 px-7 py-4 rounded-md bg-black border border-[#00e5ff] text-white font-outfit font-extrabold text-sm sm:text-base tracking-wider uppercase cursor-pointer transition-all duration-300 hover:bg-[#00e5ff]/10 hover:border-cyan-300 hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] active:scale-95"
          >
            <div className="relative">
              <Bell className="w-5 h-5 text-[#ff3b30] fill-[#ff3b30]/20 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff3b30] rounded-full animate-ping" />
            </div>
            <span>EMERGENCY ALERT</span>
          </button>

        </div>

      </div>

    </section>
  );
};
