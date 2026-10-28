import React, { useState, useEffect } from 'react';
import { X, User, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, mode, onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(mode);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setActiveTab(mode);
    setSuccessMsg('');
  }, [mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(
      activeTab === 'login'
        ? 'Welcome back to Medi Aura Emergency Portal.'
        : 'Account created successfully! Connecting to Emergency Network.'
    );
    setTimeout(() => {
      onClose();
      setSuccessMsg('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-outfit">
      <div className="relative w-full max-w-md bg-[#0b0f19] border border-[#00e5ff]/30 rounded-2xl shadow-[0_0_60px_rgba(0,229,255,0.2)] overflow-hidden flex flex-col">
        
        {/* Header Tabs */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex gap-4 font-bold text-sm uppercase">
            <button
              onClick={() => { setActiveTab('login'); setSuccessMsg(''); }}
              className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'login'
                  ? 'border-[#00e5ff] text-[#00e5ff]'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setSuccessMsg(''); }}
              className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'signup'
                  ? 'border-[#00e5ff] text-[#00e5ff]'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              SIGN UP
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {successMsg ? (
            <div className="py-8 text-center space-y-3">
              <ShieldCheck className="w-12 h-12 text-[#00e5ff] mx-auto animate-pulse" />
              <p className="text-white font-bold text-base">{successMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-white/80 uppercase mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    required
                    placeholder="patient@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 uppercase mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-white/15 rounded-xl text-sm text-white focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#00e5ff] hover:bg-cyan-300 text-black font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>{activeTab === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/50 border-t border-white/10 text-center text-xs text-white/50">
          Secured with 256-bit HIPAA compliant medical encryption.
        </div>

      </div>
    </div>
  );
};
