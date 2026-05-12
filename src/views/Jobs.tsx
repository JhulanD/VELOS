import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Plus, 
  MoreVertical, 
  MapPin, 
  Users, 
  ChevronRight,
  TrendingUp,
  Clock,
  ExternalLink,
  Target,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { cn, formatDate } from '../lib/utils';
import { Job, Candidate, CandidateStatus } from '../types';

const PIPELINE_STAGES: { id: CandidateStatus; label: string }[] = [
  { id: 'sourced', label: 'Sourced' },
  { id: 'screening', label: 'Screening' },
  { id: 'interview', label: 'Interview' },
  { id: 'client_interview', label: 'Client' },
  { id: 'offer', label: 'Offer' },
];

export function Jobs() {
  const { jobs, candidates } = useApp();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  return (
    <div className="space-y-8 h-full flex flex-col overflow-hidden animate-in fade-in duration-500">
      <AnimatePresence mode="wait">
        {!selectedJob ? (
          <motion.div 
            key="job-list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <header className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">Active Roles</h1>
                <p className="text-muted">Manage active roles and hiring pipelines across <span className="text-white font-medium">{jobs.length} companies</span>.</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-2 bg-primary-accent text-black font-bold rounded-lg text-sm transition-transform hover:scale-105">
                <Plus className="w-4 h-4" /> CREATE JOB
              </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div 
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="p-6 bg-card border border-border rounded-2xl group cursor-pointer hover:border-primary-accent/40 transition-all hover:translate-y-[-2px] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-accent/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary-accent/10 transition-colors" />
                  
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-border group-hover:border-primary-accent/20 flex items-center justify-center transition-colors">
                      <Briefcase className="w-5 h-5 text-muted group-hover:text-primary-accent" />
                    </div>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border capitalize",
                      job.status === 'open' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-muted/10 text-muted border-muted/20"
                    )}>
                      {job.status}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-lg font-bold tracking-tight mb-1 group-hover:text-primary-accent transition-colors">{job.title}</h3>
                    <p className="text-sm font-medium text-muted">{job.company}</p>
                    
                    <div className="flex items-center gap-4 mt-8">
                      <div className="flex items-center gap-1.5 text-xs text-muted font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-white/80 font-bold uppercase tracking-widest">
                        {job.pipelineCount} <span className="text-muted font-medium">Talent</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex items-center justify-between relative z-10">
                    <div className="flex -space-x-2">
                       {['JD', 'SK', 'AM'].map(name => (
                         <div key={name} className="w-6 h-6 rounded-full border-2 border-card bg-white/10 flex items-center justify-center text-[8px] font-bold">
                           {name}
                         </div>
                       ))}
                    </div>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest group-hover:text-primary-accent">View Pipeline</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="job-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col space-y-6"
          >
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="p-1.5 border border-border rounded-lg bg-card hover:bg-white/5 text-muted transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{selectedJob.title}</h2>
                  <p className="text-muted text-xs font-bold uppercase tracking-widest mt-1">{selectedJob.company} • {selectedJob.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <button className="px-4 py-2 border border-border rounded-lg bg-card hover:bg-white/5 text-xs font-bold transition-colors uppercase tracking-wider">
                   Edit Details
                 </button>
                 <button className="px-6 py-2 bg-primary-accent text-black rounded-lg font-bold text-xs transition-transform hover:scale-105 uppercase tracking-wider">
                   Add Candidate
                 </button>
              </div>
            </header>

            {/* Pipeline Stage Headers */}
            <div className="flex-1 overflow-x-auto -mx-8 px-8">
              <div className="flex gap-4 h-full min-w-max">
                <LayoutGroup>
                  {PIPELINE_STAGES.map((stage) => (
                    <div key={stage.id} className="w-64 flex flex-col h-full space-y-4">
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted">{stage.label}</h3>
                          <span className="text-[10px] font-bold text-white/50">
                            {candidates.filter(c => c.status === stage.id).length}
                          </span>
                        </div>
                        <MoreVertical className="w-3.5 h-3.5 text-muted cursor-pointer hover:text-white" />
                      </div>

                      <div className="flex-1 space-y-3 p-2 bg-white/2 rounded-xl border border-white/5 border-dashed overflow-y-auto">
                        {candidates
                          .filter(c => c.status === stage.id)
                          .map((candidate) => (
                            <motion.div 
                              layout
                              layoutId={candidate.id}
                              key={candidate.id}
                              className="p-4 bg-card border border-border rounded-lg shadow-sm hover:border-primary-accent/40 cursor-grab active:cursor-grabbing group transition-colors"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-primary-accent/10 text-primary-accent flex items-center justify-center text-[10px] font-bold">
                                    {candidate.name.charAt(0)}
                                  </div>
                                  <p className="text-xs font-bold truncate text-white/90">{candidate.name}</p>
                                </div>
                                <div className="text-[10px] font-mono font-bold text-primary-accent">
                                  {candidate.aiScore / 10}
                                </div>
                              </div>
                              
                              <p className="text-[10px] text-muted truncate mb-3 font-medium">{candidate.role}</p>

                              <div className="flex items-center justify-between">
                                <span className="text-[9px] text-muted font-bold uppercase tracking-widest">{formatDate(candidate.lastContacted)}</span>
                                <div className="p-1 rounded-md hover:bg-primary-accent/10 transition-colors">
                                   <ExternalLink className="w-3 h-3 text-muted group-hover:text-primary-accent" />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  ))}
                </LayoutGroup>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
