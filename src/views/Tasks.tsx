import React from 'react';
import { 
  CheckSquare, 
  Calendar, 
  Clock, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter,
  User,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { cn, formatDate, formatTime } from '../lib/utils';
import { motion } from 'motion/react';

export function Tasks() {
  const { tasks, toggleTask, candidates } = useApp();

  const getCandidateName = (id?: string) => {
    if (!id) return null;
    return candidates.find(c => c.id === id)?.name;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Recruiter Tasks</h1>
          <p className="text-muted">Stay on top of your operations. <span className="text-white font-medium">{tasks.filter(t => !t.completed).length} pending actions</span>.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-primary-accent text-black rounded-lg font-bold text-xs transition-transform hover:scale-105 uppercase tracking-widest">
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex gap-4">
              <button className="text-[10px] font-bold text-white uppercase tracking-widest border-b-2 border-primary-accent pb-1">Incoming</button>
              <button className="text-[10px] font-bold text-muted uppercase tracking-widest pb-1 hover:text-white transition-colors">Completed</button>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest">
               <Filter className="w-3.5 h-3.5" />
               <span>Today</span>
            </div>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <motion.div 
                key={task.id}
                className={cn(
                  "p-4 rounded-xl border border-border group transition-all flex items-center gap-4",
                  task.completed ? "bg-card/30 opacity-60" : "bg-card border-border hover:border-primary-accent/40"
                )}
              >
                <button 
                  onClick={() => toggleTask(task.id, !task.completed)}
                  className={cn(
                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors shrink-0",
                    task.completed ? "bg-primary-accent border-primary-accent" : "border-border hover:border-primary-accent/60"
                  )}
                >
                  {task.completed && <CheckSquare className="w-4 h-4 text-background" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className={cn("font-bold text-sm tracking-tight", task.completed && "line-through text-muted")}>
                      {task.title}
                    </h3>
                    <span className={cn(
                      "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border",
                      task.priority === 'high' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                      task.priority === 'medium' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                      "bg-muted/10 text-muted border-muted/20"
                    )}>
                      {task.priority}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2">
                     <div className="flex items-center gap-1 text-[10px] text-muted font-medium uppercase tracking-tight">
                        <Clock className="w-3 h-3 text-primary-accent/60" />
                        {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </div>
                     {task.candidateId && (
                       <div className="flex items-center gap-1 text-[10px] text-primary-accent font-bold uppercase tracking-wider bg-primary-accent/5 px-2 py-0.5 rounded">
                          <User className="w-3 h-3" />
                          {getCandidateName(task.candidateId)}
                       </div>
                     )}
                  </div>
                </div>

                <button className="p-2 text-muted hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Schedule Widget */}
        <div className="space-y-6">
           <section className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xs uppercase tracking-widest text-white/90">Work Schedule</h3>
                <Calendar className="w-4 h-4 text-muted" />
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-8">
                {['M','T','W','T','F','S','S'].map((day, i) => (
                  <div key={i} className="text-center text-[10px] font-bold text-muted">{day}</div>
                ))}
                {Array.from({length: 31}).map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "aspect-square flex items-center justify-center text-[10px] font-bold rounded-lg transition-colors cursor-pointer",
                      i + 1 === 12 ? "bg-primary-accent text-background" : "hover:bg-white/5"
                    )}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                 <p className="text-[10px] font-bold text-muted uppercase tracking-widest">Upcoming Interviews</p>
                 <div className="p-4 rounded-xl bg-background border border-border border-l-4 border-l-primary-accent group hover:border-primary-accent/30 transition-colors">
                    <p className="text-xs font-bold group-hover:text-primary-accent transition-colors">Jessica Chen & Linear</p>
                    <p className="text-[10px] text-muted mt-1 uppercase font-bold tracking-widest leading-none">Tomorrow, 10:00 AM</p>
                 </div>
                 <div className="p-4 rounded-xl bg-background border border-border border-l-4 border-l-muted opacity-60">
                    <p className="text-xs font-bold text-muted">Alex Rivera & Vante</p>
                    <p className="text-[10px] text-muted mt-1 uppercase font-bold tracking-widest leading-none">Thu, 2:30 PM</p>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
