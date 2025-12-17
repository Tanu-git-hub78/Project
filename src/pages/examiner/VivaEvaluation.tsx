import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FileText, Download, Save, Eye, User, CircleCheck as CheckCircle, Clock, Calendar, Shield, Calculator } from 'lucide-react';
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
  const [criteriaScores, setCriteriaScores] = useState({
    criteria1: '',
    criteria2: '',
    criteria3: '',
    criteria4: ''
  });
  const [totalScore, setTotalScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [examinerComments, setExaminerComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const assignedStudents = getAssignedStudents(user?.id || '');
  
  // Get department-specific criteria
  const getDepartmentCriteria = (department: string) => {
    switch (department.toLowerCase()) {
      case 'computer science':
      case 'engineering':
        return {
          criteria1: { name: 'Innovation', weight: 30 },
          criteria2: { name: 'Implementation', weight: 40 },
          criteria3: { name: 'Plagiarism Score', weight: 10 },
          criteria4: { name: 'Viva Performance', weight: 20 }
        };
      case 'agriculture':
        return {
          criteria1: { name: 'Field Work', weight: 40 },
          criteria2: { name: 'Sustainability', weight: 30 },
          criteria3: { name: 'Data Accuracy', weight: 15 },
          criteria4: { name: 'Viva Performance', weight: 15 }
        };
      default: // Humanities
        return {
          criteria1: { name: 'Critical Thinking', weight: 40 },
          criteria2: { name: 'Social Impact', weight: 30 },
          criteria3: { name: 'Research Quality', weight: 15 },
          criteria4: { name: 'Viva Performance', weight: 15 }
        };
    }
  };

  // Calculate total score
  React.useEffect(() => {
    if (selectedStudent) {
      const criteria = getDepartmentCriteria(selectedStudent.department);
      const score1 = parseFloat(criteriaScores.criteria1) || 0;
      const score2 = parseFloat(criteriaScores.criteria2) || 0;
      const score3 = parseFloat(criteriaScores.criteria3) || 0;
      const score4 = parseFloat(criteriaScores.criteria4) || 0;
      
      const weighted = (
        (score1 * criteria.criteria1.weight / 100) +
        (score2 * criteria.criteria2.weight / 100) +
        (score3 * criteria.criteria3.weight / 100) +
        (score4 * criteria.criteria4.weight / 100)
      );
      
      setTotalScore(Math.round(weighted));
    }
  }, [criteriaScores, selectedStudent]);

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
    setCriteriaScores({
      criteria1: '85',
      criteria2: '80',
      criteria3: '90',
      criteria4: '75'
    });
    setFeedback(exampleData.feedback);
    setExaminerComments(exampleData.comments);
  };

  const handleCriteriaChange = (criteria: string, value: string) => {
    setCriteriaScores(prev => ({
      ...prev,
      [criteria]: value
    }));
  };

  const handleSaveEvaluation = async () => {
    if (selectedStudent && totalScore) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        submitVivaEvaluation(selectedStudent.id, totalScore, feedback, examinerComments);
        
        alert('Evaluation saved successfully!');
        setSelectedStudent(null);
        setCriteriaScores({
          criteria1: '',
          criteria2: '',
          criteria3: '',
          criteria4: ''
        });
        setTotalScore(0);
        setFeedback('');
        setExaminerComments('');
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleDownloadProject = (studentName: string) => {
    alert(`Downloading ${studentName}'s project file...`);
  };

  const handleScheduleViva = () => {
    setShowScheduleModal(false);
    // Show success toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = 'Viva scheduled successfully!';
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const getMarksColor = (marks: string) => {
    const score = parseInt(marks);
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const ScheduleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold text-[#2B2A29] mb-6">Schedule Viva</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleScheduleViva}
              className="flex-1 bg-[#843534] text-white py-2 px-4 rounded-lg hover:bg-[#6d2a29]"
            >
              Schedule
            </button>
            <button
              onClick={() => setShowScheduleModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Layout title="Viva Evaluation">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#2B2A29] mb-2">Professional Evaluation System</h2>
        <p className="text-gray-600">Conduct viva evaluations and assign marks to students.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Students List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[#2B2A29] mb-4 flex items-center">
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
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-[#843534]" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#2B2A29]">{student.name}</h4>
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
                        setShowScheduleModal(true);
                      }}
                      className="text-[#843534] hover:text-[#6d2a29] p-1"
                      title="Schedule Viva"
                    >
                      <Calendar className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadProject(student.name);
                      }}
                      className="text-[#843534] hover:text-[#6d2a29] p-1"
                      title="Download Project"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                      <Shield className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-800 font-medium">SimiCheck: 12%</span>
                    </div>
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
          <h3 className="text-lg font-semibold text-[#2B2A29] mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Dynamic Weighted Rubrics
          </h3>
          
          {selectedStudent ? (
            <div className="space-y-6">
              {/* Student Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-[#843534]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#2B2A29]">{selectedStudent.name}</h4>
                    <p className="text-sm text-gray-600">{selectedStudent.rollNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div><span className="font-medium">Department:</span> {selectedStudent.department}</div>
                  <div><span className="font-medium">Project:</span> {selectedStudent.assignedProject}</div>
                </div>
                <div className="mt-3 flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-[#843534]" />
                  <span className="text-sm text-[#843534]">Project_{selectedStudent.name.replace(' ', '_')}.pdf</span>
                  <button
                    onClick={() => handleDownloadProject(selectedStudent.name)}
                    className="text-[#843534] hover:text-[#6d2a29] text-sm"
                  >
                    Download
                  </button>
                  <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full ml-auto">
                    <Shield className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-800 font-medium">SimiCheck: 12%</span>
                  </div>
                </div>
              </div>

              {/* Department-specific Criteria */}
              {selectedStudent && (() => {
                const criteria = getDepartmentCriteria(selectedStudent.department);
                return (
                  <div>
                    <h4 className="font-medium text-[#2B2A29] mb-4">
                      {selectedStudent.department} Department Criteria
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(criteria).map(([key, criterion]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {criterion.name} ({criterion.weight}%) *
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={criteriaScores[key as keyof typeof criteriaScores]}
                            onChange={(e) => handleCriteriaChange(key, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#843534]"
                            placeholder="Enter score (0-100)"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Live Total Score Calculator */}
              <div>
                <div className="bg-[#843534] text-white p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calculator className="h-5 w-5" />
                      <span className="font-medium">Live Total Score</span>
                    </div>
                    <div className="text-2xl font-bold">{totalScore}/100</div>
                  </div>
                  <p className="text-sm mt-1 opacity-90">
                    Grade: {totalScore >= 85 ? 'Excellent' : 
                           totalScore >= 70 ? 'Good' : 
                           totalScore >= 50 ? 'Average' : 'Needs Improvement'}
                  </p>
                </div>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#843534]"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#843534]"
                  placeholder="Internal examiner comments for records..."
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveEvaluation}
                disabled={!totalScore || !feedback || isSubmitting}
                className="w-full bg-[#843534] text-white py-3 px-4 rounded-lg hover:bg-[#6d2a29] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
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
      <div className="mt-8 bg-orange-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#843534] mb-3">Dynamic Evaluation Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#2B2A29]">
          <div>
            <h4 className="font-medium mb-2">Engineering/CS Criteria:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Innovation (30%)</li>
              <li>• Implementation (40%)</li>
              <li>• Plagiarism Score (10%)</li>
              <li>• Viva Performance (20%)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Agriculture Criteria:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Field Work (40%)</li>
              <li>• Sustainability (30%)</li>
              <li>• Data Accuracy (15%)</li>
              <li>• Viva Performance (15%)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Humanities Criteria:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Critical Thinking (40%)</li>
              <li>• Social Impact (30%)</li>
              <li>• Research Quality (15%)</li>
              <li>• Viva Performance (15%)</li>
            </ul>
          </div>
        </div>
      </div>

      {showScheduleModal && <ScheduleModal />}
    </Layout>
  );
};

export default VivaEvaluation;