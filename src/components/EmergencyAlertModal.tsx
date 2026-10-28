import React, { useState, useEffect } from 'react';
import {
  X,
  Bell,
  PhoneCall,
  CheckCircle2,
  Compass
} from 'lucide-react';

interface EmergencyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyAlertModal: React.FC<EmergencyAlertModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [countdown, setCountdown] = useState<number>(5);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [alertSent, setAlertSent] = useState<boolean>(false);
  const [location, setLocation] = useState<{
  latitude: number;
  longitude: number;
} | null>(null);
  const [dispatchStatus, setDispatchStatus] = useState(
    "Acquiring GPS Location..."
  );

  const [locationError, setLocationError] = useState<string>("");
  const [responseStep, setResponseStep] = useState(0);
  const responseTimes = [
  "09:42:10 PM",
  "09:42:12 PM",
  "09:42:14 PM",
  "09:42:16 PM",
  "09:42:18 PM",
  "09:42:20 PM",
];
  const [trackingProgress, setTrackingProgress] = useState(40);
  

  useEffect(() => {
    if (!isOpen) return;

    setCountdown(5);
    setIsTimerActive(true);
    setAlertSent(false);
    setResponseStep(0);

    setLocation(null);
    setLocationError("");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setLocationError("Unable to access GPS location");
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      setLocationError("Geolocation is not supported");
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isTimerActive && countdown === 0) {
      setIsTimerActive(false);
      setAlertSent(true);
    }
    return () => clearTimeout(timer);
  }, [isTimerActive, countdown]);

  useEffect(() => {
  if (alertSent) return;

  switch (countdown) {
    case 5:
      setDispatchStatus("Acquiring GPS Location...");
      break;

    case 4:
      setDispatchStatus("GPS Location Locked");
      break;

    case 3:
      setDispatchStatus("Contacting Emergency Dispatch...");
      break;

    case 2:
      setDispatchStatus("Finding Nearest Ambulance...");
      break;

    case 1:
      setDispatchStatus("Alerting Nearby Hospital...");
      break;

    case 0:
      setDispatchStatus("SOS Request Ready");
      break;
  }
}, [countdown, alertSent]);

  useEffect(() => {
    if (!alertSent) return;

    const interval = setInterval(() => {
      setResponseStep((prev) => {
        if (prev >= 5) {
          clearInterval(interval);
          return prev;
        }

        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [alertSent]);

  useEffect(() => {
  if (!alertSent) return;

  const interval = setInterval(() => {
    setTrackingProgress(prev => {
      if (prev >= 100) {
        clearInterval(interval);
        return 100;
      }

      return prev + 5;
    });
  }, 3000);

  return () => clearInterval(interval);
}, [alertSent]);

  if (!isOpen) return null;

  const handleCancel = () => {
    setIsTimerActive(false);
    onClose();
  };

  const handleTriggerNow = () => {
    setCountdown(0);
    setIsTimerActive(false);
    setAlertSent(true);
  };

  const responseSteps = [
  "SOS Request Received",
  "GPS Verified",
  "Ambulance Assigned",
  "Driver En Route",
  "Hospital Preparing",
  "Emergency Contact Notified",
];

  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  const progress = countdown / 5;

  const strokeDashoffset =
    circumference - progress * circumference;

  const totalDistance = 2.3;

  const remainingDistance = Math.max(
    0,
    totalDistance * ((100 - trackingProgress) / 60)
  );

  const maxETA = 4;

  const remainingETA = Math.max(
    0,
    Math.ceil(maxETA * ((100 - trackingProgress) / 60))
  );

  const trackingStatus =
  trackingProgress >= 100
    ? "Arrived"
    : trackingProgress >= 96
    ? "Almost There"
    : trackingProgress >= 76
    ? "Approaching"
    : trackingProgress >= 51
    ? "En Route"
    : "Dispatching";

  const hasArrived = trackingProgress >= 100;
  const ambulancePosition = Math.min(trackingProgress, 98);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in font-outfit">
      <div className="relative w-full max-w-xl h-[90vh] bg-[#0d0405] border-2 border-[#ff3b30] rounded-2xl shadow-[0_0_80px_rgba(255,59,48,0.4)] overflow-hidden flex flex-col">
        
        {/* Top Header */}
        <div className="p-5 border-b border-[#ff3b30]/30 flex items-center justify-between bg-black/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ff3b30]/20 border border-[#ff3b30] flex items-center justify-center text-[#ff3b30]">
                <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wider">
                Emergency SOS
              </h2>

              <p className="text-xs text-red-300">
                Fast emergency assistance for critical situations
              </p>
            </div>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-center space-y-6">
          
          {!alertSent ? (
            <>
              {/* Countdown Circular Visual */}
              <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-[#ff3b30]/20 animate-ping opacity-30" />
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    stroke="#ff3b30"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                      transition: "stroke-dashoffset 1s linear",
                      filter: "drop-shadow(0 0 8px #ff3b30)",
                    }}
                  />
                </svg>
                <div className="text-center">
                  <span className="text-6xl font-black text-white">
                    {countdown}
                  </span>

                  <span className="block text-[10px] text-red-400 uppercase tracking-widest font-bold mt-1">
                    Seconds Left
                  </span>

                  <p className="mt-3 text-xs text-white/70 font-medium">
                    Automatic dispatch 
                  </p>
                </div>
              </div>

              <div className="space-y-2">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                {dispatchStatus}
              </h3>

              <p className="text-sm text-white/80 max-w-md mx-auto">
                Please keep this device nearby while emergency services are being contacted.
              </p>
              </div>

              {/* GPS Info box */}
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-left text-xs text-white/80 flex items-center gap-3">
                <Compass className="w-5 h-5 text-[#00e5ff] shrink-0" />
                <div>
                  <span className="font-bold text-white block">GPS Location Acquired:</span>
                  <span className="font-mono text-white/60">
                    {location
                      ? `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`
                      : locationError || "Acquiring GPS location..."}
                  </span>
                </div>
              </div>

              <div className="space-y-3 rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-3">
                  {countdown <= 4 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-white/40" />
                  )}
                  <span className="text-sm text-white">
                    GPS Location Verified
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {countdown <= 3 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-white/40" />
                  )}
                  <span className="text-sm text-white">
                    Emergency Dispatch Contacted
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {countdown <= 2 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-white/40" />
                  )}
                  <span className="text-sm text-white">
                    Searching Nearest Ambulance
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {countdown <= 1 ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-white/40" />
                  )}
                  <span className="text-sm text-white">
                    Hospital Notification
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleTriggerNow}
                  className="flex-1 py-3.5 px-4 bg-[#ff3b30] hover:bg-red-600 text-white font-extrabold text-sm uppercase rounded-xl transition-all shadow-[0_0_25px_rgba(255,59,48,0.5)] cursor-pointer"
                >
                  DISPATCH IMMEDIATELY
                </button>
                <button
                  onClick={handleCancel}
                  className="py-3.5 px-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm uppercase rounded-xl transition-all cursor-pointer"
                >
                  CANCEL (FALSE ALARM)
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Alert Sent Success State */}
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight text-emerald-400">
                  SOS DISPATCH ACTIVE
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/60 uppercase">
                        Assigned Ambulance
                      </p>

                      <h4 className="text-2xl font-bold text-white">
                        Unit #402
                      </h4>
                    </div>

                    <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40">
                      <span className="text-xs font-bold text-emerald-400">
                        EN ROUTE
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">

                    <div>
                      <p className="text-white/50">
                        Driver
                      </p>

                      <p className="text-white font-semibold">
                        Rahul Kumar
                      </p>
                    </div>

                    <div>
                      <p className="text-white/50">
                        ETA
                      </p>

                      <p className="text-emerald-400 font-bold">
                        4 Minutes
                      </p>
                    </div>

                    <div>
                      <p className="text-white/50">
                        Distance
                      </p>

                      <p className="text-white">
                        2.3 km
                      </p>
                    </div>

                    <div>
                      <p className="text-white/50">
                        Vehicle
                      </p>

                      <p className="text-white">
                        KA-17 EM 0245
                      </p>
                    </div>

                  </div>

                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">

              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  Patient Location
                </h4>

                <span className="text-xs text-emerald-400 font-semibold">
                  LIVE GPS
                </span>
              </div>

              <div className="space-y-2">

                <div>
                  <p className="text-xs text-white/50">Coordinates</p>

                  <p className="font-mono text-sm text-white">
                    {location
                      ? `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`
                      : locationError || "Waiting for GPS..."}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-white/50">GPS Status</p>

                  <p className="text-emerald-400 font-medium">
                    {location ? "High Accuracy" : "Searching..."}
                  </p>
                </div>

              </div>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  Assigned Hospital
                </h4>

                <p className="text-lg font-bold text-white mt-1">
                  City Trauma Center
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs font-bold">
                READY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">

              <div>
                <p className="text-white/50">Distance</p>
                <p className="text-white font-semibold">3.1 km</p>
              </div>

              <div>
                <p className="text-white/50">ETA</p>
                <p className="text-white font-semibold">6 Minutes</p>
              </div>

              <div>
                <p className="text-white/50">Department</p>
                <p className="text-white font-semibold">
                  Emergency & Trauma
                </p>
              </div>

              <div>
                <p className="text-white/50">Availability</p>
                <p className="text-emerald-400 font-semibold">
                  Ready to Receive
                </p>
              </div>

            </div>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">

              {/* Tracking Header */}
              <div className="flex items-center justify-between">

                  <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                          Live Ambulance Tracking
                      </h4>

                      <p className="text-lg font-bold text-white mt-1">
                          Unit #402
                      </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                      {trackingStatus}
                  </span>

              </div>

              <div className="space-y-3">

              {/* Route */}
              <div className="flex items-center justify-between text-lg">

                <div className="flex-1 h-2 bg-white/20 mx-3 relative rounded-full">

                    {/* Green route */}
                    <div
                        style={{ width: `${trackingProgress}%` }}
                        className="
                          absolute
                          left-0
                          top-0
                          h-full
                          bg-emerald-400
                          rounded-full
                          transition-all
                          duration-1000
                          shadow-[0_0_15px_rgba(16,185,129,0.7)]
                          "
                    />

                    {/* Moving ambulance */}
                    <div
                        className="
                          absolute
                          top-1/2
                          -translate-x-1/2
                          -translate-y-1/2
                          text-3xl
                          transition-all
                          duration-1000
                          "
                          style={{
                              left: `${ambulancePosition}%`
                          }}
                    >
                        🚑
                    </div>

                </div>

                <span className="text-2xl">
                    {hasArrived ? "✅" : "📍"}
                </span>
              </div>

              {/* Progress */}


              {/* Information */}
              <div className="rounded-xl bg-black/20 border border-white/10 p-4">

                <div className="grid grid-cols-3 gap-4 text-sm">

                  {/* Remaining */}
                  <div>
                    <p className="text-white/50">Remaining</p>
                    <p className="text-white font-semibold">
                      {remainingDistance <= 0
                        ? "Arrived"
                        : `${remainingDistance.toFixed(1)} km`}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    <p className="text-white/50">Status</p>
                    <p className="text-emerald-400 font-semibold">
                      {trackingStatus}
                    </p>
                  </div>

                  {/* ETA */}
                  <div className="text-right">
                    <p className="text-white/50">ETA</p>
                    <p className="text-emerald-400 font-semibold">
                      {remainingETA === 0
                        ? "Arrived"
                        : `${remainingETA} min`}
                    </p>
                  </div>

                </div>
              </div>
            {/* Progress Bar will be added next */}

          {hasArrived && (
            <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center">
                <h4 className="text-lg font-bold text-emerald-400">
                    ✅ Medical Team Has Arrived
                </h4>

                <p className="mt-2 text-sm text-white/80">
                    Ambulance Unit #402 has reached your location.
                    Please remain calm and follow the instructions of the emergency personnel.
                </p>
            </div>
        )}

              <div className="space-y-3">
                {responseSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 rounded-lg px-2 py-2 transition-all duration-500 ${
                      index === responseStep
                        ? "bg-yellow-500/10 border border-yellow-500/20"
                        : ""
                    }`}
                  >

                    {/* Status Icon */}
                    {index < responseStep ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : index === responseStep ? (
                      <div className="w-5 h-5 rounded-full bg-yellow-400 animate-pulse" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-white/40" />
                    )}

                    {/* Step Text */}
                    <div className="flex flex-col items-start">
                      <span
                        className={`text-sm font-medium transition-all duration-500 ${
                          index < responseStep
                            ? "text-emerald-400"
                            : index === responseStep
                            ? "text-yellow-400"
                            : "text-white/50"
                        }`}
                      >
                        {step}
                      </span>

                      {index < responseStep && (
                        <span className="text-[11px] text-white/40">
                          Completed • {responseTimes[index]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-left space-y-2 text-xs text-emerald-200">
                <div className="flex items-center justify-between font-bold">
                  <span>DISPATCH ID:</span>
                  <span className="font-mono">#AURA-911-8849</span>
                </div>
                <div className="flex items-center justify-between font-bold">
                  <span>ESTIMATED ARRIVAL:</span>
                  <span className="text-emerald-400 font-extrabold text-sm">4 MINUTES</span>
                </div>
              </div>

              {/* Direct Dial 911 Button */}
              <div className="pt-2">
                <a
                  href="tel:911"
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-base uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer"
                >
                  <PhoneCall className="w-5 h-5 fill-black" />
                  CALL 911 DISPATCH NOW
                </a>
              </div>
            </div>      
            </div>
            </>
          )}

        </div>

        <div className="p-4 bg-black/60 border-t border-white/10 text-center text-[11px] text-white/50">
          Medi Aura Emergency System v2.4 • Connected to Regional Dispatch
        </div>

      </div>
    </div>
  );
};
