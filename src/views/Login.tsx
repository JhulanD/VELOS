import React from 'react';
import { useApp } from '../store/AppContext';
import { motion } from 'motion/react';
import { Briefcase, Zap, Shield, Target } from 'lucide-react';

export function Login() {
  const { login } = useApp();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-accent rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-accent rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center max-w-md"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
           <div className="p-2 rounded-xl bg-primary-accent text-background">
              <Briefcase className="w-8 h-8 font-bold" />
           </div>
           <span className="text-3xl font-black tracking-tighter uppercase italic">Velo</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-4">Precision Talent Operating System</h1>
        <p className="text-muted mb-12">The AI-native workspace for high-velocity executive recruitment teams.</p>

        <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="p-4 rounded-2xl bg-card border border-border text-left">
                <Target className="w-5 h-5 text-primary-accent mb-2" />
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Market Mapping</p>
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border text-left">
                <Zap className="w-5 h-5 text-primary-accent mb-2" />
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest">AI Scoring</p>
            </div>
        </div>

        <button 
          onClick={login}
          className="w-full py-4 bg-primary-accent text-black rounded-2xl font-bold text-sm hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-2xl shadow-primary-accent/20"
        >
          START RECRUITING WITH GOOGLE
        </button>
        
        <div className="mt-8 flex flex-col gap-4">
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" /> Secure Enterprise Access
          </p>
          
          <button 
            onClick={() => {
              const info = `
Current Domain: ${window.location.hostname}
Firebase Auth Domain: ${auth.app.options.authDomain}
Project ID: ${auth.app.options.projectId}

If you see "auth/unauthorized-domain", you MUST add the Current Domain to your Firebase Authorized Domains list.
              `;
              console.log("Auth Diagnostics:", {
                hostname: window.location.hostname,
                config: auth.app.options
              });
              alert(info);
            }}
            className="text-[10px] text-muted underline hover:text-white transition-colors uppercase tracking-widest font-black"
          >
            Trouble signing in? (Diagnostics)
          </button>
        </div>
      </motion.div>
    </div>
  );
}
