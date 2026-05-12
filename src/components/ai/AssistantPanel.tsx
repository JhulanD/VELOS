import React, { useState } from 'react';
import { Sparkles, X, Wand2, Send, Zap, Bot, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export function AssistantPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: 280, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 280, opacity: 0 }}
          className="w-[280px] border-l border-border flex flex-col bg-background shrink-0"
        >
          <div className="p-6 border-b border-border flex items-center gap-2">
            <div className="w-5 h-5 bg-primary-accent rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-black fill-current" />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest">AI Copilot</span>
          </div>
          
          <div className="p-5 flex-1 space-y-6 overflow-y-auto">
            <div className="space-y-3">
              <p className="text-xs text-muted font-bold uppercase tracking-tighter">Strategic Insight</p>
              <div className="bg-card p-4 rounded-xl border border-border text-xs leading-relaxed">
                <span className="text-primary-accent font-bold">Stalled Pipeline:</span> The "Engineering Manager" role at Vanta hasn't moved in 4 days. 3 candidates are awaiting client feedback.
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-muted font-bold uppercase tracking-tighter">AI Actions</p>
              <div className="space-y-2">
                {[
                  { label: "Summarize Alex R.", sub: "Analyze CV & LinkedIn" },
                  { label: "Draft Outreach", sub: "Hyper-personalized sequence" },
                  { label: "Interview Prep Kit", sub: "Generate candidate brief" }
                ].map((action, i) => (
                  <div key={i} className="p-3 bg-card border border-border rounded-lg hover:border-primary-accent/50 cursor-pointer group flex items-center justify-between transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">{action.label}</span>
                      <span className="text-[10px] text-muted">{action.sub}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary-accent" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-primary-accent/5 border border-primary-accent/20 rounded-xl">
              <p className="text-[10px] font-bold text-primary-accent uppercase mb-2">Recruiter Health</p>
              <div className="flex items-center gap-3">
                <div className="text-xl font-bold">98%</div>
                <div className="text-[10px] text-muted leading-tight">Activity is at an all-time high. Placements expected next week.</div>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="bg-border p-2 rounded-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-muted font-medium uppercase">AI Online • Processing</span>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
