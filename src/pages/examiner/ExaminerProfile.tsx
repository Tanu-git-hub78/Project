import React from 'react';
import Layout from '../../components/Layout';
import { User, Mail, Building, Calendar, Award, FileText, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { examiners } from '../../data/mockData';

const ExaminerProfile: React.FC = () => {
  const { user } = useAuth();
  const examinerData = examiners.find(e => e.id === user?.id);

  if (!examinerData) {
    return (
      <Layout title="Profile">
        <div className="text-center py-12">
          <p className="text-gray-500">Examiner profile not found.</p>
        </div>
      </Layout>
    );
  }

  const totalEvaluations = examinerData.evaluationHistory.length;
 const averageMarks = totalEvaluations > 0 
  ? Math.round(
      examinerData.evaluationHistory.reduce(
        (sum, evaluation) => sum + evaluation.vivaMarks,
        0
      ) / totalEvaluations
    )
  : 0;

const excellentPerformances =
  examinerData.evaluationHistory.filter(
    evaluation => evaluation.vivaMarks >= 85
  ).length;

  return (
    <Layout title="Examiner Profile">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Examiner Profile</h2>
        <p className="text-gray-600">Your profile information and evaluation history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{examinerData.name}</h3>
              <p className="text-gray-600">Examiner / Professor</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{examinerData.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{examinerData.department} Department</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{examinerData.college}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Assigned Classes</h4>
              <div className="space-y-2">
                {examinerData.assignedClasses.map((className, index) => (
                  <span key={index} className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {className}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics and Evaluation History */}
        <div className="lg:col-span-2 space-y-8">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Evaluations</p>
                  <p className="text-3xl font-bold text-blue-600">{totalEvaluations}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-sm text-gray-500 mt-2">Students evaluated</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Marks</p>
                  <p className="text-3xl font-bold text-green-600">{averageMarks}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-sm text-gray-500 mt-2">Out of 100</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Excellent (85+)</p>
                  <p className="text-3xl font-bold text-purple-600">{excellentPerformances}</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-sm text-gray-500 mt-2">High performers</p>
            </div>
          </div>

          {/* Evaluation History */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Evaluation History
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Student</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Project</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Marks</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {examinerData.evaluationHistory.map((evaluation) => (
                    <tr key={evaluation.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{evaluation.studentName}</div>
                          <div className="text-sm text-gray-500">{evaluation.rollNumber}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-900">{evaluation.projectTitle}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          evaluation.vivaMarks >= 85 ? 'bg-green-100 text-green-800' :
                          evaluation.vivaMarks >= 70 ? 'bg-blue-100 text-blue-800' :
                          evaluation.vivaMarks >= 50 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {evaluation.vivaMarks}/100
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(evaluation.evaluationDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <div className="max-w-xs">
                          <p className="text-sm text-gray-600 truncate" title={evaluation.feedback}>
                            {evaluation.feedback}
                          </p>
                          {evaluation.comments && (
                            <p className="text-xs text-gray-500 mt-1 truncate" title={evaluation.comments}>
                              {evaluation.comments}
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {examinerData.evaluationHistory.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No evaluations yet</h3>
                <p className="text-gray-600">Your evaluation history will appear here once you start evaluating students.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mt-8 bg-green-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-3">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
          <div>
            <h4 className="font-medium mb-2">Evaluation Summary:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Total students evaluated: {totalEvaluations}</li>
              <li>• Average marks awarded: {averageMarks}/100</li>
              <li>• Students with excellent performance: {excellentPerformances}</li>
              <li>• Success rate: {totalEvaluations > 0 ? Math.round((examinerData.evaluationHistory.filter(e => e.vivaMarks >= 50).length / totalEvaluations) * 100) : 0}%</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Recent Activity:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Last evaluation: {examinerData.evaluationHistory.length > 0 ? new Date(examinerData.evaluationHistory[examinerData.evaluationHistory.length - 1].evaluationDate).toLocaleDateString() : 'None'}</li>
              <li>• Department: {examinerData.department}</li>
              <li>• Assigned classes: {examinerData.assignedClasses.length}</li>
              <li>• Status: Active Examiner</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExaminerProfile;