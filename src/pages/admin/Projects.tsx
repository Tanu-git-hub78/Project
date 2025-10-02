import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FileText, Eye, CircleCheck as CheckCircle, Circle as XCircle, Clock, MessageSquare } from 'lucide-react';
import { submissions } from '../../data/mockData';
import { Submission } from '../../types';

const Projects: React.FC = () => {
  const [projectList, setProjectList] = useState(submissions);
  const [selectedProject, setSelectedProject] = useState<Submission | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [feedback, setFeedback] = useState('');
  const [examinerComments, setExaminerComments] = useState('');

  const handleStatusChange = (projectId: string, newStatus: 'approved' | 'rejected' | 'pending') => {
    setProjectList(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, status: newStatus, feedback: feedback, examinerComments: examinerComments }
        : project
    ));
    setSelectedProject(null);
    setFeedback('');
    setExaminerComments('');
  };

  const filteredProjects = projectList.filter(project => 
    filterStatus === 'all' || project.status === filterStatus
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const ProjectEvaluationModal = () => {
    if (!selectedProject) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedProject.title}</h3>
                <p className="text-gray-600">{selectedProject.studentName} • {selectedProject.rollNumber}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Project Details</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Category:</span> {selectedProject.category}</div>
                  <div><span className="font-medium">Degree:</span> {selectedProject.degree}</div>
                  <div><span className="font-medium">Faculty:</span> {selectedProject.facultyName}</div>
                  <div><span className="font-medium">Submitted:</span> {new Date(selectedProject.submissionDate).toLocaleDateString()}</div>
                  <div><span className="font-medium">File:</span> {selectedProject.fileName}</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Current Status</h4>
                <div className="flex items-center space-x-2 mb-4">
                  {getStatusIcon(selectedProject.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(selectedProject.status)}`}>
                    {selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{selectedProject.description}</p>
            </div>

            {selectedProject.feedback && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Previous Feedback</h4>
                <p className="text-gray-600 bg-blue-50 p-4 rounded-lg">{selectedProject.feedback}</p>
              </div>
            )}

            {selectedProject.examinerComments && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Previous Examiner Comments</h4>
                <p className="text-gray-600 bg-purple-50 p-4 rounded-lg">{selectedProject.examinerComments}</p>
              </div>
            )}

            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Evaluation</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Provide feedback for the student..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Examiner Comments (Internal)
                  </label>
                  <textarea
                    value={examinerComments}
                    onChange={(e) => setExaminerComments(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Internal comments for evaluation records..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleStatusChange(selectedProject.id, 'approved')}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedProject.id, 'rejected')}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedProject.id, 'pending')}
                    className="flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 flex items-center justify-center"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Mark Pending
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Projects & Evaluation">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects & Evaluation</h2>
          <p className="text-gray-600">Review and evaluate student project submissions.</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Projects</h3>
          <div className="text-3xl font-bold text-blue-600">{projectList.length}</div>
          <p className="text-gray-600 text-sm mt-1">All submissions</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Review</h3>
          <div className="text-3xl font-bold text-yellow-600">
            {projectList.filter(p => p.status === 'pending').length}
          </div>
          <p className="text-gray-600 text-sm mt-1">Awaiting evaluation</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Approved</h3>
          <div className="text-3xl font-bold text-green-600">
            {projectList.filter(p => p.status === 'approved').length}
          </div>
          <p className="text-gray-600 text-sm mt-1">Successfully approved</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Rejected</h3>
          <div className="text-3xl font-bold text-red-600">
            {projectList.filter(p => p.status === 'rejected').length}
          </div>
          <p className="text-gray-600 text-sm mt-1">Needs revision</p>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Degree
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">{project.title}</div>
                        <div className="text-sm text-gray-500">{project.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{project.studentName}</div>
                      <div className="text-sm text-gray-500">{project.rollNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.degree}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(project.submissionDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(project.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(project.status)}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-purple-600 hover:text-purple-900 flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Evaluate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProject && <ProjectEvaluationModal />}
    </Layout>
  );
};

export default Projects;