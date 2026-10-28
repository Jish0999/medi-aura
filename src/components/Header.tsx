import React from 'react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenAuth,
}) => {
  return (
    <header className="w-full pt-8 pb-6 px-6 sm:px-12 md:px-16 lg:px-20 max-w-7xl mx-auto flex items-center justify-between z-30 relative">
      {/* Brand Logo */}
      <button 
        onClick={() => onTabChange('HOME')}
        className="flex items-center gap-3 text-left group focus:outline-none"
      >
        {/* Plus Symbol Icon - Matching reference pixel perfect */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-xs flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
          <svg className="w-6 h-6 text-black fill-current" viewBox="0 0 24 24">
            <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
          </svg>
        </div>
        <div className="flex items-center text-2xl sm:text-3xl font-extrabold tracking-tight">
          <span className="text-white font-outfit">Medi</span>
          <span className="text-[#00e5ff] font-outfit ml-1">Aura</span>
        </div>
      </button>

      {/* Main Navigation - Center */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-12 font-outfit font-bold text-xs sm:text-sm tracking-wider uppercase">
        <button
          onClick={() => onTabChange('HOME')}
          className={`relative py-1 transition-colors cursor-pointer ${
            activeTab === 'HOME' ? 'text-[#00e5ff]' : 'text-white/90 hover:text-white'
          }`}
        >
          HOME
          {activeTab === 'HOME' && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#00e5ff] rounded-full shadow-[0_0_8px_#00e5ff]" />
          )}
        </button>

        <button
          onClick={() => onTabChange('EMERGENCY NUMBERS')}
          className={`relative py-1 transition-colors cursor-pointer ${
            activeTab === 'EMERGENCY NUMBERS' ? 'text-[#00e5ff]' : 'text-white/90 hover:text-white'
          }`}
        >
          EMERGENCY NUMBERS
          {activeTab === 'EMERGENCY NUMBERS' && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#00e5ff] rounded-full shadow-[0_0_8px_#00e5ff]" />
          )}
        </button>

        <button
          onClick={() => onTabChange('CONTACT US')}
          className={`relative py-1 transition-colors cursor-pointer ${
            activeTab === 'CONTACT US' ? 'text-[#00e5ff]' : 'text-white/90 hover:text-white'
          }`}
        >
          CONTACT US
          {activeTab === 'CONTACT US' && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#00e5ff] rounded-full shadow-[0_0_8px_#00e5ff]" />
          )}
        </button>
      </nav>

      {/* Right Login / Signup */}
      <div className="flex items-center font-outfit font-bold text-xs sm:text-sm tracking-wider uppercase text-white">
        <button
          onClick={() => onOpenAuth('login')}
          className="hover:text-[#00e5ff] transition-colors cursor-pointer py-1"
        >
          LOGIN
        </button>
        <span className="mx-2 text-white/40 font-light">|</span>
        <button
          onClick={() => onOpenAuth('signup')}
          className="hover:text-[#00e5ff] transition-colors cursor-pointer py-1"
        >
          SIGNUP
        </button>
      </div>
    </header>
  );
};
