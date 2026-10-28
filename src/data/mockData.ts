import { NearbyFacility, EmergencyContact } from '../types';

export const mockFacilities: NearbyFacility[] = [
  {
    id: 'fac-1',
    name: 'St. Jude General Hospital & Trauma Center',
    type: 'Trauma Center',
    distance: '1.2 miles',
    timeAway: '4 mins drive',
    address: '742 Evergreen Terrace, Medical District',
    phone: '+1 (800) 555-0199',
    open247: true,
    icuAvailable: true,
    traumaLevel: 'Level I Trauma',
    coordinates: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: 'fac-2',
    name: 'Metro Emergency Cardiac & Surgical Care',
    type: 'Hospital',
    distance: '2.8 miles',
    timeAway: '7 mins drive',
    address: '109 Medical Center Blvd, Suite 400',
    phone: '+1 (800) 555-0182',
    open247: true,
    icuAvailable: true,
    traumaLevel: 'Level II Trauma',
    coordinates: { lat: 37.7833, lng: -122.4167 }
  },
  {
    id: 'fac-3',
    name: 'Aura Rapid Urgent Care & Radiology',
    type: 'Urgent Care',
    distance: '0.8 miles',
    timeAway: '2 mins drive',
    address: '350 Central Avenue, Ground Floor',
    phone: '+1 (800) 555-0144',
    open247: false,
    icuAvailable: false,
    coordinates: { lat: 37.769, lng: -122.448 }
  },
  {
    id: 'fac-4',
    name: 'City Central 24/7 Pharmacy & Emergency Meds',
    type: 'Pharmacy',
    distance: '0.5 miles',
    timeAway: '1 min drive',
    address: '120 Main Street, Corner Hub',
    phone: '+1 (800) 555-0111',
    open247: true,
    icuAvailable: false,
    coordinates: { lat: 37.771, lng: -122.421 }
  }
];

export const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: 'em-1',
    title: 'National Emergency Dispatch',
    number: '911',
    category: 'National',
    description: 'Immediate dispatch for Ambulance, Police, and Fire Services.',
    icon: 'ShieldAlert'
  },
  {
    id: 'em-2',
    title: 'Medical Ambulance Hotline',
    number: '102 / 911',
    category: 'National',
    description: 'Dedicated critical care ambulance dispatch with paramedic team.',
    icon: 'Ambulance'
  },
  {
    id: 'em-3',
    title: 'Poison Control Hotline',
    number: '+1 (800) 222-1222',
    category: 'Specialized',
    description: '24/7 toxic substance exposure and emergency medical guidance.',
    icon: 'Biohazard'
  },
  {
    id: 'em-4',
    title: 'Medi Aura Emergency Command Center',
    number: '+1 (800) 555-AURA',
    category: 'Hospital',
    description: 'Priority emergency response hotline connected to nearest trauma unit.',
    icon: 'PhoneCall'
  },
  {
    id: 'em-5',
    title: 'National Crisis & Suicide Helpline',
    number: '988',
    category: 'Specialized',
    description: '24/7 free and confidential support for people in distress.',
    icon: 'HeartHandshake'
  }
];
