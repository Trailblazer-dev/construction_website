import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  FolderOpen, 
  Download, 
  Eye, 
  Trash2, 
  FileImage, 
  FileSpreadsheet, 
  FilePlus,
  FileX,
  Share2,
  Clock,
  ChevronDown
} from 'lucide-react';

// TypeScript interfaces for document management
interface Document {
  id: number;
  name: string;
  type: 'pdf' | 'image' | 'spreadsheet' | 'text' | 'other';
  size: string;
  project: string;
  category: string;
  uploadedBy: string;
  uploadDate: string;
  lastViewed?: string;
  status: 'Active' | 'Archived' | 'Pending Review';
}

interface DocumentCategory {
  id: number;
  name: string;
  icon: React.ComponentType<any>;
  count: number;
}

const DocumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Mock data for documents
  const documents: Document[] = [
    {
      id: 1,
      name: 'Highway 95 Design Blueprint.pdf',
      type: 'pdf',
      size: '12.4 MB',
      project: 'Highway 95 Expansion',
      category: 'Blueprints',
      uploadedBy: 'Elena Martinez',
      uploadDate: '2023-10-15',
      lastViewed: '2023-10-20',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Bridge Structural Analysis Report.pdf',
      type: 'pdf',
      size: '8.7 MB',
      project: 'Main Street Bridge Repair',
      category: 'Engineering Reports',
      uploadedBy: 'David Wong',
      uploadDate: '2023-10-12',
      lastViewed: '2023-10-19',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Downtown Intersection - Progress Photos.image',
      type: 'image',
      size: '45.2 MB',
      project: 'Downtown Intersection Upgrade',
      category: 'Site Photos',
      uploadedBy: 'Sarah Adams',
      uploadDate: '2023-10-18',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Project Budget Forecast Q4.spreadsheet',
      type: 'spreadsheet',
      size: '1.8 MB',
      project: 'Highway 95 Expansion',
      category: 'Financial',
      uploadedBy: 'Robert Chen',
      uploadDate: '2023-10-10',
      lastViewed: '2023-10-21',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Material Requirements Analysis.spreadsheet',
      type: 'spreadsheet',
      size: '2.3 MB',
      project: 'Riverside Road Resurfacing',
      category: 'Materials',
      uploadedBy: 'Elena Martinez',
      uploadDate: '2023-10-05',
      status: 'Active'
    },
    {
      id: 6,
      name: 'Safety Compliance Checklist.pdf',
      type: 'pdf',
      size: '0.9 MB',
      project: 'Downtown Intersection Upgrade',
      category: 'Safety',
      uploadedBy: 'Mike Johnson',
      uploadDate: '2023-09-28',
      status: 'Archived'
    },
    {
      id: 7,
      name: 'Environmental Impact Assessment.pdf',
      type: 'pdf',
      size: '15.1 MB',
      project: 'Highway 95 Expansion',
      category: 'Environmental',
      uploadedBy: 'Sarah Adams',
      uploadDate: '2023-10-17',
      status: 'Pending Review'
    }
  ];

  // Document categories
  const categories: DocumentCategory[] = [
    { id: 1, name: 'Blueprints', icon: FileText, count: 2 },
    { id: 2, name: 'Engineering Reports', icon: FileText, count: 1 },
    { id: 3, name: 'Site Photos', icon: FileImage, count: 1 },
    { id: 4, name: 'Financial', icon: FileSpreadsheet, count: 1 },
    { id: 5, name: 'Materials', icon: FileSpreadsheet, count: 1 },
    { id: 6, name: 'Safety', icon: FileText, count: 1 },
    { id: 7, name: 'Environmental', icon: FileText, count: 1 }
  ];

  // Project list extracted from documents
  const projects = Array.from(new Set(documents.map(doc => doc.project)));

  // Filter documents based on search, category, and project
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? doc.category === selectedCategory : true;
    const matchesProject = selectedProject ? doc.project === selectedProject : true;
    
    return matchesSearch && matchesCategory && matchesProject;
  });

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'date') {
      return sortOrder === 'asc' 
        ? new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
        : new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    } else {
      // Size sorting (converting MB to bytes for comparison)
      const aSize = parseFloat(a.size.split(' ')[0]);
      const bSize = parseFloat(b.size.split(' ')[0]);
      return sortOrder === 'asc' ? aSize - bSize : bSize - aSize;
    }
  });

  // Function to get icon for document type
  const getDocumentIcon = (type: Document['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-sky-300" />;
      case 'image':
        return <FileImage className="w-8 h-8 text-green-400" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="w-8 h-8 text-blue-400" />;
      case 'text':
        return <FileText className="w-8 h-8 text-yellow-400" />;
      default:
        return <FileText className="w-8 h-8 text-gray-400" />;
    }
  };

  // Toggle sort order
  const toggleSort = (newSortBy: 'name' | 'date' | 'size') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedProject(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Document Management</h1>
          <p className="text-sm text-sky-300/80 mt-1">
            Store, organize, and access all project documents
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card title="Categories" icon={FolderOpen} variant="default">
            <nav className="space-y-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg ${
                  !selectedCategory 
                    ? 'bg-sky-300/20 text-sky-300' 
                    : 'text-white hover:bg-sky-300/10'
                }`}
              >
                <div className="flex items-center">
                  <FolderOpen className="w-4 h-4 mr-3" />
                  <span>All Documents</span>
                </div>
                <span className="bg-sky-300/20 text-sky-300 text-xs px-2 py-0.5 rounded-full">
                  {documents.length}
                </span>
              </button>
              
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg ${
                    selectedCategory === category.name 
                      ? 'bg-sky-300/20 text-sky-300' 
                      : 'text-white hover:bg-sky-300/10'
                  }`}
                >
                  <div className="flex items-center">
                    <category.icon className="w-4 h-4 mr-3" />
                    <span>{category.name}</span>
                  </div>
                  <span className="bg-sky-300/20 text-sky-300 text-xs px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </button>
              ))}
            </nav>
          </Card>

          <Card title="Projects" icon={FolderOpen} variant="default" className="mt-6">
            <div className="space-y-1">
              <button
                onClick={() => setSelectedProject(null)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg ${
                  !selectedProject 
                    ? 'bg-sky-300/20 text-sky-300' 
                    : 'text-white hover:bg-sky-300/10'
                }`}
              >
                <span>All Projects</span>
              </button>
              
              {projects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedProject(project)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg ${
                    selectedProject === project 
                      ? 'bg-sky-300/20 text-sky-300' 
                      : 'text-white hover:bg-sky-300/10'
                  }`}
                >
                  <span>{project}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card title="Document Status" variant="default" className="mt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-white">Active</span>
                <span className="bg-success-900/20 text-success-400 text-xs px-2 py-0.5 rounded-full">
                  {documents.filter(d => d.status === 'Active').length}
                </span>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-white">Pending Review</span>
                <span className="bg-warning-900/20 text-warning-400 text-xs px-2 py-0.5 rounded-full">
                  {documents.filter(d => d.status === 'Pending Review').length}
                </span>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-white">Archived</span>
                <span className="bg-gray-900/20 text-gray-400 text-xs px-2 py-0.5 rounded-full">
                  {documents.filter(d => d.status === 'Archived').length}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <Card variant="default">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-sky-300/60" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search documents by name or uploader..." 
                  className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg bg-sky-950/30 border-sky-800/50 placeholder-sky-300/60 text-white focus:ring-sky-500 focus:border-sky-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="flex items-center px-3 py-2 text-sm bg-sky-950/50 border border-sky-800/50 rounded-lg text-sky-300 hover:bg-sky-300/10"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  <span>More Filters</span>
                </button>
                <button
                  onClick={resetFilters}
                  disabled={!searchTerm && !selectedCategory && !selectedProject}
                  className={`px-3 py-2 text-sm border rounded-lg ${
                    (!searchTerm && !selectedCategory && !selectedProject)
                      ? 'border-sky-800/30 text-sky-300/50 cursor-not-allowed'
                      : 'border-sky-800/50 text-sky-300 hover:bg-sky-300/10'
                  }`}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Sorting options */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-sky-300/80">
                {filteredDocuments.length} {filteredDocuments.length === 1 ? 'document' : 'documents'} found
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-sky-300/80">Sort by:</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => toggleSort('name')} 
                    className={`px-2 py-1 text-xs rounded flex items-center ${
                      sortBy === 'name' ? 'bg-sky-300/20 text-sky-300' : 'text-white'
                    }`}
                  >
                    Name
                    {sortBy === 'name' && (
                      <ChevronDown className={`w-3 h-3 ml-1 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  <button 
                    onClick={() => toggleSort('date')} 
                    className={`px-2 py-1 text-xs rounded flex items-center ${
                      sortBy === 'date' ? 'bg-sky-300/20 text-sky-300' : 'text-white'
                    }`}
                  >
                    Date
                    {sortBy === 'date' && (
                      <ChevronDown className={`w-3 h-3 ml-1 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  <button 
                    onClick={() => toggleSort('size')} 
                    className={`px-2 py-1 text-xs rounded flex items-center ${
                      sortBy === 'size' ? 'bg-sky-300/20 text-sky-300' : 'text-white'
                    }`}
                  >
                    Size
                    {sortBy === 'size' && (
                      <ChevronDown className={`w-3 h-3 ml-1 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Document list */}
            {sortedDocuments.length > 0 ? (
              <div className="space-y-3">
                {sortedDocuments.map(doc => (
                  <div 
                    key={doc.id} 
                    className="flex flex-col sm:flex-row sm:items-center p-4 bg-sky-950/30 border border-sky-800/30 rounded-lg hover:bg-sky-900/30 transition-colors"
                  >
                    <div className="flex items-center flex-grow">
                      <div className="mr-4 flex-shrink-0">
                        {getDocumentIcon(doc.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-white truncate">{doc.name}</h3>
                        <div className="flex flex-wrap items-center mt-1 text-xs text-sky-300/60">
                          <span className="mr-3">
                            Project: <span className="text-sky-300">{doc.project}</span>
                          </span>
                          <span className="mr-3">
                            Category: <span className="text-sky-300">{doc.category}</span>
                          </span>
                          <span className="mr-3">
                            Size: <span className="text-sky-300">{doc.size}</span>
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()} by {doc.uploadedBy}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 sm:mt-0 sm:ml-4">
                      <span className={`text-xs px-2 py-1 rounded-full mr-3 ${
                        doc.status === 'Active' ? 'bg-success-900/20 text-success-400' :
                        doc.status === 'Pending Review' ? 'bg-warning-900/20 text-warning-400' :
                        'bg-gray-900/20 text-gray-400'
                      }`}>
                        {doc.status}
                      </span>
                      <div className="flex space-x-1">
                        <button className="p-1.5 rounded-lg hover:bg-sky-300/10 text-sky-300" title="View document">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-sky-300/10 text-sky-300" title="Download document">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-sky-300/10 text-sky-300" title="Share document">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-danger-300/10 text-danger-400" title="Delete document">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileX className="w-16 h-16 mx-auto text-sky-300/30 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No documents found</h3>
                <p className="text-sky-300/60 mb-4">
                  {searchTerm || selectedCategory || selectedProject ? 
                    'Try adjusting your search or filters to find what you\'re looking for.' : 
                    'Upload your first document to get started.'
                  }
                </p>
                {(searchTerm || selectedCategory || selectedProject) && (
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-sky-300/20 text-sky-300 rounded-lg hover:bg-sky-300/30 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
                {(!searchTerm && !selectedCategory && !selectedProject) && (
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center mx-auto"
                  >
                    <FilePlus className="w-4 h-4 mr-2" />
                    Upload Document
                  </button>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Upload tips card */}
      <Card 
        title="Document Management Tips" 
        icon={FileText}
        variant="default" 
        className="mt-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-sky-950/30 rounded-lg">
            <h3 className="font-medium text-white mb-2">Proper Naming Conventions</h3>
            <p className="text-sm text-sky-300/80">
              Use consistent naming patterns like "ProjectName_DocumentType_Date" to make documents easily searchable.
            </p>
          </div>
          <div className="p-4 bg-sky-950/30 rounded-lg">
            <h3 className="font-medium text-white mb-2">Keep Versions Organized</h3>
            <p className="text-sm text-sky-300/80">
              When updating documents, maintain version history by including version numbers in filenames.
            </p>
          </div>
          <div className="p-4 bg-sky-950/30 rounded-lg">
            <h3 className="font-medium text-white mb-2">Regular Document Reviews</h3>
            <p className="text-sm text-sky-300/80">
              Schedule periodic reviews of critical documents to ensure they remain current and relevant.
            </p>
          </div>
        </div>
      </Card>

      {/* Upload Modal (Simplified - would need actual implementation) */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-sky-950 border border-sky-800/50 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Upload Document</h2>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-sky-300/80 hover:text-sky-300"
              >
                <FileX className="w-5 h-5" />
              </button>
            </div>
            <div className="border-2 border-dashed border-sky-800/30 rounded-lg p-8 text-center mb-4">
              <Upload className="w-12 h-12 mx-auto text-sky-300/50 mb-3" />
              <p className="text-white mb-2">Drag and drop your files here</p>
              <p className="text-sm text-sky-300/60 mb-4">or</p>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Browse Files
              </button>
              <p className="text-xs text-sky-300/60 mt-4">
                Supported formats: PDF, JPG, PNG, XLSX, DOCX, TXT (Max size: 50MB)
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sky-300 mb-1">
                  Project
                </label>
                <select className="w-full p-2 border rounded-lg bg-sky-950/30 border-sky-800/50 text-white">
                  <option value="">Select a project...</option>
                  {projects.map((project, index) => (
                    <option key={index} value={project}>{project}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-sky-300 mb-1">
                  Document Category
                </label>
                <select className="w-full p-2 border rounded-lg bg-sky-950/30 border-sky-800/50 text-white">
                  <option value="">Select a category...</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-sky-300 mb-1">
                  Description (Optional)
                </label>
                <textarea 
                  rows={3}
                  className="w-full p-2 border rounded-lg bg-sky-950/30 border-sky-800/50 text-white"
                  placeholder="Add a brief description of this document..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 border border-sky-800/50 text-sky-300 rounded-lg hover:bg-sky-300/10 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Upload Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
