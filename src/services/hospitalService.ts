import { NearbyFacility } from "../types";

const API_URL =
  "https://script.google.com/macros/s/AKfycbyPusza-dc2NOtJy7gER4WRGPM5lnGvQw2WVEUAXVM_iTuUj75PHQ-txZ7JnHjV8CKi/exec";

interface SheetHospital {
  "Hospital Name": string;
  Latitude: string | number;
  Longitude: string | number;
  Address: string;
  Phone: string;
  Speciality: string;
  Emergency: string;
  Open: string;
}

export async function getHospitals(): Promise<NearbyFacility[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch hospitals");
  }

  const data: SheetHospital[] = await response.json();

  console.log("RAW DATA:", data);

  return data.map((hospital, index) => ({
    id: String(index + 1),

    name: hospital["Hospital Name"],

    type: hospital.Speciality,

    distance: "-- km",

    timeAway: "-- min",

    address: hospital.Address,

    phone: hospital.Phone,

    open247: hospital.Open === "Yes",

    icuAvailable: hospital.Emergency === "Yes",

    traumaLevel:
      hospital.Emergency === "Yes"
        ? "Emergency"
        : "",

    coordinates: {
      lat: Number(hospital.Latitude),
      lng: Number(hospital.Longitude),
    },
  }));
}