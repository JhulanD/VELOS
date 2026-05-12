import React, { useState, useEffect } from 'react';
import { Search, Command as CommandIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CommandBar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="relative w-full max-w-lg">
      <div 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-3 py-1.5 bg-card border border-border rounded-lg cursor-pointer transition-all duration-200 group"
      >
        <Search className="w-4 h-4 text-muted group-hover:text-white" />
        <span className="text-sm text-muted flex-1">Command + K to search...</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 pointer-events-auto"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl z-[60] overflow-hidden"
            >
              <div className="p-4 border-b border-border flex items-center gap-3">
                <Search className="w-5 h-5 text-muted" />
                <input 
                  autoFocus
                  placeholder="Type a command or search..."
                  className="bg-transparent border-none outline-none flex-1 text-sm placeholder:text-muted"
                />
                <div className="flex items-center gap-2 px-2 py-1 bg-primary-accent/10 border border-primary-accent/20 rounded-lg">
                  <Sparkles className="w-3.5 h-3.5 text-primary-accent" />
                  <span className="text-[10px] font-bold text-primary-accent uppercase tracking-wider">AI Search</span>
                </div>
              </div>
              <div className="p-2">
                <p className="px-3 py-2 text-[10px] font-bold text-muted uppercase tracking-widest">Suggestions</p>
                <div className="space-y-1">
                  {['Find candidates with React expertise', 'Show active frontend jobs', 'Schedule interview for Alex'].map((text, i) => (
                    <div key={i} className="px-3 py-2.5 hover:bg-white/5 rounded-xl cursor-not-allowed group flex items-center justify-between">
                      <span className="text-sm text-white/80 group-hover:text-white">{text}</span>
                      <span className="text-[10px] text-muted font-mono">Enter</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
