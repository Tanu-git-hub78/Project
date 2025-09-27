import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { Users, FileText, UserCheck, ChartBar as BarChart3, Bell, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { students, submissions, examiners } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const menuItems = [
    {
      title: 'Manage Students',
      description: 'View profiles, submissions, payment status',
      icon: Users,
      link: '/admin/students',
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Manage Projects',
      description: 'Approve/reject submissions, assign topics',
      icon: FileText,
      link: '/admin/projects',
      color: 'bg-green-100 hover:bg-green-200 text-green-800',
      iconColor: 'text-green-600'
    },
    {
      title: 'Manage Examiners',
      description: 'Create examiner credentials and assignments',
      icon: UserCheck,
      link: '/admin/examiners',
      color: 'bg-purple-100 hover:bg-purple-200 text-purple-800',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Reports & Analytics',
      description: 'Track submissions, payments, performance',
      icon: BarChart3,
      link: '/admin/analytics',
      color: 'bg-orange-100 hover:bg-orange-200 text-orange-800',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Notifications',
      description: 'Push deadlines and messages to students',
      icon: Bell,
      link: '/admin/notifications',
      color: 'bg-red-100 hover:bg-red-200 text-red-800',
      iconColor: 'text-red-600'
    }
  ];

  const totalStudents = students.length;
  const totalSubmissions = submissions.length;
  const totalExaminers = examiners.length;
  const paidStudents = students.filter(s => s.paymentStatus === 'paid').length;

  return (
    <Layout title="Admin Dashboard">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {user?.name}
        </h2>
        <p className="text-gray-600">
          Managing {user?.college} - {user?.department}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Students</h3>
          <div className="text-3xl font-bold text-blue-600">{totalStudents}</div>
          <p className="text-gray-600 text-sm mt-1">Registered students</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Submissions</h3>
          <div className="text-3xl font-bold text-green-600">{totalSubmissions}</div>
          <p className="text-gray-600 text-sm mt-1">Project submissions</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Paid Students</h3>
          <div className="text-3xl font-bold text-purple-600">{paidStudents}</div>
          <p className="text-gray-600 text-sm mt-1">Payment completed</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Examiners</h3>
          <div className="text-3xl font-bold text-orange-600">{totalExaminers}</div>
          <p className="text-gray-600 text-sm mt-1">Active examiners</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {submissions.slice(0, 5).map((submission) => (
            <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{submission.title}</h4>
                <p className="text-sm text-gray-600">
                  {submission.studentName} • {submission.department}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                  submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(submission.submissionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {submissions.length === 0 && (
            <p className="text-gray-500 text-center py-4">No submissions yet</p>
          )}
        </div>
      </div>

      {/* AI Chatbot Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </Layout>
  );
};

export default AdminDashboard;