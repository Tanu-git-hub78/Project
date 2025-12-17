import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Upload, FileText, CircleCheck as CheckCircle, CircleAlert as AlertCircle, X } from 'lucide-react';
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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadError('');
    
    const allowedTypes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint', 
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
      'application/zip'
    ];
    
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];
    
    files.forEach(file => {
      if (allowedTypes.includes(file.type)) {
        if (file.size <= 10 * 1024 * 1024) { // 10MB limit
          validFiles.push(file);
        } else {
          invalidFiles.push(`${file.name} (too large)`);
        }
      } else {
        invalidFiles.push(`${file.name} (invalid type)`);
      }
    });
    
    if (invalidFiles.length > 0) {
      setUploadError(`Invalid files: ${invalidFiles.join(', ')}`);
    }
    
    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
      setFormData(prev => ({
        ...prev,
        fileName: validFiles.map(f => f.name).join(', ')
      }));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      setFormData(prevForm => ({
        ...prevForm,
        fileName: newFiles.map(f => f.name).join(', ')
      }));
      return newFiles;
    });
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word')) return '📝';
    if (fileType.includes('presentation')) return '📊';
    if (fileType.includes('zip')) return '📦';
    return '📁';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
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
        fileType: selectedFiles.map(f => f.type).join(', '),
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
            <Upload className="h-16 w-16 text-[#843534] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#2B2A29] mb-2">Submit Your Project</h2>
            <p className="text-gray-600">Upload your project report with all required details</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-[#843534] mr-3" />
              <span className="text-[#843534] font-medium">Ready to Submit - Upload your project files and submit</span>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#843534]"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#843534]"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#843534]"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#843534]"
                placeholder="Enter supervising faculty name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Files * (PDF, DOCX, PPT, PPTX, ZIP - Multiple files supported)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#843534] transition-colors">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.docx,.ppt,.pptx,.zip"
                  multiple
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload your project files</p>
                  <p className="text-sm text-gray-500">PDF, DOCX, PPT, PPTX, ZIP (Max 10MB each, Multiple files supported)</p>
                </label>
              </div>
              
              {/* Display uploaded files */}
              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getFileIcon(file.type)}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Upload Error */}
              {uploadError && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{uploadError}</p>
                </div>
              )}
              
              {/* Success feedback */}
              {selectedFiles.length > 0 && !uploadError && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600">
                    ✓ {selectedFiles.length} file(s) ready for submission
                  </p>
                </div>
              )}
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-[#843534] mt-0.5 mr-3" />
                <div className="text-[#843534] text-sm">
                  <p className="font-medium mb-1">Submission Guidelines:</p>
                  <ul className="space-y-1">
                    <li>• Ensure all files are properly formatted and complete</li>
                    <li>• Include all required sections as per guidelines</li>
                    <li>• Files will be automatically recorded with submission date</li>
                    <li>• You will receive confirmation once submitted</li>
                    <li>• Multiple file types supported for comprehensive submissions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting || selectedFiles.length === 0}
                className="flex-1 bg-[#843534] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#6d2a29] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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