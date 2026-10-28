import { TriangleAlert } from "lucide-react";

const EmergencyAlert = () => {
  return (
    <div
      className="
        mb-4
        rounded-xl
        border
        border-red-500/40
        bg-red-500/10
        p-4
      "
    >
      <div className="flex items-start gap-3">
        <TriangleAlert className="w-6 h-6 text-red-400 flex-shrink-0" />

        <div>
          <h3 className="font-bold text-red-400">
            Medical Emergency Detected
          </h3>

          <p className="mt-2 text-sm text-gray-200">
            Your symptoms may indicate a medical emergency.
            Please contact emergency services or visit the
            nearest hospital immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;