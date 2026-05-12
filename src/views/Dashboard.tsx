import React from 'react';
import { TrendingUp, Users, Briefcase, Target, ArrowUpRight, Activity } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { motion } from 'motion/react';
import { cn, formatDate } from '../lib/utils';

export function Dashboard() {
  const { currentUser, candidates, jobs, tasks } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Recruiter Operating System</h1>
          <p className="text-muted">You have <span className="text-white font-medium">{tasks.filter(t => !t.completed).length} pending tasks</span> and <span className="text-white font-medium">{candidates.length} talent profiles</span> in your workspace.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary-accent text-black font-semibold rounded-lg text-sm transition-opacity hover:opacity-90">Create Job</button>
          <button className="px-4 py-2 bg-card border border-border font-semibold rounded-lg text-sm">Settings</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Pipelines" value={jobs.length} trend="+12%" />
        <StatCard label="Live Candidates" value={candidates.length} sub="Across all roles" />
        <StatCard label="My Placements" value={currentUser?.placementsThisMonth || 0} trend="$440k" sub="Average fee: 18%" />
        <StatCard label="Response Rate" value="84.2%" isGraph />
      </div>

      {/* Pipeline Table */}
      <div className="flex-1 bg-card border border-border rounded-2xl flex flex-col overflow-hidden">
        <div className="p-5 border-b border-border flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2">
             <Activity className="w-4 h-4 text-primary-accent" />
             Live Talent Stream
          </h3>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-border rounded-md text-xs font-medium">All Stages</button>
            <button className="px-3 py-1 text-muted text-xs font-medium">My Candidates</button>
          </div>
        </div>
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full text-left">
            <thead className="text-[11px] text-muted uppercase font-bold border-b border-border sticky top-0 bg-card/90 backdrop-blur-md">
              <tr>
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Stage</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Last Activity</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-border/50">
              {candidates.slice(0, 5).map((candidate) => (
                <tr key={candidate.id} className="hover:bg-border/20 cursor-pointer transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs uppercase">
                      {candidate.name.substring(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold">{candidate.name}</p>
                      <p className="text-xs text-muted">{candidate.role} @ {candidate.company}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                      candidate.status === 'placed' ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"
                    )}>
                      {candidate.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-primary-accent font-mono font-bold text-base">
                    {candidate.aiScore / 10}
                  </td>
                  <td className="px-6 py-4 text-muted font-medium">{currentUser?.name}</td>
                  <td className="px-6 py-4 text-muted text-xs">{formatDate(candidate.lastContacted)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, sub, isGraph }: any) {
  return (
    <div className="bg-card border border-border p-5 rounded-2xl">
      <div className="flex justify-between items-start mb-3">
        <p className="text-muted text-xs font-medium uppercase tracking-wider">{label}</p>
        {trend && (
          <span className="text-primary-accent text-[10px] font-bold bg-primary-accent/10 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      {sub && <p className="text-[10px] text-muted mt-4 font-medium uppercase tracking-wider">{sub}</p>}
      {isGraph && (
        <div className="flex gap-1 mt-4 items-end h-8">
          {[16, 24, 12, 20, 32].map((h, i) => (
            <div key={i} className="w-1 bg-primary-accent rounded-full" style={{ height: `${h}px` }} />
          ))}
        </div>
      )}
      {!isGraph && !sub && (
        <div className="w-full h-1 bg-border rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-blue-500 w-2/3"></div>
        </div>
      )}
    </div>
  );
}

const Sparkles = ({ className }: { className?: string }) => (
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
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
