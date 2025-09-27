import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { Upload, BookOpen, Lightbulb, Bell, CreditCard, User, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { notifications, getStudentPaymentStatus } from '../../data/mockData';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const paymentStatus = getStudentPaymentStatus(user?.id || '');
  
  const menuItems = [
    {
      title: 'Project Submission',
      description: 'Upload project reports (PDF, DOCX, PPT, ZIP)',
      icon: Upload,
      link: '/student/submission',
      color: 'bg-green-100 hover:bg-green-200 text-green-800',
      iconColor: 'text-green-600'
    },
    {
      title: 'Project Guidelines',
      description: 'Step-by-step instructions and sample PDFs',
      icon: BookOpen,
      link: '/student/guidelines',
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Project Topics',
      description: 'Browse topics by department with filters',
      icon: Lightbulb,
      link: '/student/topics',
      color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800',
      iconColor: 'text-yellow-600'
    },
    {
      title: 'Notifications',
      description: 'Latest deadlines and announcements',
      icon: Bell,
      link: '/student/notifications',
      color: 'bg-purple-100 hover:bg-purple-200 text-purple-800',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Profile',
      description: 'View details, projects, and feedback',
      icon: User,
      link: '/student/profile',
      color: 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800',
      iconColor: 'text-indigo-600'
    },
    {
      title: 'Payment',
      description: `Pay ₹50 for submission (Status: ${paymentStatus})`,
      icon: CreditCard,
      link: '/student/payment',
      color: paymentStatus === 'paid' ? 'bg-green-100 hover:bg-green-200 text-green-800' : 'bg-red-100 hover:bg-red-200 text-red-800',
      iconColor: paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'
    }
  ];

  const importantNotifications = notifications.filter(n => 
    n.isImportant && 
    n.isActive && 
    (n.targetRole === 'student' || n.targetRole === 'all')
  );

  return (
    <Layout title="Student Dashboard">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-gray-600">
          {user?.department} Department • Roll No: {user?.rollNumber}
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

      {/* Payment Status Alert */}
      {paymentStatus === 'pending' && (
        <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 text-red-600 mr-3" />
            <div>
              <h4 className="font-medium text-red-900">Payment Required</h4>
              <p className="text-red-800 text-sm">You need to pay ₹50 before submitting your project. Click on Payment section to proceed.</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mb-12 bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="text-gray-600">Submissions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">0</div>
            <div className="text-gray-600">Approved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">0</div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
              {paymentStatus === 'paid' ? '✓' : '✗'}
            </div>
            <div className="text-gray-600">Payment</div>
          </div>
        </div>
      </div>

      {/* Latest News */}
      {importantNotifications.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-red-600" />
            Latest News
          </h3>
          <div className="space-y-4">
            {importantNotifications.map((notification) => (
              <div key={notification.id} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <Bell className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-red-900">{notification.title}</h4>
                    <p className="text-red-800 mt-1">{notification.message}</p>
                    <p className="text-red-600 text-sm mt-2">
                      {new Date(notification.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Chatbot Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </Layout>
  );
};

export default StudentDashboard;