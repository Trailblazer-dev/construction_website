import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { FileText, Users, AlertTriangle, PenTool } from 'lucide-react';

const EngineeringModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('designs');

  // Mock design documents

  // Mock engineering issues
  const issues = [
    { id: 1, title: 'Soil stability concerns at Highway 95 north section', severity: 'High', assignedTo: 'Geotechnical Team', status: 'Open', date: '2023-10-12' },
    { id: 2, title: 'Bridge load calculations need verification', severity: 'Medium', assignedTo: 'Structural Team', status: 'In Progress', date: '2023-10-08' },
    { id: 3, title: 'Water runoff patterns require reassessment', severity: 'Medium', assignedTo: 'Environmental Team', status: 'Open', date: '2023-10-15' },
    { id: 4, title: 'Concrete mix specification update needed', severity: 'Low', assignedTo: 'Materials Team', status: 'Resolved', date: '2023-09-30' }
  ];

  // Mock team members
  const team = [
    { id: 1, name: 'Elena Martinez', role: 'Lead Engineer', specialty: 'Structural', projects: 3, availability: 'Full' },
    { id: 2, name: 'David Wong', role: 'Civil Engineer', specialty: 'Drainage', projects: 2, availability: 'Partial' },
    { id: 3, name: 'Robert Johnson', role: 'Traffic Engineer', specialty: 'Flow Optimization', projects: 1, availability: 'Full' },
    { id: 4, name: 'Sarah Adams', role: 'Geotechnical Engineer', specialty: 'Soil Analysis', projects: 2, availability: 'Unavailable' }
  ];

  // Mock data for design documents
  const designDocuments = [
    { id: 1, name: 'Highway 95 - Foundation Plans', type: 'CAD', status: 'Approved', lastModified: '2023-10-18' },
    { id: 2, name: 'Bridge Support Structure', type: 'Blueprint', status: 'Under Review', lastModified: '2023-10-15' },
    { id: 3, name: 'Drainage System Layout', type: 'Technical Drawing', status: 'Draft', lastModified: '2023-10-12' },
  ];

  // Mock data for team assignments
  // (Removed unused teamAssignments variable)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Engineering Module</h1>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Assign Team
          </Button>
          <Button variant="primary" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Upload Design
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4 border-b border-sky-800/30 mb-4">
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'designs' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('designs')}
          >
            <PenTool className="w-4 h-4 mr-2" />
            Design Documents
          </button>
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'issues' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('issues')}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Engineering Issues
          </button>
          <button 
            className={`py-2 px-4 flex items-center ${activeTab === 'team' ? 'border-b-2 border-sky-300 text-sky-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('team')}
          >
            <Users className="w-4 h-4 mr-2" />
            Team Assignments
          </button>
        </div>

        {activeTab === 'designs' && (
          <Card title="Design Documents" variant="default">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-sky-950/50 text-sky-300">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Document Name</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last Modified</th>
                    <th className="px-4 py-3 rounded-r-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {designDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b border-sky-800/30 hover:bg-sky-950/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-sky-300" />
                          <span className="text-sm font-medium text-white">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-sky-300/80">{doc.type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          doc.status === 'Approved' ? 'bg-success-900/20 text-success-400' :
                          doc.status === 'Under Review' ? 'bg-warning-900/20 text-warning-400' :
                          'bg-sky-900/20 text-sky-400'
                        }`}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-sky-300/60">{doc.lastModified}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="xs">View</Button>
                          <Button variant="primary" size="xs">Edit</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4">
              <Button variant="primary" icon={FileText}>
                Upload New Document
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'issues' && (
          <Card title="Engineering Issues" variant="default">
            <div className="space-y-4">
              {issues.map(issue => (
                <div key={issue.id} 
                  className={`p-4 border rounded-lg ${
                    issue.severity === 'High' ? 'border-red-800/30 bg-red-950/10' :
                    issue.severity === 'Medium' ? 'border-yellow-800/30 bg-yellow-950/10' :
                    'border-blue-800/30 bg-blue-950/10'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{issue.title}</h3>
                      <div className="flex items-center mt-1 text-sm">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          issue.severity === 'High' ? 'bg-red-900/40 text-red-300' :
                          issue.severity === 'Medium' ? 'bg-yellow-900/40 text-yellow-300' :
                          'bg-blue-900/40 text-blue-300'
                        }`}>
                          {issue.severity} Severity
                        </span>
                        <span className="mx-2 text-sky-300/60">•</span>
                        <span className="text-sky-300/80">Assigned to: {issue.assignedTo}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      issue.status === 'Open' ? 'bg-red-900/50 text-red-300' :
                      issue.status === 'In Progress' ? 'bg-blue-900/50 text-blue-300' :
                      'bg-green-900/50 text-green-300'
                    }`}>
                      {issue.status}
                    </span>
                  </div>
                  <div className="mt-3 text-sm text-sky-300/60">
                    Reported: {new Date(issue.date).toLocaleDateString()}
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="xs">View Details</Button>
                    {issue.status !== 'Resolved' && (
                      <>
                        <Button variant="outline" size="xs">Reassign</Button>
                        <Button variant="success" size="xs">Resolve</Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button variant="primary" size="sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report New Issue
              </Button>
            </div>
          </Card>
        )}

        {activeTab === 'team' && (
          <Card title="Engineering Team" variant="default">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {team.map(member => (
                <div key={member.id} className="p-4 border border-sky-800/30 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{member.name}</h3>
                      <p className="text-sm text-sky-300/80">{member.role}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded ${
                      member.availability === 'Full' ? 'bg-green-900/50 text-green-300' :
                      member.availability === 'Partial' ? 'bg-yellow-900/50 text-yellow-300' :
                      'bg-red-900/50 text-red-300'
                    }`}>
                      {member.availability}
                    </span>
                  </div>
                  <div className="mt-3 text-sm">
                    <div className="flex justify-between py-1 border-b border-sky-800/20">
                      <span className="text-sky-300/60">Specialty:</span>
                      <span className="text-white">{member.specialty}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-sky-300/60">Active Projects:</span>
                      <span className="text-white">{member.projects}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="w-full">Assign to Project</Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 border border-sky-800/30 rounded-lg">
              <h3 className="font-medium text-white mb-3">Team Workload Overview</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-sky-950/50 rounded-lg flex flex-col items-center">
                  <div className="text-2xl font-bold text-white mb-1">4</div>
                  <div className="text-sm text-sky-300/80 text-center">Active Team Members</div>
                </div>
                <div className="p-3 bg-sky-950/50 rounded-lg flex flex-col items-center">
                  <div className="text-2xl font-bold text-white mb-1">8</div>
                  <div className="text-sm text-sky-300/80 text-center">Total Projects</div>
                </div>
                <div className="p-3 bg-sky-950/50 rounded-lg flex flex-col items-center">
                  <div className="text-2xl font-bold text-white mb-1">75%</div>
                  <div className="text-sm text-sky-300/80 text-center">Team Utilization</div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EngineeringModule;
