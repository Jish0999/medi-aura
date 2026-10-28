import React from 'react';
import { LucideIcon } from "lucide-react";
import {
  X,
  Building2,
  Ambulance,
  Pill,
  Droplets,
} from 'lucide-react';

const MODAL_TRANSITION_DELAY_MS = 150;

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNearbyHospitalsClick: () => void;
  onAmbulanceClick: () => void;
}

type ServiceAction =
  | "nearby"
  | "ambulance"
  | "pharmacy"
  | "bloodbank";

interface Service {
  title: string;
  icon: LucideIcon;
  description: string;
  action: ServiceAction;
}

const services: Service[] = [
  {
    title: "Nearby Hospitals",
    icon: Building2,
    description: "Find hospitals near your current location.",
    action: "nearby",
  },
  {
    title: "Ambulance",
    icon: Ambulance,
    description: "Request emergency ambulance assistance.",
    action: "ambulance",
  },
  {
    title: "Pharmacy",
    icon: Pill,
    description: "Locate nearby pharmacies and medical stores.",
    action: "pharmacy",
  },
  {
    title: "Blood Bank",
    icon: Droplets,
    description: "Search blood banks and donor availability.",
    action: "bloodbank",
  },
];

export const ServicesModal: React.FC<ServicesModalProps> = ({
  isOpen,
  onClose,
  onNearbyHospitalsClick,
  onAmbulanceClick,
}) => {
  if (!isOpen) return null;
  const handleServiceClick = (action: ServiceAction) => {
    switch (action) {
      case "nearby":
        onClose();

        setTimeout(() => {
          onNearbyHospitalsClick();
        }, MODAL_TRANSITION_DELAY_MS);
        break;

      case "ambulance":
        onClose();

        setTimeout(() => {
          onAmbulanceClick();
        }, MODAL_TRANSITION_DELAY_MS);
        break;

      default:
        console.log("Module coming soon");
        break;
    }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-[95%] max-w-6xl rounded-2xl border border-cyan-500/30 bg-[#0d0d0d] shadow-[0_0_40px_rgba(0,229,255,0.15)] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-cyan-500/20">
          <div>
            <h2 className="text-3xl font-bold text-cyan-300">
              Healthcare Services
            </h2>

            <p className="text-gray-300 mt-1">
              Choose the service you need
            </p>
          </div>

          <button
            aria-label="Close services modal"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-200"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
            const Icon = service.icon;
            const isEnabled =
              service.action === "nearby" ||
              service.action === "ambulance";

            return (
                <div
                key={service.title}
                role="button"
                tabIndex={isEnabled ? 0 : -1}
                aria-disabled={!isEnabled}
                onClick={() => handleServiceClick(service.action)}
                onKeyDown={(e) => {
                    if (
                    isEnabled &&
                    (e.key === "Enter" || e.key === " ")
                    ) {
                    e.preventDefault();
                    handleServiceClick(service.action);
                    }
                }}
                className={`
                    rounded-xl
                    border border-cyan-500/20
                    bg-[#141414]
                    p-8
                    min-h-[220px]
                    transition-all duration-300 ease-out
                    ${
                    isEnabled
                        ? "cursor-pointer hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,229,255,0.3)]"
                        : "cursor-not-allowed opacity-80"
                    }
                `}
                >
                <div className="w-16 h-16 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                    <Icon className="w-9 h-9 text-cyan-300" />
                </div>

                <h3 className="text-lg font-bold text-white">
                {service.title}
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                {service.description}
                </p>
            </div>
            );
        })}

        </div>

      </div>
    </div>
  );
};