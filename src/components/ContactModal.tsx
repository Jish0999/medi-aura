import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, Phone, MapPin } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Emergency Support Inquiry',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-outfit">
      <div className="relative w-full max-w-xl bg-[#0b0f19] border border-[#00e5ff]/30 rounded-2xl shadow-[0_0_60px_rgba(0,229,255,0.2)] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/15 border border-[#00e5ff]/40 flex items-center justify-center text-[#00e5ff]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                Contact Medi Aura
              </h2>
              <p className="text-xs text-white/60">
                24/7 Patient Support & Hospital Integration Center
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

        {/* Form Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase">Message Dispatched</h3>
              <p className="text-sm text-white/70">
                Our emergency command center team will respond shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase mb-1">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-[#00e5ff]"
                >
                  <option value="Emergency Support Inquiry">Emergency Support Inquiry</option>
                  <option value="Hospital Network Integration">Hospital Network Integration</option>
                  <option value="Ambulance Dispatch Feedback">Ambulance Dispatch Feedback</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry or request..."
                  className="w-full px-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#00e5ff] hover:bg-cyan-300 text-black font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 fill-black" />
                SEND MESSAGE
              </button>
            </form>
          )}

          {/* Contact Details */}
          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#00e5ff]" />
              <span>+1 (800) 555-AURA (24/7)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00e5ff]" />
              <span>Medical Command Plaza, Suite 100</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
