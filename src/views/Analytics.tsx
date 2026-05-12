import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Target, 
  Briefcase, 
  Users, 
  Activity,
  Calculator
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { cn } from '../lib/utils';

const placementData = [
  { month: 'Jan', count: 4, revenue: 45000 },
  { month: 'Feb', count: 6, revenue: 68000 },
  { month: 'Mar', count: 5, revenue: 52000 },
  { month: 'Apr', count: 8, revenue: 84000 },
  { month: 'May', count: 7, revenue: 76000 },
];

const sourceData = [
  { name: 'LinkedIn', value: 400 },
  { name: 'Referrals', value: 300 },
  { name: 'Direct', value: 200 },
  { name: 'GitHub', value: 150 },
];

const COLORS = ['#C7FF4A', '#8B8B95', '#22222A', '#FFFFFF'];

const KPICard = ({ label, value, trend, icon: Icon, isNegative = false }: any) => (
  <div className="p-5 rounded-2xl bg-card border border-border group hover:border-primary-accent/30 transition-colors">
     <div className="flex items-center justify-between mb-4">
       <div className="p-2 rounded-lg bg-border text-muted group-hover:text-primary-accent">
         <Icon className="w-5 h-5" />
       </div>
       <div className={cn(
         "flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full",
         isNegative ? "bg-red-500/10 text-red-500" : "bg-primary-accent/10 text-primary-accent"
       )}>
         {isNegative ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
         {trend}
       </div>
     </div>
     <p className="text-2xl font-bold tracking-tight">{value}</p>
     <p className="text-[10px] text-muted font-bold uppercase tracking-wider mt-1">{label}</p>
  </div>
);

export function Analytics() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Recruitment Analytics</h1>
          <p className="text-muted">Track performance and revenue pipeline across all <span className="text-white font-medium">active projects</span>.</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="px-4 py-2 border border-border rounded-lg bg-card text-[10px] font-bold hover:bg-white/5 transition-colors uppercase tracking-widest">
             Export CSV
           </button>
           <button className="px-4 py-2 bg-primary-accent text-black rounded-lg font-bold text-[10px] hover:scale-105 transition-transform uppercase tracking-widest">
             Last 30 Days
           </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <KPICard label="Total Revenue" value="$325,000" trend="+15.4%" icon={Calculator} />
         <KPICard label="Avg Placement Fee" value="$12,400" trend="+2.1%" icon={Target} />
         <KPICard label="Time to Fill" value="18 Days" trend="-4.5%" icon={Activity} isNegative={false} />
         <KPICard label="Job-to-Placement" value="12%" trend="+0.8%" icon={Briefcase} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="p-8 rounded-2xl bg-card border border-border h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold tracking-tight">Revenue Growth</h3>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1">Monthly billing vs placements</p>
            </div>
          </div>
          <div className="flex-1">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={placementData}>
                 <defs>
                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#C7FF4A" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#C7FF4A" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#22222A" />
                 <XAxis dataKey="month" stroke="#8B8B95" fontSize={10} axisLine={false} tickLine={false} />
                 <YAxis stroke="#8B8B95" fontSize={10} axisLine={false} tickLine={false} />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#121218', border: '1px solid #22222A', borderRadius: '12px' }}
                   itemStyle={{ color: '#C7FF4A', fontSize: '12px' }}
                 />
                 <Area type="monotone" dataKey="revenue" stroke="#C7FF4A" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </section>

        <section className="p-8 rounded-2xl bg-card border border-border h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold tracking-tight">Candidate Sourcing</h3>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-1">Channel distribution</p>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121218', border: '1px solid #22222A', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-1/3 space-y-3 font-mono">
               {sourceData.map((d, i) => (
                 <div key={i} className="flex items-center justify-between text-[10px]">
                   <span className="text-muted">{d.name}</span>
                   <span className="font-bold" style={{ color: COLORS[i] }}>{d.value}</span>
                 </div>
               ))}
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <section className="lg:col-span-1 p-6 rounded-2xl bg-border border border-border flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary-accent text-background">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold">Team Performance</h4>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Sarah Connor', score: 92 },
                { name: 'John Doe', score: 78 },
                { name: 'Marcus Miles', score: 85 }
              ].map(member => (
                <div key={member.name} className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{member.name}</span>
                    <span className="text-muted">{member.score}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-primary-accent rounded-full transition-all duration-1000" style={{ width: `${member.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
         </section>
         
         <section className="lg:col-span-2 p-8 rounded-2xl bg-card border border-border">
            <h3 className="font-bold mb-6">Recruitment Velocity</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={placementData}>
                  <XAxis dataKey="month" stroke="#8B8B95" fontSize={10} axisLine={false} tickLine={false} />
                  <Bar dataKey="count" fill="#C7FF4A" radius={[4, 4, 0, 0]} barSize={40} />
                  <Tooltip 
                     cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                     contentStyle={{ backgroundColor: '#121218', border: '1px solid #22222A', borderRadius: '12px' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
         </section>
      </div>
    </div>
  );
}
