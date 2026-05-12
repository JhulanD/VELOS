/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { CommandBar } from './components/layout/CommandBar';
import { AssistantPanel } from './components/ai/AssistantPanel';
import { Dashboard } from './views/Dashboard';
import { Candidates } from './views/Candidates';
import { Jobs } from './views/Jobs';
import { Automations } from './views/Automations';
import { Analytics } from './views/Analytics';
import { Tasks } from './views/Tasks';
import { Login } from './views/Login';
import { AppProvider, useApp } from './store/AppContext';
import { Briefcase } from 'lucide-react';

// Simple placeholder views for now
const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
    <div className="w-16 h-16 rounded-3xl bg-card border border-border flex items-center justify-center">
      <span className="text-2xl">⏳</span>
    </div>
    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    <p className="text-muted text-sm max-w-md">We're building this module with AI-native workflows. Coming soon to your recruiter operating system.</p>
  </div>
);

function AppContent() {
  const { currentUser, authReady } = useApp();

  if (!authReady) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
         <div className="p-2 rounded-xl bg-primary-accent text-background animate-pulse mb-4">
            <Briefcase className="w-8 h-8 font-bold" />
         </div>
         <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em]">Initializing Velo OS...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-background text-white overflow-hidden font-sans">
        <Sidebar />
        
        <main className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden border-l border-border/50">
          <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-background/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
            <CommandBar />
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-background bg-blue-500 flex items-center justify-center text-[10px] font-bold">SC</div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-purple-500 flex items-center justify-center text-[10px] font-bold">JD</div>
                <div className="w-8 h-8 rounded-full border-2 border-background bg-card flex items-center justify-center text-[10px] font-bold border-dashed border-muted">+2</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted hover:text-primary-accent transition-colors cursor-pointer">
                 <Bell className="w-4 h-4" />
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-6xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/candidates" element={<Candidates />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/outreach" element={<ComingSoon title="Communications" />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/automations" element={<Automations />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<ComingSoon title="Workspace Settings" />} />
              </Routes>
            </div>
          </div>
        </main>

        <AssistantPanel />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const Bell = ({ className }: { className?: string }) => (
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
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);
