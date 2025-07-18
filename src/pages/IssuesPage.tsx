import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Clock, 
  Users, 
  CheckCircle2,
  XCircle,
  Plus,
  MessageCircle,
  Camera,
  Tag
} from 'lucide-react';

// TypeScript interfaces
interface Issue {
  id: number;
  title: string;
  description: string;
  project: string;
  reportedBy: string;
  assignedTo: string;
  reportedDate: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  type: 'Safety' | 'Quality' | 'Environmental' | 'Technical' | 'Other';
  comments: number;
  attachments: number;
}

interface IssueFilter {
  status: string | null;
  severity: string | null;
  type: string | null;
  project: string | null;
}

const IssuesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<IssueFilter>({
    status: null,
    severity: null,
    type: null,
    project: null
  });

  // Mock data
  const issues: Issue[] = [
    {
      id: 1,
      title: 'Material shortage affecting south section',
      description: 'We are experiencing a shortage of reinforced concrete for the south section of the highway expansion.',
      project: 'Highway 95 Expansion',
      reportedBy: 'Elena Martinez',
      assignedTo: 'Robert Chen',
      reportedDate: '2023-10-18',
      severity: 'High',
      status: 'In Progress',
      type: 'Technical',
      comments: 4,
      attachments: 2
    },
    {
      id: 2,
      title: 'Unexpected soil condition discovered',
      description: 'Soil samples show higher clay content than expected, which may affect foundation stability.',
      project: 'Main Street Bridge Repair',
      reportedBy: 'David Wong',
      assignedTo: 'Sarah Adams',
      reportedDate: '2023-10-19',
      severity: 'Medium',
      status: 'Open',
      type: 'Technical',
      comments: 2,
      attachments: 3
    },
    {
      id: 3,
      title: 'Safety compliance issue at site entrance',
      description: 'The temporary entrance to the construction site does not meet safety regulations for heavy vehicle access.',
      project: 'Downtown Intersection Upgrade',
      reportedBy: 'Sarah Adams',
      assignedTo: 'Mike Johnson',
      reportedDate: '2023-10-20',
      severity: 'High',
      status: 'Open',
      type: 'Safety',
      comments: 5,
      attachments: 1
    },
    {
      id: 4,
      title: 'Drainage plan needs revision due to recent rainfall data',
      description: 'Recent rainfall patterns suggest our current drainage design may be inadequate for peak flow conditions.',
      project: 'Riverside Road Resurfacing',
      reportedBy: 'Robert Chen',
      assignedTo: 'Elena Martinez',
      reportedDate: '2023-10-15',
      severity: 'Medium',
      status: 'In Progress',
      type: 'Environmental',
      comments: 3,
      attachments: 2
    },
    {
      id: 5,
      title: 'Concrete quality below specifications',
      description: 'Recent test results indicate that concrete batch #47 does not meet strength requirements.',
      project: 'Main Street Bridge Repair',
      reportedBy: 'Mike Johnson',
      assignedTo: 'David Wong',
      reportedDate: '2023-10-12',
      severity: 'High',
      status: 'Resolved',
      type: 'Quality',
      comments: 8,
      attachments: 4
    }
  ];

  // Filter issues
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filters.status || issue.status === filters.status;
    const matchesSeverity = !filters.severity || issue.severity === filters.severity;
    const matchesType = !filters.type || issue.type === filters.type;
    const matchesProject = !filters.project || issue.project === filters.project;
    
    return matchesSearch && matchesStatus && matchesSeverity && matchesType && matchesProject;
  });

  // Stats
  const openIssues = issues.filter(issue => issue.status === 'Open').length;
  const highSeverityIssues = issues.filter(issue => issue.severity === 'High').length;
  const resolvedIssues = issues.filter(issue => issue.status === 'Resolved' || issue.status === 'Closed').length;
  const safetyIssues = issues.filter(issue => issue.type === 'Safety').length;

  // Unique values for filters
  const projects = Array.from(new Set(issues.map(issue => issue.project)));
  const issueTypes = Array.from(new Set(issues.map(issue => issue.type)));

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: null,
      severity: null,
      type: null,
      project: null
    });
    setSearchTerm('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Issues Tracking</h1>
          <p className="text-sm text-sky-300/80 mt-1">
            Monitor and resolve project issues and incidents
          </p>
        </div>
        <button
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Report Issue
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card variant="elevated">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-sky-300/80">Open Issues</h3>
              <p className="text-2xl font-bold text-white">{openIssues}</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-danger-900/20 text-danger-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-sky-300/80">High Severity</h3>
              <p className="text-2xl font-bold text-white">{highSeverityIssues}</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-warning-900/20 text-warning-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-sky-300/80">Resolved</h3>
              <p className="text-2xl font-bold text-white">{resolvedIssues}</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-success-900/20 text-success-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-sky-300/80">Safety Issues</h3>
              <p className="text-2xl font-bold text-white">{safetyIssues}</p>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-sky-300/20 text-sky-300">
              <AlertTriangle className="w-5 h-5" />
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
              placeholder="Search issues..." 
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
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
            
            <select
              className="py-2 px-3 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
              value={filters.severity || ''}
              onChange={(e) => setFilters({...filters, severity: e.target.value || null})}
            >
              <option value="">All Severity</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            
            <select
              className="py-2 px-3 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
              value={filters.type || ''}
              onChange={(e) => setFilters({...filters, type: e.target.value || null})}
            >
              <option value="">All Types</option>
              {issueTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
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
              disabled={!searchTerm && !filters.status && !filters.severity && !filters.type && !filters.project}
              className={`py-2 px-3 text-sm border rounded-lg ${
                (!searchTerm && !filters.status && !filters.severity && !filters.type && !filters.project)
                  ? 'border-sky-800/30 text-sky-300/50 cursor-not-allowed'
                  : 'border-sky-800/50 text-sky-300 hover:bg-sky-300/10'
              }`}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Issues List */}
        {filteredIssues.length > 0 ? (
          <div className="space-y-4">
            {filteredIssues.map(issue => (
              <div 
                key={issue.id} 
                className={`p-4 rounded-lg border ${
                  issue.severity === 'High' ? 'border-danger-800/30 bg-danger-950/10' :
                  issue.severity === 'Medium' ? 'border-warning-800/30 bg-warning-950/10' :
                  'border-sky-800/30 bg-sky-950/10'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-start">
                      <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        issue.type === 'Safety' ? 'bg-danger-900/30 text-danger-400' :
                        issue.type === 'Quality' ? 'bg-warning-900/30 text-warning-400' :
                        issue.type === 'Environmental' ? 'bg-green-900/30 text-green-400' :
                        'bg-sky-900/30 text-sky-400'
                      }`}>
                        <AlertTriangle className="w-3 h-3" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-white">{issue.title}</h3>
                        <p className="text-sm text-sky-300/80 mt-1">{issue.description}</p>
                        
                        <div className="flex flex-wrap items-center mt-3 gap-3">
                          <div className="flex items-center text-xs text-sky-300/60">
                            <Tag className="w-3 h-3 mr-1" />
                            {issue.type}
                          </div>
                          <div className="flex items-center text-xs text-sky-300/60">
                            <Clock className="w-3 h-3 mr-1" />
                            Reported: {new Date(issue.reportedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-xs text-sky-300/60">
                            <Users className="w-3 h-3 mr-1" />
                            Assigned to: {issue.assignedTo}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:items-end gap-2 ml-8 sm:ml-0 mt-3 sm:mt-0">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        issue.severity === 'High' ? 'bg-danger-900/20 text-danger-400' :
                        issue.severity === 'Medium' ? 'bg-warning-900/20 text-warning-400' :
                        'bg-sky-900/20 text-sky-400'
                      }`}>
                        {issue.severity} Severity
                      </span>
                      
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        issue.status === 'Open' ? 'bg-danger-900/20 text-danger-400' :
                        issue.status === 'In Progress' ? 'bg-warning-900/20 text-warning-400' :
                        issue.status === 'Resolved' ? 'bg-success-900/20 text-success-400' :
                        'bg-sky-900/20 text-sky-400'
                      }`}>
                        {issue.status}
                      </span>
                    </div>
                    
                    <div className="text-xs text-sky-300/60">
                      Project: {issue.project}
                    </div>
                    
                    <div className="flex items-center mt-2 gap-3">
                      <div className="flex items-center text-xs text-sky-300/80">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {issue.comments}
                      </div>
                      <div className="flex items-center text-xs text-sky-300/80">
                        <Camera className="w-3 h-3 mr-1" />
                        {issue.attachments}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="px-3 py-1 text-xs bg-sky-300/20 text-sky-300 rounded-lg hover:bg-sky-300/30 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <XCircle className="w-16 h-16 mx-auto text-sky-300/30 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No issues found</h3>
            <p className="text-sky-300/60 mb-4">
              {searchTerm || filters.status || filters.severity || filters.type || filters.project ? 
                'Try adjusting your search or filters to find what you\'re looking for.' : 
                'No issues have been reported yet.'
              }
            </p>
            {(searchTerm || filters.status || filters.severity || filters.type || filters.project) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-sky-300/20 text-sky-300 rounded-lg hover:bg-sky-300/30 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {filteredIssues.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-sky-300/60">
              Showing {filteredIssues.length} of {issues.length} issues
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm border rounded-lg border-sky-800/50 text-sky-300 hover:bg-sky-300/10 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 text-sm border rounded-lg border-sky-800/50 text-sky-300 hover:bg-sky-300/10 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default IssuesPage;
