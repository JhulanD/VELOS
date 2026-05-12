import React, { useState } from 'react';
import { 
  Zap, 
  Plus, 
  Play, 
  Settings2, 
  Trash2, 
  ChevronRight, 
  ArrowRight,
  UserPlus,
  Mail,
  Calendar,
  Sparkles,
  Bot,
  Layers,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Workflow {
  id: string;
  name: string;
  description: string;
  active: boolean;
  trigger: string;
  steps: string[];
  runsThisMonth: number;
}

const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: 'w1',
    name: 'New Candidate Nurture',
    description: 'Triggered when a new candidate is added to the database. Sends an intro and schedules a check-in.',
    active: true,
    trigger: 'Candidate Added',
    steps: ['Generate AI Summary', 'Send Outreach Email', 'Create Follow-up Task'],
    runsThisMonth: 124
  },
  {
    id: 'w2',
    name: 'Interview Follow-up',
    description: 'Automates candidate feedback collection after a client interview.',
    active: false,
    trigger: 'Stage moved to Client Interview',
    steps: ['Wait 24 hours', 'Send Feedback Survey', 'Alert Recruiter'],
    runsThisMonth: 0
  },
  {
    id: 'w3',
    name: 'LinkedIn Auto-Enrich',
    description: 'Uses AI to enrich profile with latest LinkedIn details and summary.',
    active: true,
    trigger: 'Candidate Profile View',
    steps: ['Fetch Profile Data', 'Generate Recruiter Notes'],
    runsThisMonth: 850
  }
];

export function Automations() {
  const [workflows, setWorkflows] = useState<Workflow[]>(MOCK_WORKFLOWS);
  const [isCreating, setIsCreating] = useState(false);

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, active: !w.active } : w));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Automations</h1>
          <p className="text-muted">Supercharge your recruiting workflow with <span className="text-white font-medium">AI-powered triggers</span> and actions.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-6 py-2 bg-primary-accent text-black rounded-lg font-bold text-xs hover:scale-105 transition-transform uppercase tracking-widest"
        >
          <Plus className="w-4 h-4" /> Create Workflow
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted">Active Workflows</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {workflows.map((workflow) => (
              <div 
                key={workflow.id}
                className={cn(
                  "p-6 rounded-2xl border border-border group transition-all",
                  workflow.active ? "bg-card border-primary-accent/20" : "bg-card/50 opacity-60 grayscale"
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      workflow.active ? "bg-primary-accent/10 text-primary-accent" : "bg-white/5 text-muted"
                    )}>
                      <Zap className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm tracking-tight">{workflow.name}</h3>
                      <p className="text-[10px] text-muted font-bold tracking-widest uppercase mt-0.5">{workflow.trigger}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs font-bold">{workflow.runsThisMonth}</p>
                      <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Runs</p>
                    </div>
                    <button 
                      onClick={() => toggleWorkflow(workflow.id)}
                      className={cn(
                        "w-10 h-6 rounded-full relative transition-colors",
                        workflow.active ? "bg-primary-accent" : "bg-white/10"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                        workflow.active ? "left-5" : "left-1"
                      )} />
                    </button>
                  </div>
                </div>
                
                <p className="text-xs text-muted leading-relaxed mb-6">
                  {workflow.description}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {workflow.steps.map((step, i) => (
                    <React.Fragment key={i}>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-border rounded-lg text-[10px] font-bold text-white/70">
                        {step.includes('AI') ? <Sparkles className="w-3 h-3 text-primary-accent" /> : <Activity className="w-3 h-3" />}
                        {step}
                      </div>
                      {i < workflow.steps.length - 1 && <ArrowRight className="w-3 h-3 text-muted/30" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Templates / Insights */}
        <div className="space-y-8">
           <section className="p-8 rounded-2xl bg-primary-accent/5 border border-primary-accent/10 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-accent/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
              <Bot className="w-10 h-10 text-primary-accent mb-4 relative z-10" />
              <h3 className="text-xl font-bold tracking-tight relative z-10 mb-2">Build with Talos AI</h3>
              <p className="text-sm text-white/70 leading-relaxed relative z-10 mb-6">
                Just describe the automation you want, and Talos will build the workflow logic for you using your agency's preferred stages and templates.
              </p>
              <div className="relative z-10 bg-background/50 backdrop-blur-md rounded-xl p-4 border border-border">
                <p className="text-xs italic text-muted font-light">"When a candidate is moved to 'Offer', send a Slack notification and create a reminder to call them in 48 hours..."</p>
              </div>
           </section>

           <section className="space-y-4">
             <h2 className="text-sm font-bold uppercase tracking-widest text-muted px-2">Templates</h2>
             <div className="space-y-3">
               {[
                 { icon: UserPlus, label: 'Candidate Shortlist Generator' },
                 { icon: Mail, label: 'Rejected Candidate Nurture' },
                 { icon: Calendar, label: 'Interview Delay Notifier' },
                 { icon: Layers, label: 'Multi-stage Outbound Sequence' }
               ].map((tmpl, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:bg-white/5 cursor-pointer group transition-colors">
                   <div className="flex items-center gap-4">
                     <div className="p-2 rounded-lg bg-white/5 text-muted group-hover:text-primary-accent transition-colors">
                       <tmpl.icon className="w-4 h-4" />
                     </div>
                     <span className="text-sm font-bold text-white/80 group-hover:text-white">{tmpl.label}</span>
                   </div>
                   <Plus className="w-4 h-4 text-muted group-hover:text-primary-accent" />
                 </div>
               ))}
             </div>
           </section>
        </div>
      </div>

      {/* Basic Modal for "Create" (simulated) */}
      <AnimatePresence>
        {isCreating && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreating(false)}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 pointer-events-auto"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl z-[60] overflow-hidden"
            >
              <div className="p-8 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Create Automation</h2>
                  <p className="text-xs text-muted font-medium mt-1">Design your custom recruiter workflow logic.</p>
                </div>
                <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-white/5 rounded-xl text-muted">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 space-y-8">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Workflow Trigger</label>
                  <div className="flex items-center justify-between p-4 bg-background border border-primary-accent/40 rounded-xl cursor-pointer">
                    <span className="text-sm font-bold">Candidate Status Changed</span>
                    <ChevronRight className="w-4 h-4 text-primary-accent" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">Steps</label>
                  <div className="p-4 bg-background border border-dashed border-border rounded-xl flex items-center justify-center text-xs text-muted hover:border-primary-accent group transition-colors cursor-pointer">
                    <Plus className="w-4 h-4 mr-2 group-hover:text-primary-accent" /> ADD ACTION or AI LOGIC
                  </div>
                </div>
              </div>
              <div className="p-6 bg-background/50 border-t border-border flex items-center justify-end gap-3">
                 <button onClick={() => setIsCreating(false)} className="px-6 py-2 text-sm font-bold hover:bg-white/5 rounded-xl transition-colors">CANCEL</button>
                 <button className="px-8 py-2 bg-primary-accent text-background rounded-xl font-bold text-sm tracking-tight hover:scale-105 transition-transform shadow-lg shadow-primary-accent/20">
                   PUBLISH
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const X = ({ className }: { className?: string }) => (
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
