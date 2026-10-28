import React, { useState } from 'react';
import { X, PhoneCall, ShieldAlert, HeartPulse, Search, Copy, Check } from 'lucide-react';
import { mockEmergencyContacts } from '../data/mockData';

interface EmergencyNumbersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyNumbersModal: React.FC<EmergencyNumbersModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  if (!isOpen) return null;

  const handleCopy = (id: string, num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredContacts = mockEmergencyContacts.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.number.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-outfit">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-[#0b0f19] border border-[#00e5ff]/30 rounded-2xl shadow-[0_0_60px_rgba(0,229,255,0.25)] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/15 border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff]">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                Emergency Numbers Directory
              </h2>
              <p className="text-xs text-white/60">
                Instant 24/7 National & Regional Medical Helplines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-white/10 bg-black/20">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search helpline (e.g., Ambulance, Poison, 911)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#00e5ff]"
            />
          </div>
        </div>

        {/* Numbers List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 max-h-[55vh]">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00e5ff]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30">
                    {contact.category}
                  </span>
                  <h3 className="font-bold text-white text-base sm:text-lg">
                    {contact.title}
                  </h3>
                </div>
                <p className="text-xs text-white/60">
                  {contact.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopy(contact.id, contact.number)}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-all cursor-pointer"
                  title="Copy Number"
                >
                  {copiedId === contact.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                <a
                  href={`tel:${contact.number.replace(/[^0-9+]/g, '')}`}
                  className="px-4 py-2.5 rounded-lg bg-[#00e5ff] hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.4)] cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 fill-black" />
                  {contact.number}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/50 border-t border-white/10 text-center text-xs text-white/50">
          Tip: Bookmark this directory on your mobile browser for offline emergency access.
        </div>

      </div>
    </div>
  );
};
