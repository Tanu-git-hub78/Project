import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { Users, ClipboardCheck, Send, User, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { students, submissions } from '../../data/mockData';

const ExaminerDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const menuItems = [
    {
      title: 'Assigned Students',
      description: 'View list of students for viva evaluation',
      icon: Users,
      link: '/examiner/students',
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Viva Evaluation',
      description: 'Enter viva marks, feedback, and comments',
      icon: ClipboardCheck,
      link: '/examiner/evaluation',
      color: 'bg-green-100 hover:bg-green-200 text-green-800',
      iconColor: 'text-green-600'
    },
    {
      title: 'Submit Marks',
      description: 'Submit final scores and evaluations',
      icon: Send,
      link: '/examiner/submit',
      color: 'bg-purple-100 hover:bg-purple-200 text-purple-800',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Profile',
      description: 'View your information and evaluation history',
      icon: User,
      link: '/examiner/profile',
      color: 'bg-orange-100 hover:bg-orange-200 text-orange-800',
      iconColor: 'text-orange-600'
    }
  ];

  // Filter students assigned to this examiner (mock logic)
  const assignedStudents = students.filter(s => s.department === user?.department);
  const pendingEvaluations = submissions.filter(s => 
    s.department === user?.department && !s.vivaMarks
  );

  return (
    <Layout title="Examiner Dashboard">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {user?.name}
        </h2>
        <p className="text-gray-600">
          {user?.department} Department Examiner • {user?.college}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`${item.color} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 block`}
          >
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-lg ${item.iconColor} bg-white`}>
                <item.icon className="h-8 w-8" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="opacity-80 text-sm">{item.description}</p>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Assigned Students</h3>
          <div className="text-3xl font-bold text-blue-600">{assignedStudents.length}</div>
          <p className="text-gray-600 text-sm mt-1">Students to evaluate</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Evaluations</h3>
          <div className="text-3xl font-bold text-orange-600">{pendingEvaluations.length}</div>
          <p className="text-gray-600 text-sm mt-1">Awaiting viva marks</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed</h3>
          <div className="text-3xl font-bold text-green-600">
            {submissions.filter(s => s.department === user?.department && s.vivaMarks).length}
          </div>
          <p className="text-gray-600 text-sm mt-1">Evaluations done</p>
        </div>
      </div>

      {/* Pending Evaluations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Evaluations</h3>
        <div className="space-y-4">
          {pendingEvaluations.slice(0, 5).map((submission) => (
            <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{submission.title}</h4>
                <p className="text-sm text-gray-600">
                  {submission.studentName} • {submission.rollNumber}
                </p>
              </div>
              <div className="text-right">
                <Link
                  to={`/examiner/evaluation/${submission.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Evaluate
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  Submitted: {new Date(submission.submissionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {pendingEvaluations.length === 0 && (
            <p className="text-gray-500 text-center py-4">No pending evaluations</p>
          )}
        </div>
      </div>

      {/* AI Chatbot Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </Layout>
  );
};

export default ExaminerDashboard;