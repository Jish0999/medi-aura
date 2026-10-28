import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SearchNearbyModal } from './components/SearchNearbyModal';
import { EmergencyAlertModal } from './components/EmergencyAlertModal';
import { EmergencyNumbersModal } from './components/EmergencyNumbersModal';
import { ContactModal } from './components/ContactModal';
import { ServicesModal } from './components/ServicesModal';
import { AmbulanceModal } from "./components/AmbulanceModal";
import { AuthModal } from './components/AuthModal';
import { ActiveTab } from './types';
import AIAssistant from "./components/AIAssistant/AIAssistant";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('HOME');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isNumbersModalOpen, setIsNumbersModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);
  const [isAmbulanceModalOpen, setIsAmbulanceModalOpen] = useState(false);
  const [serviceType, setServiceType] = useState<"hospital" | "ambulance">("hospital");
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login',
  });

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'EMERGENCY NUMBERS') {
      setIsNumbersModalOpen(true);
    } else if (tab === 'CONTACT US') {
      setIsContactModalOpen(true);
    } else if (tab === 'HOME') {
      setIsNumbersModalOpen(false);
      setIsContactModalOpen(false);
    }
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleFindNearbyAmbulances = () => {
  setServiceType("ambulance");
  setIsAmbulanceModalOpen(false);
  setIsSearchModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between overflow-x-hidden selection:bg-[#00e5ff] selection:text-black">
      {/* Background Video Layer */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 opacity-95"
          src="https://res.cloudinary.com/msibji3m/video/upload/v1785088927/kling_20260727_VIDEO_The_tip_of_270_0_olqe4k.mp4"
        />
        {/* Lighter vignette gradient overlay to let the video shine brighter */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Header Bar */}
      <div className="relative z-20">
        <Header
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onOpenAuth={handleOpenAuth}
        />
      </div>

      {/* Main Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col justify-center">
        <HeroSection
          onEmergencyAlertClick={() => setIsAlertModalOpen(true)}
          onServicesClick={() => setIsServicesModalOpen(true)}
        />
      </main>

      {/* Interactive Modals */}
      <SearchNearbyModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        serviceType={serviceType}
      />

      <EmergencyAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
      />

      <EmergencyNumbersModal
        isOpen={isNumbersModalOpen}
        onClose={() => {
          setIsNumbersModalOpen(false);
          if (activeTab === 'EMERGENCY NUMBERS') setActiveTab('HOME');
        }}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => {
          setIsContactModalOpen(false);
          if (activeTab === 'CONTACT US') setActiveTab('HOME');
        }}
      />

      <ServicesModal
        isOpen={isServicesModalOpen}
        onClose={() => setIsServicesModalOpen(false)}
        onNearbyHospitalsClick={() => {
          setServiceType("hospital");
          setIsServicesModalOpen(false);
          setIsSearchModalOpen(true);
        }}
        onAmbulanceClick={() => {
          setIsServicesModalOpen(false);
          setIsAmbulanceModalOpen(true);
        }}
      />

      <AmbulanceModal
        isOpen={isAmbulanceModalOpen}
        onClose={() => setIsAmbulanceModalOpen(false)}
        onFindNearbyAmbulances={handleFindNearbyAmbulances}
      />

      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
      />

      <AIAssistant />
      
    </div>
  );
}
