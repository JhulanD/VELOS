import React, { useState } from 'react';
import { 
  CheckSquare, 
  Calendar, 
  Clock, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Filter,
  User,
  AlertCircle,
  GripVertical
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { cn, formatDate, formatTime } from '../lib/utils';
import { motion } from 'motion/react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Task } from '../types';

const COLUMNS: { id: Task['status']; title: string }[] = [
  { id: 'todo', title: 'To-Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];

function QuickAddTask({ status, taskCount }: { status: Task['status'], taskCount: number }) {
  const { addTask } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    await addTask({
      title,
      priority,
      status,
      order: taskCount,
      completed: status === 'done',
      dueDate: dueDate || new Date().toISOString(),
      type: 'other'
    });

    setTitle('');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button 
        onClick={() => setIsAdding(true)}
        className="mt-4 w-full py-3 border border-dashed border-border rounded-xl text-[10px] font-bold text-muted uppercase tracking-widest hover:border-primary-accent/40 hover:text-white transition-all flex items-center justify-center gap-2"
      >
        <Plus className="w-3 h-3" /> Add Task
      </button>
    );
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="mt-4 p-4 bg-background border border-primary-accent/30 rounded-xl space-y-3"
    >
      <input 
        autoFocus
        placeholder="Task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-transparent border-none p-0 text-sm font-bold placeholder:text-muted focus:ring-0 text-white"
      />
      
      <div className="flex flex-col gap-2">
        <label className="text-[8px] font-bold text-muted uppercase tracking-widest">Priority & Due Date</label>
        <div className="flex items-center gap-2">
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="bg-border/20 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-border/50 focus:outline-none text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input 
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="flex-1 bg-border/20 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-border/50 focus:outline-none text-white"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <button 
          type="submit"
          className="flex-1 py-1.5 bg-primary-accent text-background text-[10px] font-black uppercase tracking-widest rounded-lg hover:opacity-90 transition-opacity"
        >
          Add Task
        </button>
        <button 
          type="button"
          onClick={() => setIsAdding(false)}
          className="px-3 py-1.5 border border-border text-muted text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
}

export function Tasks() {
  const { tasks, toggleTask, updateTaskStatus, candidates } = useApp();

  const getCandidateName = (id?: string) => {
    if (!id) return null;
    return candidates.find(c => c.id === id)?.name;
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { draggableId, destination, source } = result;
    const newStatus = destination.droppableId as Task['status'];
    const newIndex = destination.index;
    
    // Check if anything actually changed
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    
    updateTaskStatus(draggableId, newStatus, newIndex);
    
    // Note: In a production app, we'd also re-order all other items in the same column
    // but for this demo, we'll keep it simple by assigning the destination index as the new order.
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(t => t.status === status);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Recruiter Tasks</h1>
          <p className="text-muted">Stay on top of your operations. <span className="text-white font-medium">{tasks.filter(t => t.status !== 'done').length} pending actions</span>.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2 bg-primary-accent text-black rounded-lg font-bold text-xs transition-transform hover:scale-105 uppercase tracking-widest">
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Kanban Board */}
        <div className="xl:col-span-3">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COLUMNS.map((column) => (
                <div key={column.id} className="flex flex-col h-full bg-border/20 rounded-2xl p-4 min-h-[600px]">
                  <div className="flex items-center justify-between mb-6 px-2">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">
                      {column.title}
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-white/5 text-white/50 text-[9px]">
                        {getTasksByStatus(column.id).length}
                      </span>
                    </h3>
                    <MoreHorizontal className="w-4 h-4 text-muted cursor-pointer hover:text-white transition-colors" />
                  </div>

                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex-1 space-y-3"
                      >
                        {getTasksByStatus(column.id).map((task, index) => (
                          /* @ts-expect-error key is required by React in map but not in DraggableProps */
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={cn(
                                  "p-4 rounded-xl border border-border group transition-all flex flex-col gap-3",
                                  snapshot.isDragging ? "bg-card shadow-2xl ring-2 ring-primary-accent/20 border-primary-accent scale-[1.02]" : "bg-card hover:border-primary-accent/40",
                                  task.status === 'done' ? "opacity-60" : ""
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  <div {...provided.dragHandleProps} className="mt-1 text-muted hover:text-white cursor-grab active:cursor-grabbing">
                                    <GripVertical className="w-4 h-4" />
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <h3 className={cn("font-bold text-sm tracking-tight", task.status === 'done' && "line-through text-muted")}>
                                      {task.title}
                                    </h3>
                                    
                                    <div className="flex items-center gap-2 mt-2">
                                       <span className={cn(
                                        "text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border leading-none",
                                        task.priority === 'high' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                        task.priority === 'medium' ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                                        "bg-muted/10 text-muted border-muted/20"
                                      )}>
                                        {task.priority}
                                      </span>
                                      <div className="flex items-center gap-1 text-[9px] text-muted font-medium uppercase tracking-tight">
                                        <Clock className="w-3 h-3 text-primary-accent/60" />
                                        {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {task.candidateId && (
                                   <div className="flex items-center gap-1.5 text-[9px] text-primary-accent font-bold uppercase tracking-wider bg-primary-accent/5 px-2 py-1 rounded w-fit">
                                      <User className="w-3 h-3" />
                                      {getCandidateName(task.candidateId)}
                                   </div>
                                )}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  
                  <QuickAddTask status={column.id} taskCount={getTasksByStatus(column.id).length} />
                </div>
              ))}
            </div>
          </DragDropContext>
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
