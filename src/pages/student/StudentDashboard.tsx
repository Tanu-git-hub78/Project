import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { Upload, BookOpen, Lightbulb, Bell, CreditCard, User, MessageCircle, CircleCheck as CheckCircle, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { notifications, getStudentPaymentStatus, submissions } from '../../data/mockData';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const paymentStatus = getStudentPaymentStatus(user?.id || '');
  
  // Get student's submissions for stats
  const studentSubmissions = submissions.filter(s => 
    s.studentId === user?.id || s.studentName === user?.name
  );
  const approvedSubmissions = studentSubmissions.filter(s => s.status === 'approved');
  const pendingSubmissions = studentSubmissions.filter(s => s.status === 'pending');
  
  // AI Recommended Projects based on student's department
  const getAIRecommendations = () => {
    const department = user?.department || 'Computer Science';
    const recommendations = [
      {
        id: 1,
        title: 'Smart Campus IoT System',
        description: 'Build an IoT network for campus monitoring and automation',
        difficulty: 'Intermediate',
        duration: '4-5 months'
      },
      {
        id: 2,
        title: 'AI-Powered Learning Assistant',
        description: 'Create an intelligent tutoring system using machine learning',
        difficulty: 'Advanced',
        duration: '5-6 months'
      },
      {
        id: 3,
        title: 'Sustainable Energy Management',
        description: 'Develop a system for optimizing renewable energy usage',
        difficulty: 'Intermediate',
        duration: '3-4 months'
      }
    ];
    return recommendations;
  };

  // Progress Stepper Data
  const progressSteps = [
    { name: 'Proposal Approved', completed: true, current: false },
    { name: 'Field Work', completed: true, current: false },
    { name: 'Draft Submitted', completed: false, current: true },
    { name: 'Viva Scheduled', completed: false, current: false }
  ];

  const menuItems = [
    {
      title: 'Project Submission',
      description: 'Upload project reports (PDF, DOCX, PPT, ZIP)',
      icon: Upload,
      link: '/student/submission',
      color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Project Guidelines',
      description: 'Step-by-step instructions and sample PDFs',
      icon: BookOpen,
      link: '/student/guidelines',
      color: 'bg-orange-100 hover:bg-orange-200 text-orange-800',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Project Topics',
      description: 'Browse topics by department with filters',
      icon: Lightbulb,
      link: '/student/topics',
      color: 'bg-amber-100 hover:bg-amber-200 text-amber-800',
      iconColor: 'text-amber-600'
    },
    {
      title: 'Notifications',
      description: 'Latest deadlines and announcements',
      icon: Bell,
      link: '/student/notifications',
      color: 'bg-violet-100 hover:bg-violet-200 text-violet-800',
      iconColor: 'text-violet-600'
    },
    {
      title: 'Profile',
      description: 'View details, projects, and feedback',
      icon: User,
      link: '/student/profile',
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
      iconColor: 'text-blue-600'
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
        <h2 className="text-2xl font-bold text-[#2B2A29] mb-2">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-gray-600">
          {user?.department} Department • Roll No: {user?.rollNumber}
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-[#2B2A29] mb-6">Project Progress Tracker</h3>
        <div className="flex items-center justify-between">
          {progressSteps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-[#843534] text-white' 
                    : step.current 
                      ? 'bg-orange-100 text-[#843534] border-2 border-[#843534]'
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : step.current ? (
                    <Clock className="h-5 w-5" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-current"></div>
                  )}
                </div>
                <span className={`text-sm mt-2 text-center ${
                  step.completed || step.current ? 'text-[#2B2A29] font-medium' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
              </div>
              {index < progressSteps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 ${
                  step.completed ? 'bg-[#843534]' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommended Projects */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="h-6 w-6 text-[#843534]" />
          <h3 className="text-lg font-semibold text-[#2B2A29]">AI-Recommended for You</h3>
          <span className="bg-[#843534] text-white px-2 py-1 rounded-full text-xs font-medium">NEW</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getAIRecommendations().map((project) => (
            <div key={project.id} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <h4 className="font-semibold text-[#2B2A29] mb-2">{project.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{project.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                    project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {project.difficulty}
                  </span>
                  <span className="text-xs text-gray-500">{project.duration}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#843534]" />
              </div>
            </div>
          ))}
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
        <h3 className="text-lg font-semibold text-[#2B2A29] mb-4">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#843534]">{studentSubmissions.length}</div>
            <div className="text-gray-600">Submissions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{approvedSubmissions.length}</div>
            <div className="text-gray-600">Approved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600">{pendingSubmissions.length}</div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
              {paymentStatus === 'paid' ? '✓' : '✗'}
            </div>
            <div className="text-gray-600">Payment</div>
          </div>
        </div>
        
        {/* Recent Submissions */}
        {studentSubmissions.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-[#2B2A29] mb-3">Recent Submissions</h4>
            <div className="space-y-2">
              {studentSubmissions.slice(0, 3).map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-[#2B2A29] text-sm">{submission.title}</p>
                    <p className="text-xs text-gray-600">
                      Submitted: {new Date(submission.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                    submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Latest News */}
      {importantNotifications.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-[#2B2A29] mb-4 flex items-center">
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
        <button className="bg-[#843534] hover:bg-[#6d2a29] text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </Layout>
  );
};

export default StudentDashboard;