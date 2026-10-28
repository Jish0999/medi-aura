export type ActiveTab = 'HOME' | 'EMERGENCY NUMBERS' | 'CONTACT US' | 'LOGIN' | 'SIGNUP';

export interface NearbyFacility {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  distance: string;
  distanceValue: number;
  timeAway: string;
  open247: boolean;
  icuAvailable: boolean;
  traumaLevel: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface EmergencyContact {
  id: string;
  title: string;
  number: string;
  category: 'National' | 'Hospital' | 'Specialized' | 'Police/Fire';
  description: string;
  icon: string;
}

export type Message = {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: Date;
  isEmergency?: boolean;
};