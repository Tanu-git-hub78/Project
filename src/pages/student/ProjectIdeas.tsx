import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Brain, Lightbulb, Clock, Star, ChevronRight, Zap, ArrowLeft, FileText, MessageSquare, Upload, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAIProjectRecommendations, aiProjectIdeas, topicCards, updateProjectSubmission, generateAIFeedback } from '../../data/mockData';
import { AIProjectIdea, TopicProject } from '../../types';

const ProjectIdeas: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'ai-powered' | 'topic-cards'>('topic-cards');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<TopicProject | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'Not Submitted' | 'Submitted'>('Not Submitted');
  const [aiFeedback, setAiFeedback] = useState<string[]>([]);
  const [showAIFeedback, setShowAIFeedback] = useState(false);
  const [aiQuestions, setAiQuestions] = useState({
    interests: '',
    difficulty: '',
    duration: '',
    technologies: ''
  });
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<AIProjectIdea[]>([]);

  const studentDegree = user?.degree || 'BSc CS';

  const handleAIRecommendation = () => {
    const preferences = [
      aiQuestions.interests,
      aiQuestions.technologies
    ].filter(Boolean);
    
    const recs = getAIProjectRecommendations(studentDegree, preferences);
    setRecommendations(recs);
    setShowRecommendations(true);
  };

  const getAllProjectsForDegree = () => {
    return aiProjectIdeas.filter(project => project.degree === studentDegree);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
    setSelectedProject(null);
  };

  const handleProjectClick = (project: TopicProject) => {
    setSelectedProject(project);
    setSubmissionStatus(project.submissionStatus);
    setAiFeedback([]);
    setShowAIFeedback(false);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setSelectedProject(null);
    setUploadedFile(null);
    setSubmissionStatus('Not Submitted');
    setAiFeedback([]);
    setShowAIFeedback(false);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setUploadedFile(null);
    setSubmissionStatus('Not Submitted');
    setAiFeedback([]);
    setShowAIFeedback(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip'];
      if (allowedTypes.includes(file.type)) {
        setUploadedFile(file);
      } else {
        alert('Please upload only PDF, DOCX, or ZIP files.');
      }
    }
  };

  const handleSubmitProject = () => {
    if (uploadedFile && selectedProject && selectedTopic && user) {
      const fileData = {
        name: uploadedFile.name,
        type: uploadedFile.type,
        uploadDate: new Date().toISOString()
      };
      
      updateProjectSubmission(user.id, selectedTopic, selectedProject.id, fileData);
      setSubmissionStatus('Submitted');
      
      // Update the project in the topic cards
      const topic = topicCards.find(t => t.id === selectedTopic);
      if (topic) {
        const project = topic.projects.find(p => p.id === selectedProject.id);
        if (project) {
          project.submissionStatus = 'Submitted';
          project.uploadedFile = fileData;
        }
      }
      
      alert('Project submitted successfully!');
    }
  };

  const handleGetAIFeedback = () => {
    if (selectedProject && uploadedFile) {
      const feedback = generateAIFeedback(selectedProject.name, uploadedFile.name);
      setAiFeedback(feedback);
      setShowAIFeedback(true);
    }
  };

  const ProjectCard = ({ project }: { project: AIProjectIdea }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold text-gray-900 text-lg">{project.title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
          {project.difficulty}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{project.description}</p>
      
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-2" />
          <span>Duration: {project.estimatedDuration}</span>
        </div>
        
        {project.technologies && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Technologies:</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Project Details View
  if (selectedProject) {
    return (
      <Layout title="Project Details">
        <div className="mb-6">
          <button
            onClick={handleBackToProjects}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </button>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProject.name}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Description</h3>
              <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
            </div>

            {/* File Upload Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Submit Your Project</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    submissionStatus === 'Submitted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {submissionStatus}
                  </span>
                </div>

                {submissionStatus === 'Not Submitted' && (
                  <>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="project-file-upload"
                        accept=".pdf,.docx,.zip"
                      />
                      <label htmlFor="project-file-upload" className="cursor-pointer">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        {uploadedFile ? (
                          <div className="flex items-center justify-center space-x-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <span className="text-blue-600 font-medium">{uploadedFile.name}</span>
                          </div>
                        ) : (
                          <>
                            <p className="text-gray-600 mb-2">Click to upload your project file</p>
                            <p className="text-sm text-gray-500">PDF, DOCX, ZIP (Max 10MB)</p>
                          </>
                        )}
                      </label>
                    </div>

                    {uploadedFile && (
                      <button
                        onClick={handleSubmitProject}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Submit Project
                      </button>
                    )}
                  </>
                )}

                {submissionStatus === 'Submitted' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-900">Project Submitted Successfully!</span>
                    </div>
                    <p className="text-green-800 text-sm mb-4">Your project has been submitted and is under review.</p>
                    
                    <button
                      onClick={handleGetAIFeedback}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      Get AI Feedback
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* AI Feedback Section */}
            {showAIFeedback && aiFeedback.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-600" />
                  AI Feedback
                </h3>
                <div className="space-y-3">
                  {aiFeedback.map((feedback, index) => (
                    <div key={index} className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <p className="text-purple-800">{feedback}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedProject.hasFile && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Reference File</h3>
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">{selectedProject.fileName}</p>
                    <p className="text-sm text-blue-600">Click to download reference</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Comments & Feedback
              </h3>
              <div className="space-y-3">
                {selectedProject.comments.map((comment, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Guidance & Tips</h3>
              <div className="space-y-3">
                {selectedProject.guidance.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Need Help?</h4>
              <p className="text-blue-800 text-sm mb-4">
                Use our AI chatbot for personalized guidance on this project.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Ask AI Assistant
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Topic Projects List View
  if (selectedTopic) {
    const topic = topicCards.find(t => t.id === selectedTopic);
    if (!topic) return null;

    return (
      <Layout title={topic.title}>
        <div className="mb-6">
          <button
            onClick={handleBackToTopics}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Topics
          </button>
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{topic.icon}</span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{topic.title}</h2>
              <p className="text-gray-600">{topic.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topic.projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-lg">{project.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.submissionStatus === 'Submitted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.submissionStatus}
                  </span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {project.hasFile && (
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      <span>Reference file</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{project.comments.length} comments</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Project Ideas">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Ideas & Topics</h2>
        <p className="text-gray-600">Explore project topics or get AI-powered recommendations for {studentDegree}.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('topic-cards')}
          className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md transition-colors ${
            activeTab === 'topic-cards'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Lightbulb className="h-5 w-5 mr-2" />
          Topic Cards
        </button>
        <button
          onClick={() => setActiveTab('ai-powered')}
          className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md transition-colors ${
            activeTab === 'ai-powered'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Brain className="h-5 w-5 mr-2" />
          AI Recommendations
        </button>
      </div>

      {activeTab === 'topic-cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicCards.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleTopicClick(topic.id)}
              className={`${topic.color} p-6 rounded-xl shadow-sm transition-all duration-200 transform hover:scale-105 cursor-pointer`}
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{topic.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{topic.title}</h3>
                  <p className="opacity-80 text-sm">{topic.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm opacity-75">{topic.projects.length} projects available</span>
                <ChevronRight className="h-5 w-5 opacity-60" />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'ai-powered' && (
        <div className="space-y-8">
          {!showRecommendations ? (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Personalized Recommendations</h3>
                <p className="text-gray-600">Answer a few questions to get AI-powered project suggestions tailored to your interests.</p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are your main interests or areas you'd like to explore?
                  </label>
                  <input
                    type="text"
                    value={aiQuestions.interests}
                    onChange={(e) => setAiQuestions(prev => ({ ...prev, interests: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., machine learning, web development, mobile apps"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred difficulty level?
                  </label>
                  <select
                    value={aiQuestions.difficulty}
                    onChange={(e) => setAiQuestions(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select difficulty</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How much time can you dedicate?
                  </label>
                  <select
                    value={aiQuestions.duration}
                    onChange={(e) => setAiQuestions(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select duration</option>
                    <option value="2-3 months">2-3 months</option>
                    <option value="3-4 months">3-4 months</option>
                    <option value="4-6 months">4-6 months</option>
                    <option value="6+ months">6+ months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Any specific technologies you want to work with?
                  </label>
                  <input
                    type="text"
                    value={aiQuestions.technologies}
                    onChange={(e) => setAiQuestions(prev => ({ ...prev, technologies: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Python, React, TensorFlow, Java"
                  />
                </div>

                <button
                  onClick={handleAIRecommendation}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Get AI Recommendations
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  AI Recommendations for You
                </h3>
                <button
                  onClick={() => setShowRecommendations(false)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Try Again
                </button>
              </div>
              
              {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {recommendations.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No specific recommendations found. Try browsing topic cards above.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default ProjectIdeas;