import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Users,
  AlertTriangle,
  XCircle,
  Search
} from 'lucide-react';

// TypeScript interfaces
interface Task {
  id: number;
  title: string;
  description: string;
  project: string;
  assignee: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Blocked';
  tags: string[];
}

interface TaskFilter {
  status: string | null;
  priority: string | null;
  assignee: string | null;
  project: string | null;
}

const TasksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<TaskFilter>({
    status: null,
    priority: null,
    assignee: null,
    project: null
  });
  const [currentView, setCurrentView] = useState<'list' | 'calendar'>('list');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Complete site preparation',
      description: 'Clear vegetation and level the ground for Highway 95 expansion',
      project: 'Highway 95 Expansion',
      assignee: 'Mike Johnson',
      dueDate: '2023-10-25',
      priority: 'High',
      status: 'In Progress',
      tags: ['Site Prep', 'Excavation']
    },
    {
      id: 2,
      title: 'Obtain environmental permits',
      description: 'Submit and follow up on environmental impact assessment',
      project: 'Highway 95 Expansion',
      assignee: 'Sarah Adams',
      dueDate: '2023-10-30',
      priority: 'High',
      status: 'Blocked',
      tags: ['Legal', 'Environmental']
    },
    {
      id: 3,
      title: 'Bridge support inspection',
      description: 'Perform structural inspection of existing bridge supports',
      project: 'Main Street Bridge Repair',
      assignee: 'David Wong',
      dueDate: '2023-10-28',
      priority: 'Medium',
      status: 'Not Started',
      tags: ['Inspection', 'Structural']
    },
    {
      id: 4,
      title: 'Traffic flow analysis',
      description: 'Analyze current traffic patterns for intersection redesign',
      project: 'Downtown Intersection Upgrade',
      assignee: 'Elena Martinez',
      dueDate: '2023-10-22',
      priority: 'Medium',
      status: 'Completed',
      tags: ['Analysis', 'Traffic']
    },
    {
      id: 5,
      title: 'Order concrete supplies',
      description: 'Place order for concrete and schedule delivery',
      project: 'Riverside Road Resurfacing',
      assignee: 'Mike Johnson',
      dueDate: '2023-10-23',
      priority: 'Low',
      status: 'In Progress',
      tags: ['Materials', 'Procurement']
    }
  ];

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filters.status || task.status === filters.status;
    const matchesPriority = !filters.priority || task.priority === filters.priority;
    const matchesAssignee = !filters.assignee || task.assignee === filters.assignee;
    const matchesProject = !filters.project || task.project === filters.project;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee && matchesProject;
  });

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'High').length;
  const dueSoonTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  }).length;

  // Unique values for filters
  const projects = Array.from(new Set(tasks.map(task => task.project)));

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: null,
      priority: null,
      assignee: null,
      project: null
    });
    setSearchTerm('');
  };

  // Calendar navigation
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks Management</h1>
          <p className="text-sm text-sky-300/80 mt-1">
            Track and manage construction project tasks
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-lg flex items-center ${
              currentView === 'list' ? 'bg-primary-600 text-white' : 'bg-sky-300/20 text-sky-300'
            }`}
            onClick={() => setCurrentView('list')}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            List View
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-lg flex items-center ${
              currentView === 'calendar' ? 'bg-primary-600 text-white' : 'bg-sky-300/20 text-sky-300'
            }`}
            onClick={() => setCurrentView('calendar')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card variant="elevated">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-sky-300/80">Total Tasks</h3>
              <p className="text-2xl font-bold text-white">{totalTasks}</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-sky-300/20 text-sky-300">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-sky-300/80">Completed</h3>
              <p className="text-2xl font-bold text-white">{completedTasks}</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-success-900/20 text-success-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-sky-300/80">High Priority</h3>
              <p className="text-2xl font-bold text-white">{highPriorityTasks}</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-danger-900/20 text-danger-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-sky-300/80">Due Soon</h3>
              <p className="text-2xl font-bold text-white">{dueSoonTasks}</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-warning-900/20 text-warning-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Card variant="default">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-sky-300/60" />
            </div>
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 placeholder-sky-300/60 text-white focus:ring-sky-500 focus:border-sky-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              className="py-2 px-3 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
              value={filters.status || ''}
              onChange={(e) => setFilters({...filters, status: e.target.value || null})}
            >
              <option value="">All Status</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Blocked">Blocked</option>
            </select>
            
            <select
              className="py-2 px-3 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
              value={filters.priority || ''}
              onChange={(e) => setFilters({...filters, priority: e.target.value || null})}
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            
            <select
              className="py-2 px-3 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
              value={filters.project || ''}
              onChange={(e) => setFilters({...filters, project: e.target.value || null})}
            >
              <option value="">All Projects</option>
              {projects.map((project, index) => (
                <option key={index} value={project}>{project}</option>
              ))}
            </select>
            
            <button
              onClick={resetFilters}
              disabled={!searchTerm && !filters.status && !filters.priority && !filters.project && !filters.assignee}
              className={`py-2 px-3 text-sm border rounded-lg ${
                (!searchTerm && !filters.status && !filters.priority && !filters.project && !filters.assignee)
                  ? 'border-sky-800/30 text-sky-300/50 cursor-not-allowed'
                  : 'border-sky-800/50 text-sky-300 hover:bg-sky-300/10'
              }`}
            >
              Reset
            </button>
          </div>
        </div>

        {currentView === 'list' ? (
          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <div key={task.id} className="p-4 border rounded-lg border-sky-800/30 hover:bg-sky-950/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-start">
                        <div className={`mt-1 w-4 h-4 rounded-full flex-shrink-0 ${
                          task.status === 'Completed' ? 'bg-success-500' :
                          task.status === 'In Progress' ? 'bg-warning-500' :
                          task.status === 'Blocked' ? 'bg-danger-500' :
                          'bg-sky-500'
                        }`}></div>
                        <div className="ml-3">
                          <h3 className="font-medium text-white">{task.title}</h3>
                          <p className="text-sm text-sky-300/80 mt-1">{task.description}</p>
                        </div>
                      </div>
                      
                      <div className="ml-7 mt-3 flex flex-wrap gap-2">
                        {task.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 text-xs bg-sky-300/10 text-sky-300 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:items-end gap-2 ml-7 sm:ml-0">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === 'High' ? 'bg-danger-900/20 text-danger-400' :
                        task.priority === 'Medium' ? 'bg-warning-900/20 text-warning-400' :
                        'bg-sky-900/20 text-sky-400'
                      }`}>
                        {task.priority} Priority
                      </span>
                      
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.status === 'Completed' ? 'bg-success-900/20 text-success-400' :
                        task.status === 'In Progress' ? 'bg-warning-900/20 text-warning-400' :
                        task.status === 'Blocked' ? 'bg-danger-900/20 text-danger-400' :
                        'bg-sky-900/20 text-sky-400'
                      }`}>
                        {task.status}
                      </span>
                      
                      <div className="flex items-center text-xs text-sky-300/60 mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                      
                      <div className="flex items-center text-xs text-sky-300/60 mt-1">
                        <Users className="w-3 h-3 mr-1" />
                        {task.assignee}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <XCircle className="w-16 h-16 mx-auto text-sky-300/30 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No tasks found</h3>
                <p className="text-sky-300/60 mb-4">
                  {searchTerm || filters.status || filters.priority || filters.project || filters.assignee ? 
                    'Try adjusting your search or filters.' : 
                    'No tasks have been created yet.'
                  }
                </p>
                {(searchTerm || filters.status || filters.priority || filters.project || filters.assignee) && (
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-sky-300/20 text-sky-300 rounded-lg hover:bg-sky-300/30 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Calendar View */}
            <div className="mb-4 flex items-center justify-between">
              <button 
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-sky-300/10 text-sky-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-medium text-white">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <button 
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-sky-300/10 text-sky-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                <div key={i} className="text-center text-xs font-medium text-sky-300/80 py-2">
                  {day}
                </div>
              ))}
              
              {/* Calendar grid - simplified representation */}
              {Array.from({ length: 35 }).map((_, i) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()) + 1);
                const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                const isToday = new Date().toDateString() === date.toDateString();
                
                // Find tasks due on this date
                const dayTasks = tasks.filter(task => new Date(task.dueDate).toDateString() === date.toDateString());
                
                return (
                  <div 
                    key={i} 
                    className={`min-h-[80px] border rounded-md p-1 ${
                      isCurrentMonth 
                        ? (isToday 
                            ? 'bg-sky-300/10 border-sky-300' 
                            : 'bg-sky-950/30 border-sky-800/30') 
                        : 'bg-sky-950/10 border-sky-800/20 opacity-40'
                    }`}
                  >
                    <div className="text-right text-xs font-medium mb-1">
                      {date.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayTasks.map(task => (
                        <div 
                          key={task.id} 
                          className={`text-xs p-1 rounded truncate ${
                            task.priority === 'High' ? 'bg-danger-900/20 text-danger-400' :
                            task.priority === 'Medium' ? 'bg-warning-900/20 text-warning-400' :
                            'bg-sky-900/20 text-sky-400'
                          }`}
                          title={task.title}
                        >
                          {task.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Add task button */}
        <div className="mt-6 flex justify-end">
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add New Task
          </button>
        </div>
      </Card>
    </div>
  );
};

export default TasksPage;
