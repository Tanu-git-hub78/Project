import React from 'react';
import Layout from '../../components/Layout';
import { Clock, Upload, Shield, CheckCircle, Bell, FileText, Image } from 'lucide-react';
import { notifications } from '../../data/mockData';

const Guidelines: React.FC = () => {
  const guidelines = [
    {
      icon: Clock,
      title: 'Submission Deadlines',
      content: [
        'Project proposal deadline: March 31st, 2024',
        'Final submission deadline: May 20th, 2024 (Extended)',
        'Late submissions will incur penalty marks',
        'Extensions only granted for medical emergencies'
      ],
      color: 'text-blue-600'
    },
    {
      icon: Upload,
      title: 'File Requirements',
      content: [
        'Maximum file size: 10MB',
        'Accepted formats: PDF, DOC, DOCX, PPT, PPTX',
        'File name should include student ID and project title',
        'Multiple file uploads not allowed - combine into single document'
      ],
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Plagiarism Policy',
      content: [
        'All submissions will be checked for plagiarism',
        'Similarity index must be below 20%',
        'Proper citations required for all references',
        'Violations result in automatic rejection'
      ],
      color: 'text-red-600'
    },
    {
      icon: CheckCircle,
      title: 'Submission Steps',
      content: [
        '1. Complete your project proposal',
        '2. Review all requirements and guidelines',
        '3. Upload file through "New Submission" page',
        '4. Wait for faculty review and feedback',
        '5. Make revisions if requested'
      ],
      color: 'text-purple-600'
    }
  ];

  const importantNotifications = notifications.filter(n => n.isImportant);
  const generalNotifications = notifications.filter(n => !n.isImportant);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'deadline': return <Clock className="h-5 w-5 text-red-600" />;
      case 'format': return <FileText className="h-5 w-5 text-blue-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <Layout title="Guidelines & Notifications">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Guidelines & Latest Updates</h2>
        <p className="text-gray-600">Stay updated with the latest guidelines and important notifications.</p>
      </div>

      {/* Important Notifications */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-red-600" />
          Important Notifications
        </h3>
        <div className="space-y-4">
          {importantNotifications.map((notification) => (
            <div key={notification.id} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-red-900">{notification.title}</h4>
                  <p className="text-red-800 mt-1">{notification.message}</p>
                  <p className="text-red-600 text-sm mt-2">
                    {new Date(notification.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {guidelines.map((guideline, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className={`p-3 rounded-lg bg-gray-100 ${guideline.color}`}>
                <guideline.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">{guideline.title}</h3>
            </div>
            <ul className="space-y-2">
              {guideline.content.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Project Index Format */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center mb-4">
          <div className="p-3 rounded-lg bg-gray-100 text-indigo-600">
            <Image className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 ml-3">Project Index Format</h3>
        </div>
        
        {/* PDF Download Link */}
        <div className="mb-6">
          <a
            href="https://drive.google.com/file/d/1V3-dTT3ZFrYoHgO5OBovBceSn0D0hggC/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="h-5 w-5 mr-2" />
            Download Project Index Format (PDF)
          </a>
          <p className="text-sm text-gray-600 mt-2">
            Click to view the official project index format document
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="text-center mb-4">
            <div className="inline-block bg-white p-4 rounded-lg shadow-sm border-2 border-dashed border-gray-300">
              <div className="text-sm text-gray-600 space-y-2">
                <div className="font-bold text-lg text-gray-900">PROJECT TITLE</div>
                <div>Submitted by: [Student Name]</div>
                <div>Roll Number: [Roll Number]</div>
                <div>Degree: [Degree Name]</div>
                <div>Faculty Supervisor: [Faculty Name]</div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="font-semibold">TABLE OF CONTENTS</div>
                  <div className="text-left mt-2 space-y-1">
                    <div>1. Introduction ........................... 1</div>
                    <div>2. Literature Review .................. 5</div>
                    <div>3. Methodology ........................ 10</div>
                    <div>4. Results & Analysis ................ 15</div>
                    <div>5. Conclusion .......................... 20</div>
                    <div>6. References .......................... 22</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Follow this exact format for your project index page. Download the PDF above for detailed formatting guidelines.
          </p>
        </div>
      </div>

      {/* General Notifications */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
        <div className="space-y-4">
          {generalNotifications.map((notification) => (
            <div key={notification.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{notification.title}</h4>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(notification.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Reminders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
          <div>
            <h4 className="font-medium mb-2">Before Submission:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Proofread your entire document</li>
              <li>• Check all formatting requirements</li>
              <li>• Verify faculty supervisor approval</li>
              <li>• Ensure all sections are complete</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">After Submission:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Monitor your submission status regularly</li>
              <li>• Respond promptly to faculty feedback</li>
              <li>• Keep backup copies of all files</li>
              <li>• Check email for important updates</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Guidelines;