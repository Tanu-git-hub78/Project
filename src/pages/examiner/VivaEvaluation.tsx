import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FileText, Download, Save, Eye, User, CircleCheck as CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAssignedStudents, submitVivaEvaluation } from '../../data/mockData';

interface StudentEvaluation {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  assignedProject: string;
  status: string;
  vivaMarks?: number;
  feedback?: string;
  comments?: string;
}

const VivaEvaluation: React.FC = () => {
  const { user } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState<StudentEvaluation | null>(null);
  const [vivaMarks, setVivaMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [examinerComments, setExaminerComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSubmissions, setAvailableSubmissions] = useState(submissions);

  const assignedStudents = getAssignedStudents(user?.id || '');
  
  // Refresh submissions when component mounts
  React.useEffect(() => {
    setAvailableSubmissions([...submissions]);
  }, []);

  // Pre-populate example data for demonstration
  const getExampleData = (studentName: string) => {
    const examples: { [key: string]: { marks: string; feedback: string; comments: string } } = {
      'Tanu Sharma': {
        marks: '85',
        feedback: 'Very good understanding of concepts',
        comments: 'Needs improvement in presentation skills'
      },
      'Raj Patel': {
        marks: '78',
        feedback: 'Good effort and technical clarity',
        comments: 'Could add more examples'
      },
      'Shakshi Verma': {
        marks: '90',
        feedback: 'Excellent project explanation',
        comments: 'Outstanding performance'
      }
    };
    return examples[studentName] || { marks: '', feedback: '', comments: '' };
  };

  const handleStudentSelect = (student: StudentEvaluation) => {
    setSelectedStudent(student);
    const exampleData = getExampleData(student.name);
    setVivaMarks(exampleData.marks);
    setFeedback(exampleData.feedback);
    setExaminerComments(exampleData.comments);
  };

  const handleSaveEvaluation = async () => {
    if (selectedStudent && vivaMarks) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        const marks = parseInt(vivaMarks);
        submitVivaEvaluation(selectedStudent.id, marks, feedback, examinerComments);
        
        alert('Evaluation saved successfully!');
        setSelectedStudent(null);
        setVivaMarks('');
        setFeedback('');
        setExaminerComments('');
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleDownloadProject = (studentName: string) => {
    alert(`Downloading ${studentName}'s project file...`);
  };

  const getMarksColor = (marks: string) => {
    const score = parseInt(marks);
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Layout title="Viva Evaluation">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Viva Evaluation</h2>
        <p className="text-gray-600">Conduct viva evaluations and assign marks to students.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Students List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Students for Evaluation ({assignedStudents.length})
          </h3>
          
          <div className="space-y-4">
            {assignedStudents.map((student) => (
              <div
                key={student.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedStudent?.id === student.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleStudentSelect(student)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.rollNumber}</p>
                      </div>
                    </div>
                    <div className="ml-13">
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Project:</span> {student.assignedProject}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Department:</span> {student.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadProject(student.name);
                      }}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title="Download Project"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      {student.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {assignedStudents.length === 0 && (
              <p className="text-gray-500 text-center py-8">No students assigned for evaluation</p>
            )}
          </div>
        </div>

        {/* Evaluation Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Evaluation Form
          </h3>
          
          {selectedStudent ? (
            <div className="space-y-6">
              {/* Student Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedStudent.name}</h4>
                    <p className="text-sm text-gray-600">{selectedStudent.rollNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div><span className="font-medium">Department:</span> {selectedStudent.department}</div>
                  <div><span className="font-medium">Project:</span> {selectedStudent.assignedProject}</div>
                </div>
                <div className="mt-3 flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">Cybersecurity_Project_{selectedStudent.name.replace(' ', '_')}.pdf</span>
                  <button
                    onClick={() => handleDownloadProject(selectedStudent.name)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Download
                  </button>
                </div>
              </div>

              {/* Viva Marks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Viva Marks (out of 100) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={vivaMarks}
                  onChange={(e) => setVivaMarks(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter marks (0-100)"
                />
                {vivaMarks && (
                  <p className={`text-sm mt-1 font-medium ${getMarksColor(vivaMarks)}`}>
                    Grade: {parseInt(vivaMarks) >= 85 ? 'Excellent' : 
                           parseInt(vivaMarks) >= 70 ? 'Good' : 
                           parseInt(vivaMarks) >= 50 ? 'Average' : 'Needs Improvement'}
                  </p>
                )}
              </div>

              {/* Student Feedback */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Feedback *
                </label>
                <textarea
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Provide constructive feedback for the student..."
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Internal examiner comments for records..."
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveEvaluation}
                disabled={!vivaMarks || !feedback || isSubmitting}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="h-5 w-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Evaluation
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Select a student from the left to start evaluation</p>
              <p className="text-sm text-gray-400">Click on any student card to begin the viva evaluation process</p>
            </div>
          )}
        </div>
      </div>

      {/* Evaluation Guidelines */}
      <div className="mt-8 bg-green-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-3">Evaluation Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
          <div>
            <h4 className="font-medium mb-2">Marking Criteria:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Technical Understanding (40%)</li>
              <li>• Project Implementation (30%)</li>
              <li>• Presentation Skills (20%)</li>
              <li>• Innovation & Creativity (10%)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Grade Distribution:</h4>
            <ul className="space-y-1 text-sm">
              <li>• 85-100: Excellent Performance</li>
              <li>• 70-84: Good Performance</li>
              <li>• 50-69: Average Performance</li>
              <li>• Below 50: Needs Improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VivaEvaluation;