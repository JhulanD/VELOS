import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Zap, 
  CheckSquare, 
  BarChart3, 
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useApp } from '../../store/AppContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Candidates', path: '/candidates' },
  { icon: Briefcase, label: 'Jobs', path: '/jobs' },
  { icon: MessageSquare, label: 'Communications', path: '/outreach' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: Zap, label: 'Automations', path: '/automations' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
];

export function Sidebar() {
  const { currentUser, logout } = useApp();

  return (
    <aside className="w-64 border-r border-border flex flex-col shrink-0 bg-background">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary-accent rounded-lg flex items-center justify-center">
           <Zap className="w-5 h-5 text-black" fill="currentColor" />
        </div>
        <span className="text-xl font-black tracking-tight uppercase italic">VELO</span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 text-sm font-medium",
              isActive 
                ? "bg-card text-primary-accent shadow-sm" 
                : "text-muted hover:text-white hover:bg-card/50"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto space-y-4">
        {currentUser && (
          <div className="flex items-center gap-3 px-2">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-8 h-8 rounded-full ring-2 ring-border"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">{currentUser.name}</p>
              <p className="text-[10px] text-muted truncate uppercase tracking-widest leading-tight">Placements: {currentUser.placementsThisMonth}</p>
            </div>
          </div>
        )}

        <div className="bg-card p-4 rounded-2xl border border-border">
          <p className="text-[10px] text-primary-accent font-bold uppercase tracking-widest mb-1">Status</p>
          <p className="text-xs text-muted">Workspace active</p>
          <div className="w-full bg-border h-1 rounded-full mt-2">
            <div className="bg-primary-accent h-1 rounded-full w-4/5"></div>
          </div>
        </div>

        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
