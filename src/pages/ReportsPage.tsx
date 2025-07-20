import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { 
  BarChart3, 
  FileText, 
  Download, 
  Calendar, 
  PieChart,
  TrendingUp,
  Clock,
  Share2,
  ArrowRight,
  FileSpreadsheet,
  // Replace FilePdf with FileText since FilePdf doesn't exist in lucide-react
  // FilePdf,
  Sliders,
  RefreshCw,
  Search,
  Plus
} from 'lucide-react';

// TypeScript interfaces
interface Report {
  id: number;
  name: string;
  type: 'Financial' | 'Progress' | 'Safety' | 'Environmental' | 'Quality';
  project: string;
  generatedBy: string;
  generatedDate: string;
  size: string;
  format: 'PDF' | 'Excel' | 'CSV';
  description?: string;
}

interface ReportFilter {
  type: string | null;
  project: string | null;
  dateRange: string | null;
}

interface ReportTemplate {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  lastGenerated?: string;
}

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'available' | 'generate'>('available');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ReportFilter>({
    type: null,
    project: null,
    dateRange: null
  });
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  // Mock data
  const reports: Report[] = [
    {
      id: 1,
      name: 'Highway 95 Monthly Progress Report - October',
      type: 'Progress',
      project: 'Highway 95 Expansion',
      generatedBy: 'System',
      generatedDate: '2023-10-20',
      size: '2.3 MB',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Bridge Repair Financial Summary Q3',
      type: 'Financial',
      project: 'Main Street Bridge Repair',
      generatedBy: 'Robert Chen',
      generatedDate: '2023-10-15',
      size: '1.8 MB',
      format: 'Excel'
    },
    {
      id: 3,
      name: 'Downtown Intersection Safety Compliance',
      type: 'Safety',
      project: 'Downtown Intersection Upgrade',
      generatedBy: 'Sarah Adams',
      generatedDate: '2023-10-18',
      size: '3.5 MB',
      format: 'PDF'
    },
    {
      id: 4,
      name: 'Riverside Road Environmental Impact Analysis',
      type: 'Environmental',
      project: 'Riverside Road Resurfacing',
      generatedBy: 'Elena Martinez',
      generatedDate: '2023-10-12',
      size: '5.2 MB',
      format: 'PDF'
    },
    {
      id: 5,
      name: 'Highway 95 Materials Quality Assessment',
      type: 'Quality',
      project: 'Highway 95 Expansion',
      generatedBy: 'David Wong',
      generatedDate: '2023-10-08',
      size: '1.4 MB',
      format: 'PDF'
    },
    {
      id: 6,
      name: 'Project Portfolio Financial Overview',
      type: 'Financial',
      project: 'All Projects',
      generatedBy: 'System',
      generatedDate: '2023-10-01',
      size: '3.7 MB',
      format: 'Excel'
    }
  ];

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filters.type || report.type === filters.type;
    const matchesProject = !filters.project || report.project === filters.project;
    // For simplicity, we're not implementing actual date range filtering
    
    return matchesSearch && matchesType && matchesProject;
  });

  // Unique values for filters
  const projects = Array.from(new Set(reports.map(report => report.project)));
  const reportTypes = Array.from(new Set(reports.map(report => report.type)));

  // Reset filters
  const resetFilters = () => {
    setFilters({
      type: null,
      project: null,
      dateRange: null
    });
    setSearchTerm('');
  };

  // Report templates for the Generate tab
  const reportTemplates: ReportTemplate[] = [
    { id: 1, name: 'Project Progress Report', description: 'Overview of project milestones, tasks, and timeline status', icon: TrendingUp, lastGenerated: '2023-10-15' },
    { id: 2, name: 'Financial Summary', description: 'Budget vs. actual spending, cost forecasts, and financial metrics', icon: BarChart3, lastGenerated: '2023-10-10' },
    { id: 3, name: 'Safety Compliance Report', description: 'Safety incidents, compliance status, and risk assessments', icon: FileText },
    { id: 4, name: 'Quality Control Report', description: 'Material testing results, quality metrics, and inspection outcomes', icon: PieChart, lastGenerated: '2023-09-28' },
    { id: 5, name: 'Resource Utilization Report', description: 'Equipment and labor utilization, efficiency metrics', icon: Clock }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm text-sky-300/80 mt-1">
            View and generate reports for your construction projects
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <button
            className={`px-4 py-2 text-sm rounded-lg ${
              activeTab === 'available' ? 'bg-primary-600 text-white' : 'bg-sky-300/20 text-sky-300'
            }`}
            onClick={() => setActiveTab('available')}
          >
            Available Reports
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-lg ${
              activeTab === 'generate' ? 'bg-primary-600 text-white' : 'bg-sky-300/20 text-sky-300'
            }`}
            onClick={() => setActiveTab('generate')}
          >
            Generate Report
          </button>
        </div>
      </div>

      {activeTab === 'available' ? (
        <>
          {/* Stats summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card variant="elevated">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-sky-300/80">Total Reports</h3>
                  <p className="text-2xl font-bold text-white">{reports.length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-sky-300/20 text-sky-300">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
            </Card>
            
            <Card variant="elevated">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-sky-300/80">Financial Reports</h3>
                  <p className="text-2xl font-bold text-white">{reports.filter(r => r.type === 'Financial').length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-900/20 text-primary-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
              </div>
            </Card>
            
            <Card variant="elevated">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-sky-300/80">Progress Reports</h3>
                  <p className="text-2xl font-bold text-white">{reports.filter(r => r.type === 'Progress').length}</p>
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-success-900/20 text-success-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
            </Card>
            
            <Card variant="elevated">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-sky-300/80">Generated This Month</h3>
                  <p className="text-2xl font-bold text-white">
                    {reports.filter(r => {
                      const date = new Date(r.generatedDate);
                      const now = new Date();
                      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-sky-300/20 text-sky-300">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
            </Card>
          </div>

          <Card variant="default">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-sky-300/60" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search reports by name or project..." 
                  className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 placeholder-sky-300/60 text-white focus:ring-sky-500 focus:border-sky-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search reports"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select
                  className="py-2 px-3 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                  value={filters.type || ''}
                  onChange={(e) => setFilters({...filters, type: e.target.value || null})}
                  aria-label="Filter by report type"
                >
                  <option value="">All Types</option>
                  {reportTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                
                <select
                  className="py-2 px-3 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                  value={filters.project || ''}
                  onChange={(e) => setFilters({...filters, project: e.target.value || null})}
                  aria-label="Filter by project"
                >
                  <option value="">All Projects</option>
                  {projects.map((project, index) => (
                    <option key={index} value={project}>{project}</option>
                  ))}
                </select>
                
                <select
                  className="py-2 px-3 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                  value={filters.dateRange || ''}
                  onChange={(e) => setFilters({...filters, dateRange: e.target.value || null})}
                  aria-label="Filter by date range"
                >
                  <option value="">All Dates</option>
                  <option value="last7">Last 7 days</option>
                  <option value="last30">Last 30 days</option>
                  <option value="last90">Last 90 days</option>
                </select>
                
                <button
                  onClick={resetFilters}
                  disabled={!searchTerm && !filters.type && !filters.project && !filters.dateRange}
                  className={`py-2 px-3 text-sm border rounded-lg ${
                    (!searchTerm && !filters.type && !filters.project && !filters.dateRange)
                      ? 'border-sky-800/30 text-sky-300/50 cursor-not-allowed'
                      : 'border-sky-800/50 text-sky-300 hover:bg-sky-300/10'
                  }`}
                  aria-label="Reset filters"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Reports List */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-sky-950/50 text-sky-300">
                  <tr>
                    <th className="px-6 py-3">Report Name</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Project</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Size</th>
                    <th className="px-6 py-3">Format</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length > 0 ? (
                    filteredReports.map(report => (
                      <tr key={report.id} className="border-b border-sky-800/30 hover:bg-sky-950/50">
                        <td className="px-6 py-4 font-medium text-white">{report.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            report.type === 'Financial' ? 'bg-primary-900/20 text-primary-400' :
                            report.type === 'Progress' ? 'bg-success-900/20 text-success-400' :
                            report.type === 'Safety' ? 'bg-danger-900/20 text-danger-400' :
                            report.type === 'Environmental' ? 'bg-green-900/20 text-green-400' :
                            'bg-warning-900/20 text-warning-400'
                          }`}>
                            {report.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">{report.project}</td>
                        <td className="px-6 py-4">{new Date(report.generatedDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{report.size}</td>
                        <td className="px-6 py-4">
                          {report.format === 'PDF' ? (
                            <span className="flex items-center text-red-400">
                              <FileText className="w-4 h-4 mr-1" /> PDF
                            </span>
                          ) : report.format === 'Excel' ? (
                            <span className="flex items-center text-green-400">
                              <FileSpreadsheet className="w-4 h-4 mr-1" /> Excel
                            </span>
                          ) : (
                            <span className="flex items-center text-blue-400">
                              <FileText className="w-4 h-4 mr-1" /> CSV
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button 
                              className="p-1.5 rounded-lg hover:bg-sky-300/10 text-sky-300" 
                              title="View report"
                              aria-label="View report"
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-1.5 rounded-lg hover:bg-sky-300/10 text-sky-300" 
                              title="Download report"
                              aria-label="Download report"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-1.5 rounded-lg hover:bg-sky-300/10 text-sky-300" 
                              title="Share report"
                              aria-label="Share report"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <FileText className="w-12 h-12 mx-auto text-sky-300/30 mb-3" />
                        <p className="text-lg font-medium text-white mb-1">No reports found</p>
                        <p className="text-sky-300/60 text-sm">
                          {searchTerm || filters.type || filters.project || filters.dateRange ? 
                            'Try adjusting your filters to find what you\'re looking for.' : 
                            'No reports have been generated yet.'
                          }
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredReports.length > 0 && (
              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-sky-300/60">
                  Showing {filteredReports.length} of {reports.length} reports
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
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Templates */}
          <div className="lg:col-span-1">
            <Card title="Report Templates" icon={FileText} variant="default">
              <div className="space-y-3">
                {reportTemplates.map(template => (
                  <div 
                    key={template.id}
                    className={`p-3 rounded-lg border border-sky-800/30 hover:bg-sky-950/50 cursor-pointer transition-colors ${
                      selectedTemplate === template.id ? 'bg-sky-950/50 border-sky-300/30' : ''
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-sky-300/20 text-sky-300 flex-shrink-0">
                        <template.icon className="w-4 h-4" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-white">{template.name}</h3>
                        <p className="text-xs text-sky-300/80 mt-1">
                          {template.description}
                        </p>
                        {template.lastGenerated && (
                          <div className="flex items-center text-xs text-sky-300/60 mt-2">
                            <Clock className="w-3 h-3 mr-1" />
                            Last generated: {new Date(template.lastGenerated).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-sky-300/20 text-sky-300 rounded-lg hover:bg-sky-300/30 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Custom Template
                </button>
              </div>
            </Card>

            <Card title="Scheduled Reports" icon={RefreshCw} variant="default" className="mt-6">
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-sky-800/30 bg-sky-950/30">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">Weekly Progress Report</h3>
                    <span className="px-2 py-0.5 text-xs bg-success-900/20 text-success-400 rounded-full">Active</span>
                  </div>
                  <p className="text-xs text-sky-300/80 mt-1">
                    Generated every Monday at 8:00 AM
                  </p>
                  <div className="flex items-center text-xs text-sky-300/60 mt-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    Next run: 10/30/2023
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-sky-800/30 bg-sky-950/30">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">Monthly Financial Summary</h3>
                    <span className="px-2 py-0.5 text-xs bg-success-900/20 text-success-400 rounded-full">Active</span>
                  </div>
                  <p className="text-xs text-sky-300/80 mt-1">
                    Generated on the 1st of each month
                  </p>
                  <div className="flex items-center text-xs text-sky-300/60 mt-2">
                    <Calendar className="w-3 h-3 mr-1" />
                    Next run: 11/01/2023
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-sky-300/20 text-sky-300 rounded-lg hover:bg-sky-300/30 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule New Report
                </button>
              </div>
            </Card>
          </div>

          {/* Report Generation Form */}
          <div className="lg:col-span-2">
            <Card 
              title={selectedTemplate ? reportTemplates.find(t => t.id === selectedTemplate)?.name || "Generate Report" : "Generate Report"} 
              icon={FileText} 
              variant="default"
            >
              {selectedTemplate ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-sky-300 mb-1">
                      Report Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                      defaultValue={`${reportTemplates.find(t => t.id === selectedTemplate)?.name} - ${new Date().toLocaleDateString()}`}
                      aria-label="Report name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-sky-300 mb-1">
                      Project
                    </label>
                    <select className="w-full p-2 border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500">
                      <option value="">Select a project...</option>
                      <option value="all">All Projects</option>
                      {projects.map((project, index) => (
                        <option key={index} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-sky-300 mb-1">
                        Start Date
                      </label>
                      <input 
                        type="date" 
                        className="w-full p-2 border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-sky-300 mb-1">
                        End Date
                      </label>
                      <input 
                        type="date" 
                        className="w-full p-2 border rounded-lg bg-sky-950/30 border-sky-800/50 text-white focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-sky-300 mb-1">
                      Format
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input type="radio" name="format" value="pdf" defaultChecked className="text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-white">PDF</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input type="radio" name="format" value="excel" className="text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-white">Excel</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input type="radio" name="format" value="csv" className="text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-white">CSV</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-sky-300">
                        Data Components
                      </label>
                      <button className="text-xs flex items-center text-sky-300 hover:text-sky-400">
                        <Sliders className="w-3 h-3 mr-1" />
                        Customize
                      </button>
                    </div>
                    <div className="space-y-2">
                      <label className="inline-flex items-center w-full p-2 border border-sky-800/30 rounded-lg bg-sky-950/20">
                        <input type="checkbox" defaultChecked className="text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-white">Project Overview</span>
                      </label>
                      <label className="inline-flex items-center w-full p-2 border border-sky-800/30 rounded-lg bg-sky-950/20">
                        <input type="checkbox" defaultChecked className="text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-white">Timeline Analysis</span>
                      </label>
                      <label className="inline-flex items-center w-full p-2 border border-sky-800/30 rounded-lg bg-sky-950/20">
                        <input type="checkbox" defaultChecked className="text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-white">Resource Allocation</span>
                      </label>
                      <label className="inline-flex items-center w-full p-2 border border-sky-800/30 rounded-lg bg-sky-950/20">
                        <input type="checkbox" defaultChecked className="text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-white">Risk Assessment</span>
                      </label>
                      <label className="inline-flex items-center w-full p-2 border border-sky-800/30 rounded-lg bg-sky-950/20">
                        <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-white">Comparative Analysis</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-sky-300 mb-1">
                      Additional Options
                    </label>
                    <div className="space-y-2">
                      <label className="inline-flex items-center w-full">
                        <input type="checkbox" defaultChecked className="text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-white">Include visualizations and charts</span>
                      </label>
                      <label className="inline-flex items-center w-full">
                        <input type="checkbox" defaultChecked className="text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-white">Include detailed data tables</span>
                      </label>
                      <label className="inline-flex items-center w-full">
                        <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-white">Schedule recurring report generation</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button className="px-4 py-2 border border-sky-800/50 text-sky-300 rounded-lg hover:bg-sky-300/10 transition-colors">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Generate Report
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 mx-auto text-sky-300/30 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Select a Report Template</h3>
                  <p className="text-sky-300/60 mb-6 max-w-md mx-auto">
                    Choose a report template from the list on the left to get started with generating your report.
                  </p>
                  <div className="flex justify-center">
                    <button className="flex items-center px-4 py-2 bg-sky-300/20 text-sky-300 rounded-lg hover:bg-sky-300/30 transition-colors">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Select a Template
                    </button>
                  </div>
                </div>
              )}
            </Card>

            {/* Report Preview */}
            {selectedTemplate && (
              <Card title="Report Preview" icon={FileText} variant="default" className="mt-6">
                <div className="bg-sky-950/50 rounded-lg p-4 text-center h-64 flex items-center justify-center">
                  <div>
                    <FileText className="w-12 h-12 mx-auto text-sky-300/50 mb-3" />
                    <p className="text-white font-medium mb-2">Report Preview Available After Configuration</p>
                    <p className="text-sm text-sky-300/60">Complete the form above to generate a preview of your report</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
