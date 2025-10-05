import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FileText, Download, Save, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getSubmissionsByDepartment, updateSubmissionStatus } from '../../data/mockData';

const VivaEvaluation: React.FC = () => {
  const { user } = useAuth();
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [vivaMarks, setVivaMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [examinerComments, setExaminerComments] = useState('');

  const departmentSubmissions = getSubmissionsByDepartment(user?.department || '');
  const pendingEvaluations = departmentSubmissions.filter(s => !s.vivaMarks);

  const handleSaveEvaluation = () => {
    if (selectedSubmission && vivaMarks) {
      const marks = parseInt(vivaMarks);
      const status = marks >= 70 ? 'approved' : marks >= 50 ? 'pending' : 'rejected';
      
      updateSubmissionStatus(
        selectedSubmission.id,
        status,
        feedback,
        examinerComments,
        marks
      );
      
      alert('Evaluation saved successfully!');
      setSelectedSubmission(null);
      setVivaMarks('');
      setFeedback('');
      setExaminerComments('');
    }
  };

  const handleDownloadPDF = (fileName: string) => {
    alert(`Downloading ${fileName}...`);
  };

  return (
    <Layout title="Viva Evaluation">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Viva Evaluation</h2>
        <p className="text-gray-600">Evaluate student projects and assign viva marks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Evaluations List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Pending Evaluations ({pendingEvaluations.length})
          </h3>
          
          <div className="space-y-4">
            {pendingEvaluations.map((submission) => (
              <div
                key={submission.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedSubmission?.id === submission.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{submission.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {submission.studentName} • {submission.rollNumber}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Submitted: {new Date(submission.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadPDF(submission.fileName);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <Eye className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
            
            {pendingEvaluations.length === 0 && (
              <p className="text-gray-500 text-center py-8">No pending evaluations</p>
            )}
          </div>
        </div>

        {/* Evaluation Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Form</h3>
          
          {selectedSubmission ? (
            <div className="space-y-6">
              {/* Project Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{selectedSubmission.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{selectedSubmission.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Student: {selectedSubmission.studentName}</span>
                  <span>Roll: {selectedSubmission.rollNumber}</span>
                </div>
                <div className="mt-3 flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">{selectedSubmission.fileName}</span>
                  <button
                    onClick={() => handleDownloadPDF(selectedSubmission.fileName)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Download
                  </button>
                </div>
              </div>

              {/* Viva Marks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Viva Marks (out of 100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={vivaMarks}
                  onChange={(e) => setVivaMarks(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter marks (0-100)"
                />
              </div>

              {/* Student Feedback */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Feedback
                </label>
                <textarea
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Feedback for the student..."
                />
              </div>

              {/* Examiner Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Internal Comments
                </label>
                <textarea
                  rows={3}
                  value={examinerComments}
                  onChange={(e) => setExaminerComments(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Internal examiner comments..."
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveEvaluation}
                disabled={!vivaMarks}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Evaluation
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Select a project from the left to start evaluation</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default VivaEvaluation;