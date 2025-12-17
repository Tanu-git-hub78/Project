import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Upload, FileText, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { addSubmission } from '../../data/mockData';

const ProjectSubmission: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    facultyName: '',
    department: (user && user.role === 'student') ? (user as any).department || '' : '',
    fileName: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/zip'];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        setFormData(prev => ({
          ...prev,
          fileName: file.name
        }));
      } else {
        alert('Please upload only PDF, DOCX, PPT, PPTX, or ZIP files.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      const submission = {
        studentId: user?.id || '',
        studentName: user?.name || '',
        rollNumber: (user && user.role === 'student') ? (user as any).rollNumber || '' : '',
        department: formData.department,
        title: formData.title,
        description: formData.description,
        facultyName: formData.facultyName,
        fileName: formData.fileName,
        fileType: selectedFile?.type || '',
        submissionDate: new Date().toISOString(),
        status: 'pending' as const,
        paymentStatus: 'paid' as const,
        category: 'General Project'
      };

      addSubmission(submission);
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        window.location.href = '/student';
      }, 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <Layout title="Submission Successful">
        <div className="flex flex-col items-center justify-center py-16">
          <CheckCircle className="h-16 w-16 text-green-600 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Submission Successful!</h2>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            Your project has been submitted successfully and is now under review. You will be redirected to your profile page.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Project Submission">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <Upload className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit Your Project</h2>
            <p className="text-gray-600">Upload your project report with all required details</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-blue-800 font-medium">Ready to Submit - Upload your project file and submit</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your project title"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <input
                type="text"
                id="department"
                name="department"
                required
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your department"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your project in detail"
              />
            </div>

            <div>
              <label htmlFor="facultyName" className="block text-sm font-medium text-gray-700 mb-2">
                Faculty Name *
              </label>
              <input
                type="text"
                id="facultyName"
                name="facultyName"
                required
                value={formData.facultyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter supervising faculty name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project File * (PDF, DOCX, PPT, PPTX, ZIP)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.docx,.ppt,.pptx,.zip"
                  required
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  {selectedFile ? (
                    <div className="flex items-center justify-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-blue-600 font-medium">{selectedFile.name}</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-2">Click to upload your project file</p>
                      <p className="text-sm text-gray-500">PDF, DOCX, PPT, PPTX, ZIP (Max 10MB)</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div className="text-blue-800 text-sm">
                  <p className="font-medium mb-1">Submission Guidelines:</p>
                  <ul className="space-y-1">
                    <li>• Ensure your file is properly formatted and complete</li>
                    <li>• Include all required sections as per guidelines</li>
                    <li>• File will be automatically recorded with submission date</li>
                    <li>• You will receive confirmation once submitted</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting || !selectedFile}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Project'}
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectSubmission;
 