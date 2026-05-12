import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Linkedin, 
  Phone, 
  MapPin, 
  Clock,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatDate } from '../lib/utils';
import { Candidate } from '../types';
import { generateCandidateSummary } from '../services/gemini';

export function Candidates() {
  const { candidates, updateCandidateSummary, updateCandidateStatus } = useApp();
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId) || null;

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCandidate = (candidate: Candidate) => {
    setSelectedCandidateId(candidate.id);
  };

  const handleGenerateSummary = async (candidate: Candidate) => {
    setIsGenerating(true);
    try {
      const summary = await generateCandidateSummary(candidate.name, candidate.role, candidate.skills);
      await updateCandidateSummary(candidate.id, summary);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 overflow-hidden">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Talent CRM</h1>
          <p className="text-muted">Manage your deep pool of <span className="text-white font-medium">{candidates.length} global experts</span>.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted group-focus-within:text-white transition-colors" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search talent..."
              className="bg-card border border-border rounded-lg pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary-accent/40 w-64 transition-all"
            />
          </div>
          <button className="p-2 border border-border rounded-lg bg-card hover:bg-white/5 text-muted transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Table Section */}
      <div className="bg-card border border-border rounded-2xl flex flex-col overflow-hidden">
        <div className="p-5 border-b border-border flex justify-between items-center bg-card/50">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/90">All Candidates</h3>
          <div className="flex gap-2">
             <button className="px-3 py-1 bg-border rounded-md text-[10px] font-bold text-white uppercase tracking-wider">Default View</button>
             <button className="px-3 py-1 text-muted text-[10px] font-bold uppercase tracking-wider hover:text-white transition-colors">By AI Match</button>
          </div>
        </div>
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left">
            <thead className="text-[11px] text-muted uppercase font-bold border-b border-border sticky top-0 bg-card/90 backdrop-blur-md">
              <tr>
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Last Activity</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border/50">
              {filteredCandidates.map((candidate) => (
                <tr 
                  key={candidate.id} 
                  onClick={() => handleSelectCandidate(candidate)}
                  className="hover:bg-border/20 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-accent/10 text-primary-accent flex items-center justify-center font-bold text-xs">
                      {candidate.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">{candidate.name}</p>
                      <p className="text-xs text-muted">{candidate.role}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-white/10",
                      candidate.status === 'placed' ? "bg-green-500/10 text-green-500" :
                      candidate.status === 'rejected' ? "bg-red-500/10 text-red-500" :
                      "bg-blue-500/10 text-blue-400"
                    )}>
                      {candidate.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-primary-accent font-mono font-bold text-base">
                      {candidate.aiScore / 10}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted font-medium text-xs">
                    {candidate.location}
                  </td>
                  <td className="px-6 py-4 text-muted text-xs">
                    {formatDate(candidate.lastContacted)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Detail Drawer */}
      <AnimatePresence>
        {selectedCandidate && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCandidateId(null)}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: 600 }}
              animate={{ x: 0 }}
              exit={{ x: 600 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[600px] h-screen bg-card border-l border-border z-50 flex flex-col shadow-2xl"
            >
              <div className="p-8 flex-1 overflow-y-auto space-y-10">
                <header className="flex items-start justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 rounded-3xl bg-primary-accent/10 border border-primary-accent/20 flex items-center justify-center font-bold text-3xl text-primary-accent">
                      {selectedCandidate.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight">{selectedCandidate.name}</h2>
                      <p className="text-muted font-medium">{selectedCandidate.role} @ {selectedCandidate.company}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-muted hover:text-white transition-colors">
                          <Mail className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-muted hover:text-white transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-muted hover:text-white transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedCandidateId(null)} className="p-2 border border-border rounded-xl bg-background hover:bg-white/5 text-muted transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </header>

                <div className="grid grid-cols-1 gap-6">
                  <div className="p-6 rounded-2xl bg-card border border-border overflow-hidden relative group/ai">
                    <div className="absolute top-0 right-0 p-4">
                       <Sparkles className={cn(
                         "w-4 h-4 text-primary-accent transition-all duration-700",
                         isGenerating ? "animate-spin scale-150" : "scale-100 opacity-40 group-hover/ai:opacity-100 group-hover/ai:scale-110"
                       )} />
                    </div>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">AI Talent Analysis</p>
                    <div className="min-h-[60px]">
                      {isGenerating ? (
                        <div className="space-y-2 animate-pulse">
                          <div className="h-2 bg-white/5 rounded w-full" />
                          <div className="h-2 bg-white/5 rounded w-5/6" />
                          <div className="h-2 bg-white/5 rounded w-4/6" />
                        </div>
                      ) : (
                        <p className="text-sm text-white/90 leading-relaxed italic">
                          {selectedCandidate.aiSummary}
                        </p>
                      )}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-primary-accent" />
                          <span className="text-[10px] font-bold text-primary-accent tracking-widest uppercase">Elite Assessment</span>
                       </div>
                       <button 
                         onClick={() => handleGenerateSummary(selectedCandidate)}
                         disabled={isGenerating}
                         className="text-[10px] font-bold text-muted hover:text-white transition-colors border-b border-muted group-hover/ai:border-white disabled:opacity-50"
                       >
                         {selectedCandidate.aiSummary ? "REGENERATE" : "ANALYZE WITH GEMINI"}
                       </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="p-6 rounded-2xl bg-primary-accent text-background flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mb-1">Talos Match Score</p>
                      <h4 className="text-4xl font-bold tracking-tighter">{selectedCandidate.aiScore / 10}</h4>
                    </div>
                    <div className="text-right">
                       <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider justify-end">
                          <TrendingUp className="w-3.5 h-3.5" /> Growth Trajectory
                       </div>
                       <p className="text-[10px] mt-1 font-medium opacity-80">98th percentile for this role</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bold text-lg">Details</h3>
                  <div className="grid grid-cols-2 gap-y-6">
                    <div>
                      <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Status</p>
                      <select 
                        value={selectedCandidate.status}
                        onChange={(e) => updateCandidateStatus(selectedCandidate.id, e.target.value)}
                        className="bg-background border border-border rounded-lg px-2 py-1 text-sm font-semibold focus:outline-none focus:border-primary-accent/40"
                      >
                        <option value="sourced">Sourced</option>
                        <option value="screening">Screening</option>
                        <option value="interview">Interview</option>
                        <option value="offer_sent">Offer Sent</option>
                        <option value="placed">Placed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    <DetailItem label="Experience" value={`${selectedCandidate.experience} Years`} />
                    <DetailItem label="Location" value={selectedCandidate.location} />
                    <DetailItem label="Expectation" value={selectedCandidate.salaryExpectation} />
                    <DetailItem label="Email" value={selectedCandidate.email} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 rounded-xl bg-white/5 border border-border text-[11px] font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4 pt-10">
                   <h3 className="font-bold text-lg flex items-center justify-between">
                     Recent Activity
                     <button className="text-[10px] font-bold text-primary-accent">+ LOG ACTIVITY</button>
                   </h3>
                   <div className="space-y-4 border-l-2 border-border/50 ml-2 pl-6 relative">
                      {[
                        { time: '2 hours ago', text: 'Internal Screening Interview completed by Sarah Connor', icon: MessageCircle },
                        { time: '1 day ago', text: 'CV shared with Linear hiring manager', icon: Send },
                        { time: '3 days ago', text: 'Candidate availability confirmed', icon: CheckSquare }
                      ].map((item, i) => (
                        <div key={i} className="relative">
                          <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-border" />
                          <p className="text-sm font-medium">{item.text}</p>
                          <p className="text-[10px] text-muted font-bold tracking-wider mt-1 uppercase">{item.time}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              <div className="p-8 border-t border-border bg-background/50 backdrop-blur-xl flex items-center gap-4">
                <button className="flex-1 py-3 bg-primary-accent text-background rounded-2xl font-bold text-sm tracking-tight flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                  <Zap className="w-4 h-4" /> GENERATE OUTREACH
                </button>
                <button className="flex-1 py-3 bg-card border border-border text-white rounded-2xl font-bold text-sm tracking-tight flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                  <Star className="w-4 h-4" /> SHORTLIST
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const DetailItem = ({ label, value }: { label: string, value: string }) => (
  <div>
    <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-semibold">{value}</p>
  </div>
);

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

const MessageCircle = ({ className }: { className?: string }) => (
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
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
);

const Send = ({ className }: { className?: string }) => (
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
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const CheckSquare = ({ className }: { className?: string }) => (
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
    <path d="m9 11 3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);
