import React from 'react';
import { X, Ambulance } from "lucide-react";

interface AmbulanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFindNearbyAmbulances: () => void;
}

export const AmbulanceModal: React.FC<AmbulanceModalProps> = ({
  isOpen,
  onClose,
  onFindNearbyAmbulances,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-[95%] max-w-6xl rounded-2xl border border-cyan-500/30 bg-[#0d0d0d] shadow-[0_0_40px_rgba(0,229,255,0.15)] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-cyan-500/20">
          <div>
            <h2 className="text-3xl font-bold text-cyan-300">
              Emergency Ambulance
            </h2>

            <p className="text-gray-300 mt-1">
              Find nearby ambulance services
            </p>
          </div>

          <button
            aria-label="Close ambulance modal"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-200"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex flex-col items-center justify-center text-center px-8 py-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-400/5 border border-cyan-400/20 shadow-[0_0_30px_rgba(0,229,255,0.2)] flex items-center justify-center mb-6">
            <Ambulance className="w-12 h-12 text-cyan-300" />
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">
            Fast Emergency Response
            </h3>

            <p className="max-w-xl text-gray-400 text-lg leading-relaxed mb-8">
            Locate nearby ambulance services and request emergency
            assistance quickly based on your current location.
            </p>

            <button
            onClick={onFindNearbyAmbulances}
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold text-lg hover:bg-cyan-400 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_25px_rgba(0,229,255,0.35)]"
            >
            <Ambulance className="w-6 h-6" />
            Find Nearby Ambulances
            </button>

        </div>

      </div>
    </div>
  );
};