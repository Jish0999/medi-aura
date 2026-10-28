import { useState, useEffect } from "react";
import {
  X,
  MapPin,
  Phone,
  Clock,
  AlertCircle,
  ShieldCheck,
  Navigation,
  Search,
  Building2,
  Ambulance,
} from "lucide-react";
import { getHospitals } from "../services/hospitalService";
import { getAmbulances } from "../services/ambulanceService";
import { NearbyFacility } from "../types";

interface SearchNearbyModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: "hospital" | "ambulance";
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export const SearchNearbyModal: React.FC<SearchNearbyModalProps> = ({
  isOpen,
  onClose,
  serviceType,
}) => {
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [calledFacilityId, setCalledFacilityId] = useState<string | null>(null);

  // Live hospitals from Google Sheets
  const [facilities, setFacilities] = useState<NearbyFacility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [favoriteFacilities, setFavoriteFacilities] = useState<string[]>([]);

  const [userLocation, setUserLocation] = useState<{
  lat: number;
  lng: number;
} | null>(null);

  const loadFacilities = async () => {
    setLoading(true);
    setError("");

    try {
      if (serviceType === "hospital") {
        const data = await getHospitals();
        setFacilities(data);
      } else {
        const data = await getAmbulances();
        setFacilities(data);
      }
    } catch (err) {
    console.error(err);
    setError(
        serviceType === "hospital"
            ? "Unable to load nearby hospitals."
            : "Unable to load nearby ambulances."
    );
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
    };


  useEffect(() => {
    if (!isOpen) return;

      loadFacilities();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    }
    }, [isOpen, serviceType]);

    useEffect(() => {
      const savedFavorites = localStorage.getItem("favoriteFacilities");

      if (savedFavorites) {
        setFavoriteFacilities(JSON.parse(savedFavorites));
      }
    }, []);

    useEffect(() => {
      localStorage.setItem(
        "favoriteFacilities",
        JSON.stringify(favoriteFacilities)
      );
    }, [favoriteFacilities]);

    const toggleFavorite = (facilityId: string) => {
      setFavoriteFacilities((prev) =>
        prev.includes(facilityId)
          ? prev.filter((id) => id !== facilityId)
            : [...prev, facilityId]
      );
    };

    if (!isOpen) return null;

    if (loading) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-3xl bg-[#0a0f18] rounded-xl border border-[#00e5ff]/20 p-6">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/10 animate-pulse"></div>

              <div className="space-y-2">
                <div className="h-5 w-48 rounded bg-white/10 animate-pulse"></div>
                <div className="h-3 w-32 rounded bg-white/10 animate-pulse"></div>
              </div>
            </div>

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="mb-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="animate-pulse">

                  <div className="flex justify-between">

                    <div className="space-y-3">

                      <div className="h-5 w-52 rounded bg-white/10"></div>

                      <div className="h-4 w-36 rounded bg-white/10"></div>

                      <div className="h-3 w-64 rounded bg-white/10"></div>

                    </div>

                    <div className="h-14 w-20 rounded-xl bg-white/10"></div>

                  </div>

                  <div className="flex gap-2 mt-5">
                    <div className="h-7 w-24 rounded-full bg-white/10"></div>
                    <div className="h-7 w-28 rounded-full bg-white/10"></div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <div className="h-12 flex-1 rounded-xl bg-white/10"></div>
                    <div className="h-12 w-36 rounded-xl bg-white/10"></div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-xl border border-red-500/30 bg-[#0a0f18] p-8 text-center shadow-[0_0_40px_rgba(255,0,0,0.15)]">

            <AlertCircle className="mx-auto h-14 w-14 text-red-400" />

            <h2 className="mt-5 text-2xl font-bold text-white">
              Something went wrong
            </h2>

            <p className="mt-3 text-sm text-white/60">
              {error}
            </p>

            <button
              onClick={loadFacilities}
              className="mt-6 w-full rounded-lg bg-[#00e5ff] py-3 font-semibold text-black transition hover:opacity-90"
            >
              🔄 Try Again
            </button>

            <button
              onClick={onClose}
              className="mt-3 w-full rounded-lg border border-white/15 py-3 text-white transition hover:bg-white/10"
            >
              Close
            </button>

          </div>
        </div>
      );
    }

  const facilitiesWithDistance= facilities
    .map((facility) => {
      if (!userLocation) {
        return facility;
      }

      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        facility.coordinates.lat,
        facility.coordinates.lng
      );

      const averageSpeed = 40; // km/h

      const minutes = Math.max(
        1,
        Math.round((distance / averageSpeed) * 60)
      );

      return {
        ...facility,
        distance: `${distance.toFixed(1)} km`,
        distanceValue: distance,
        timeAway: `${minutes} min`,
      };
    })
    .sort((a, b) => {
  const aFavorite = favoriteFacilities.includes(a.id);
  const bFavorite = favoriteFacilities.includes(b.id);

  if (aFavorite && !bFavorite) return -1;
  if (!aFavorite && bFavorite) return 1;

  return a.distanceValue - b.distanceValue;
});

  const filteredFacilities = facilitiesWithDistance.filter((fac) => {
    const matchesFilter =
      filter === "ALL" ||
      (filter === "TRAUMA" && fac.traumaLevel !== "") ||
      (filter === "24/7" && fac.open247) ||
      (filter === "ICU" && fac.icuAvailable);

    const matchesSearch =
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleNearMe = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        showToast("Location updated successfully.");
      },
      (error) => {
        console.error(error);
        showToast("Unable to access your location.");
      }
    );
  };

  const handleRefresh = async () => {
    await loadFacilities();
    handleNearMe();
    showToast("Facilities refreshed successfully.");
  };

  const handleCall = (facility: NearbyFacility) => {
    setCalledFacilityId(facility.id);

    window.location.href = `tel:${facility.phone}`;
    showToast(`Calling ${facility.name}...`);

    setTimeout(() => {
      setCalledFacilityId(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0a0f18] border border-[#00e5ff]/30 rounded-xl shadow-[0_0_50px_rgba(0,229,255,0.2)] overflow-hidden flex flex-col font-outfit">

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff]">
              <MapPin className="w-5 h-5" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                Nearby Medical Facilities
              </h2>

              <p className="text-xs text-white/60">
                Real-time emergency centers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
          <button
          onClick={handleRefresh}
          className="px-3 py-2 rounded-lg border border-[#00e5ff]/30 text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-colors text-sm"
          >
          🔄 Refresh
          </button>

          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

        {/* Search */}
        <div className="p-4 sm:p-6 bg-black/20 border-b border-white/5 space-y-3">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />

              <input
                type="text"
                placeholder={
                  serviceType === "hospital"
                    ? "Search hospitals..."
                    : "Search ambulances..."
                    }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/15 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#00e5ff] transition-colors"
              />
            </div>

            <button
              onClick={handleNearMe}
              className="px-4 py-2.5 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/40 text-[#00e5ff] text-sm font-semibold hover:bg-[#00e5ff]/20 transition-colors whitespace-nowrap"
            >
              📍 Near Me
            </button>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase">
            {["ALL", "TRAUMA", "24/7", "ICU"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-md border transition-all ${
                  filter === cat
                    ? "bg-[#00e5ff] text-black border-[#00e5ff]"
                    : "bg-black/40 text-white border-white/15"
                }`}
              >
                {cat === "ALL"
                  ? "All Centers"
                  : cat === "TRAUMA"
                  ? "Trauma"
                  : cat === "24/7"
                  ? "24/7"
                  : "ICU"}
              </button>
            ))}
          </div>
        </div>

        {/* Hospitals */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[55vh]">

          {filteredFacilities.length === 0 ? (
            <div className="py-10 text-center text-white/60">
              <AlertCircle className="mx-auto mb-3 w-8 h-8" />

              <p className="text-lg font-semibold text-white">
                {serviceType === "hospital"
                  ? "No hospitals found"
                  : "No ambulances found"}
              </p>

              <p className="mt-2 text-sm">
                Try changing your search, removing filters, or using "Near Me".
              </p>
            </div>
          ) : (
            filteredFacilities.map((fac, index) => (
                <div
                  key={fac.id}
                  className="group p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00e5ff]/50 hover:-translate-y-1 hover:shadow-[0_10px_35px_rgba(0,229,255,0.15)] transition-all duration-300"
                >
                <div className="flex items-center justify-between mb-4">

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      fac.open247
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {fac.open247 ? "🟢 OPEN NOW" : "🔴 CLOSED"}
                  </span>

                  <span className="text-[11px] text-[#00e5ff] font-semibold">
                    ⭐ Nearby
                  </span>

                </div>
                
                {index === 0 && (
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-400/30 px-3 py-1 text-xs font-semibold text-cyan-300">
                    ⭐ Closest to You
                  </div>
                  )}
                
                <div className="flex justify-between flex-wrap gap-3">

                  {/* Left Side */}
                  <div className="flex gap-3">

                    <div className="w-11 h-11 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center flex-shrink-0">
                        {serviceType === "hospital" ? (
                          <Building2 className="w-6 h-6 text-[#00e5ff]" />
                        ) : (
                          <Ambulance className="w-6 h-6 text-[#00e5ff]" />
                        )}
                    </div>

                    <div>
                      <h3 className="font-bold text-white text-lg">
                        {fac.name}
                      </h3>

                      <p className="text-sm text-white/60">
                        {fac.type}
                      </p>

                      <p className="text-xs text-white/60 mt-2">
                        {fac.address}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-white/70">

                      <div className="flex items-center gap-1.5">
                        <Phone size={13} className="text-[#00e5ff]" />
                        <span>{fac.phone}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#00e5ff]" />
                        <span>{fac.distance} • {fac.timeAway}</span>
                      </div>

                      <button
                        onClick={() => toggleFavorite(fac.id)}
                        className={`rounded-full p-2 transition-all ${
                          favoriteFacilities.includes(fac.id)
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-white/10 text-white/60 hover:text-yellow-400"
                        }`}
                      >
                        {favoriteFacilities.includes(fac.id) ? "⭐" : "☆"}
                      </button>

                    </div>
                  </div>

                </div>

                  {/* Right Side */}
                  <div className="flex flex-col items-end gap-2">

                    <div className="px-4 py-2 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-center min-w-[90px]">
                      <p className="text-[#00e5ff] font-bold text-sm">
                        {fac.distance}
                      </p>

                      <p className="text-white/60 text-xs">
                        {fac.timeAway}
                      </p>
                    </div>

                  </div>

                </div>
                <div className="flex flex-wrap gap-2 mt-4">

                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                      fac.open247
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30"
                    }`}
                  >
                    <Clock size={13} />
                    {fac.open247 ? "24/7 Open" : "Closed"}
                  </span>

                  {fac.icuAvailable && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <ShieldCheck size={13} />
                      ICU Available
                    </span>
                  )}

                </div>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => handleCall(fac)}
                    className="flex-1 py-3 rounded-xl bg-[#00e5ff]/15 border border-[#00e5ff]/40 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black transition-all duration-300 flex flex-col items-center justify-center"
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <Phone size={16} />

                      {calledFacilityId === fac.id
                        ? "Calling..."
                        : "Call Now"}
                    </div>

                    {!calledFacilityId && (
                      <span className="text-xs opacity-80 mt-1">
                        {fac.phone}
                      </span>
                    )}
                  </button>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${fac.coordinates.lat},${fac.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-white hover:bg-[#00e5ff]/15 hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition-all duration-300 flex flex-col items-center justify-center min-w-[120px]"
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <Navigation size={16} />
                      Directions
                    </div>

                    <span className="text-xs opacity-70 mt-1">
                      Open Google Maps
                    </span>
                  </a>

                </div>

              </div>
            ))
          )}

        </div>

        <div className="p-4 border-t border-white/10 bg-black/40 text-center text-xs text-white/50">
          In life-threatening situations, immediately call your local emergency services.
        </div>

        {toast && (
          <div className="fixed top-6 right-6 z-[100] animate-fade-in">
            <div className="rounded-xl border border-[#00e5ff]/30 bg-[#0a0f18] px-5 py-3 shadow-[0_0_25px_rgba(0,229,255,0.2)]">
              <p className="text-sm font-medium text-white">
                {toast}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};