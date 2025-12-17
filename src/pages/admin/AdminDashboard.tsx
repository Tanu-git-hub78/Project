import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { Users, FileText, UserCheck, ChartBar as BarChart3, Bell, MessageCircle, Upload, Award, TrendingUp, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { students, submissions, examiners } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Sample data for charts
  const departmentData = [
    { name: 'Agriculture', submissions: 45, total: 60 },
    { name: 'Engineering', submissions: 78, total: 90 },
    { name: 'Commerce', submissions: 32, total: 45 },
    { name: 'Science', submissions: 56, total: 70 }
  ];

  const statusData = [
    { name: 'Pending', value: 35, color: '#F59E0B' },
    { name: 'Under Review', value: 42, color: '#3B82F6' },
    { name: 'Completed', value: 134, color: '#10B981' }
  ];

  const menuItems = [
    {
      title: 'Manage Students',
      description: 'View profiles, submissions, payment status',
      icon: Users,
      link: '/admin/students',
      color: 'bg-orange-100 hover:bg-orange-200 text-orange-800',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Manage Projects',
      description: 'Approve/reject submissions, assign topics',
      icon: FileText,
      link: '/admin/projects',
      color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Manage Examiners',
      description: 'Create examiner credentials and assignments',
      icon: UserCheck,
      link: '/admin/examiners',
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Reports & Analytics',
      description: 'Track submissions, payments, performance',
      icon: BarChart3,
      link: '/admin/analytics',
      color: 'bg-purple-100 hover:bg-purple-200 text-purple-800',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Notifications',
      description: 'Push deadlines and messages to students',
      icon: Bell,
      link: '/admin/notifications',
      color: 'bg-rose-100 hover:bg-rose-200 text-rose-800',
      iconColor: 'text-rose-600'
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

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Project Submissions by Department */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[#2B2A29] mb-6">Project Submissions by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="submissions" fill="#843534" name="Submitted" />
              <Bar dataKey="total" fill="#E5E7EB" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Overall Project Status */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[#2B2A29] mb-6">Overall Project Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accreditation Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-[#2B2A29]">NEP 2020 Compliance</h3>
              <p className="text-sm text-gray-600">National Education Policy</p>
            </div>
            <Award className="h-8 w-8 text-[#843534]" />
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span className="font-semibold text-[#843534]">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#843534] h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <p className="text-xs text-gray-500">Curriculum alignment with NEP guidelines</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-[#2B2A29]">NAAC Report</h3>
              <p className="text-sm text-gray-600">Institutional Assessment</p>
            </div>
            <Download className="h-8 w-8 text-[#843534]" />
          </div>
          <button className="w-full bg-[#843534] text-white py-2 px-4 rounded-lg hover:bg-[#6d2a29] transition-colors text-sm">
            Generate NAAC Institutional Report
          </button>
          <p className="text-xs text-gray-500 mt-2">Last generated: Dec 1, 2024</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-[#2B2A29]">Bulk Import</h3>
              <p className="text-sm text-gray-600">Students/Faculty Data</p>
            </div>
            <Upload className="h-8 w-8 text-[#843534]" />
          </div>
          <button className="w-full border border-[#843534] text-[#843534] py-2 px-4 rounded-lg hover:bg-[#843534] hover:text-white transition-colors text-sm">
            Upload CSV File
          </button>
          <p className="text-xs text-gray-500 mt-2">Supports CSV format only</p>
        </div>
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
          <div className="text-3xl font-bold text-[#843534]">{totalStudents}</div>
          <p className="text-gray-600 text-sm mt-1">Registered students</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Submissions</h3>
          <div className="text-3xl font-bold text-emerald-600">{totalSubmissions}</div>
          <p className="text-gray-600 text-sm mt-1">Project submissions</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Paid Students</h3>
          <div className="text-3xl font-bold text-blue-600">{paidStudents}</div>
          <p className="text-gray-600 text-sm mt-1">Payment completed</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Examiners</h3>
          <div className="text-3xl font-bold text-purple-600">{totalExaminers}</div>
          <p className="text-gray-600 text-sm mt-1">Active examiners</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-[#2B2A29] mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {submissions.slice(0, 5).map((submission) => (
            <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-[#2B2A29]">{submission.title}</h4>
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
        <button className="bg-[#843534] hover:bg-[#6d2a29] text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </Layout>
  );
};

export default AdminDashboard;