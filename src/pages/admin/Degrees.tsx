import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { GraduationCap, Users, Eye, Search, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';
import { degrees, generateStudentsForDegree, getStudentSubmissionStatus } from '../../data/mockData';

const Degrees: React.FC = () => {
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDegreeClick = (degreeId: string) => {
    setSelectedDegree(selectedDegree === degreeId ? null : degreeId);
    setSelectedStudent(null);
  };

  const getStudentsForDegree = (degreeName: string) => {
    return generateStudentsForDegree(degreeName, 50);
  };

  const getStudentSubmissionData = (studentId: string) => {
    return getStudentSubmissionStatus(studentId);
  };

  const getSubmissionStats = (studentId: string) => {
    const submissionData = getStudentSubmissionData(studentId);
    if (!submissionData) return { submitted: 0, pending: 0, total: 0 };
    
    const submissions = Object.values(submissionData.topicSubmissions);
    const submitted = submissions.filter(s => s.status === 'Submitted').length;
    const total = submissions.length;
    const pending = total - submitted;
    
    return { submitted, pending, total };
  };

  const filteredDegrees = degrees.filter(degree =>
    degree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    degree.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StudentModal = () => {
    if (!selectedStudent) return null;
    
    const submissionData = getStudentSubmissionData(selectedStudent.id);
    const stats = getSubmissionStats(selectedStudent.id);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h3>
                <p className="text-gray-600">{selectedStudent.rollNumber} • {selectedStudent.degree}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Student Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Email:</span> {selectedStudent.email}</div>
                  <div><span className="font-medium">College:</span> {selectedStudent.college}</div>
                  <div><span className="font-medium">Year:</span> {selectedStudent.year}</div>
                  <div><span className="font-medium">Course:</span> {selectedStudent.course}</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Submission Status</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Total Projects:</span> {stats.total}</div>
                  <div><span className="font-medium">Submitted:</span> <span className="text-green-600">{stats.submitted}</span></div>
                  <div><span className="font-medium">Pending:</span> <span className="text-orange-600">{stats.pending}</span></div>
                  <div><span className="font-medium">Completion Rate:</span> {stats.total > 0 ? Math.round((stats.submitted / stats.total) * 100) : 0}%</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Project Submissions</h4>
              {submissionData && Object.keys(submissionData.topicSubmissions).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(submissionData.topicSubmissions).map(([key, submission]) => {
                    const [topicId, projectId] = key.split('-');
                    return (
                      <div key={key} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">Project ID: {projectId}</h5>
                          <div className="flex items-center space-x-2">
                            {submission.status === 'Submitted' ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-orange-600" />
                            )}
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              submission.status === 'Submitted' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {submission.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">Topic: {topicId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                        {submission.uploadedFile && (
                          <div className="mt-2 p-2 bg-blue-50 rounded flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-blue-800">{submission.uploadedFile.name}</span>
                            <span className="text-xs text-blue-600">
                              ({new Date(submission.uploadedFile.uploadDate).toLocaleDateString()})
                            </span>
                          </div>
                        )}
                        {submission.aiFeedback && submission.aiFeedback.length > 0 && (
                          <div className="mt-2 p-2 bg-purple-50 rounded">
                            <p className="text-sm font-medium text-purple-900 mb-1">AI Feedback:</p>
                            {submission.aiFeedback.map((feedback, index) => (
                              <p key={index} className="text-xs text-purple-800">{feedback}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No submissions yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Degrees & Students">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Degrees & Students Management</h2>
          <p className="text-gray-600">Manage degree programs and student profiles.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search degrees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredDegrees.map((degree) => {
          const isSelected = selectedDegree === degree.id;
          const students = getStudentsForDegree(degree.shortName);
          
          // Calculate submission statistics for this degree
          const degreeStats = students.reduce((acc, student) => {
            const stats = getSubmissionStats(student.id);
            acc.totalStudents++;
            if (stats.submitted > 0) acc.studentsWithSubmissions++;
            acc.totalSubmissions += stats.submitted;
            acc.totalPending += stats.pending;
            return acc;
          }, { totalStudents: 0, studentsWithSubmissions: 0, totalSubmissions: 0, totalPending: 0 });
          
          const submissionRate = degreeStats.totalStudents > 0 
            ? Math.round((degreeStats.studentsWithSubmissions / degreeStats.totalStudents) * 100) 
            : 0;
          
          return (
            <div key={degree.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => handleDegreeClick(degree.id)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{degree.name}</h3>
                      <p className="text-sm text-gray-600">{degree.shortName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{degreeStats.totalStudents}</div>
                      <div>Students</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{degreeStats.totalSubmissions}</div>
                      <div>Submitted</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-orange-600">{degreeStats.totalPending}</div>
                      <div>Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-purple-600">{submissionRate}%</div>
                      <div>Rate</div>
                    </div>
                  </div>
                </div>
              </button>

              {isSelected && (
                <div className="border-t border-gray-200 bg-gray-50">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900 flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Students ({students.length})
                      </h4>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-4 font-medium text-gray-700">Roll Number</th>
                            <th className="text-left py-2 px-4 font-medium text-gray-700">Name</th>
                            <th className="text-left py-2 px-4 font-medium text-gray-700">Email</th>
                            <th className="text-left py-2 px-4 font-medium text-gray-700">Year</th>
                            <th className="text-left py-2 px-4 font-medium text-gray-700">Submissions</th>
                            <th className="text-left py-2 px-4 font-medium text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.slice(0, 10).map((student) => {
                            const stats = getSubmissionStats(student.id);
                            return (
                              <tr key={student.id} className="border-b border-gray-100 hover:bg-white">
                                <td className="py-3 px-4 font-mono text-sm">{student.rollNumber}</td>
                                <td className="py-3 px-4">{student.name}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{student.email}</td>
                                <td className="py-3 px-4">Year {student.year}</td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-green-600 font-medium">{stats.submitted}</span>
                                    <span className="text-gray-400">/</span>
                                    <span className="text-gray-600">{stats.total}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <button
                                    onClick={() => setSelectedStudent(student)}
                                    className="text-purple-600 hover:text-purple-800 flex items-center text-sm"
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Profile
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {students.length > 10 && (
                        <div className="text-center py-4 text-gray-500">
                          Showing 10 of {students.length} students
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedStudent && <StudentModal />}
    </Layout>
  );
};

export default Degrees;