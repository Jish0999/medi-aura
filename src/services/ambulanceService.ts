import { NearbyFacility } from "../types";

const API_URL = "https://script.google.com/macros/s/AKfycbwg86wAJJAA24xiLDR7PoIxG1r12fsyAPYcOezVhMPnfn9YF_HoQu03iMvdqkQuFt2C/exec";

interface SheetAmbulance {
  "Ambulance Name": string;
  Latitude: string | number;
  Longitude: string | number;
  Address: string;
  Phone: string;
  "Service Type": string;
  Available: string;
  "24/7": string;
}

export async function getAmbulances(): Promise<NearbyFacility[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch ambulances");
  }

  const data: SheetAmbulance[] = await response.json();

  console.log("RAW AMBULANCE DATA:", data);

  return data.map((ambulance, index) => ({
  id: String(index + 1),

  name: ambulance["Ambulance Name"],

  type: ambulance["Service Type"],

  distance: "-- km",

  timeAway: "-- min",

  address: ambulance.Address,

  phone: ambulance.Phone,

  open247: ambulance["24/7"] === "Yes",

  icuAvailable: ambulance.Available === "Yes",

  traumaLevel:
    ambulance.Available === "Yes"
      ? "Available"
      : "",

  coordinates: {
    lat: Number(ambulance.Latitude),
    lng: Number(ambulance.Longitude),
  },
}));
}