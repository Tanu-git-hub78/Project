import React, { useState, useMemo } from 'react';
import Layout from '../../components/Layout';
import { Search, Filter, Bookmark, BookmarkCheck, Eye, Clock, Users, Star, Calendar, ChevronRight, X, Mail, User, Target, Wrench, Award, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { departmentFolders } from '../../data/mockData';
import { TopicProject } from '../../types';

const ProjectTopics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<TopicProject | null>(null);
  const [bookmarkedProjects, setBookmarkedProjects] = useState<string[]>([]);
  const [exploredDepartments, setExploredDepartments] = useState<string[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  // Get all projects from all departments
  const allProjects = useMemo(() => {
    const projects: (TopicProject & { departmentName: string; departmentIcon: string })[] = [];
    departmentFolders.forEach(department => {
      department.projects.forEach(project => {
        projects.push({
          ...project,
          departmentName: department.name,
          departmentIcon: department.icon
        });
      });
    });
    return projects;
  }, []);

  // Filter projects based on search and filter criteria
  const filteredProjects = useMemo(() => {
    let filtered = allProjects;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tools.some(tool => tool.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply type filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'workshops') {
        filtered = filtered.filter(project => project.type === 'workshop');
      } else if (selectedFilter === 'research') {
        filtered = filtered.filter(project => project.type === 'research');
      } else if (selectedFilter === 'technical') {
        filtered = filtered.filter(project => project.type === 'technical');
      }
    }

    return filtered;
  }, [allProjects, searchTerm, selectedFilter]);

  // Get workshop projects for the workshop section
  const workshopProjects = useMemo(() => {
    return allProjects.filter(project => project.type === 'workshop');
  }, [allProjects]);

  const handleBookmark = (projectId: string) => {
    setBookmarkedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleProjectClick = (project: TopicProject & { departmentName: string; departmentIcon: string }) => {
    setSelectedProject(project);
    if (!exploredDepartments.includes(project.departmentName)) {
      setExploredDepartments(prev => [...prev, project.departmentName]);
    }
  };

  const handleFolderToggle = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-purple-100 text-purple-800';
      case 'research': return 'bg-blue-100 text-blue-800';
      case 'technical': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ProjectDetailsModal = () => {
    if (!selectedProject) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{selectedProject.departmentIcon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h3>
                  <p className="text-gray-600">{selectedProject.departmentName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Tags */}
            <div className="flex items-center space-x-3 mt-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedProject.difficulty)}`}>
                {selectedProject.difficulty}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedProject.type)}`}>
                {selectedProject.type.charAt(0).toUpperCase() + selectedProject.type.slice(1)}
              </span>
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {selectedProject.duration}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Project Description
              </h4>
              <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
            </div>

            {/* Objectives */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Objectives
              </h4>
              <ul className="space-y-2">
                {selectedProject.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Technologies */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Wrench className="h-5 w-5 mr-2" />
                Tools & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tools.map((tool, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Faculty Guide */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Faculty Guide
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{selectedProject.facultyGuide.name}</h5>
                    <p className="text-gray-600 text-sm">{selectedProject.facultyGuide.department}</p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Mail className="h-4 w-4 mr-1" />
                      {selectedProject.facultyGuide.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guidance */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Guidance & Tips
              </h4>
              <div className="space-y-2">
                {selectedProject.guidance.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-blue-800">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleBookmark(selectedProject.id)}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center ${
                  bookmarkedProjects.includes(selectedProject.id)
                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {bookmarkedProjects.includes(selectedProject.id) ? (
                  <BookmarkCheck className="h-5 w-5 mr-2" />
                ) : (
                  <Bookmark className="h-5 w-5 mr-2" />
                )}
                {bookmarkedProjects.includes(selectedProject.id) ? 'Bookmarked' : 'Bookmark Project'}
              </button>
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Apply for Project
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Project Topics">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Explore Project Topics</h2>
            <p className="text-gray-600">Discover exciting projects across all 22 departments and find your perfect match.</p>
          </div>
          
          {/* Progress Indicator */}
          <div className="bg-white rounded-xl shadow-sm p-4 min-w-[200px]">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Your Progress</span>
            </div>
            <p className="text-sm text-gray-600">
              Explored {exploredDepartments.length}/{departmentFolders.length} departments
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(exploredDepartments.length / departmentFolders.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search projects by name, department, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white min-w-[180px]"
            >
              <option value="all">All Projects</option>
              <option value="workshops">Workshops</option>
              <option value="research">Research Projects</option>
              <option value="technical">Technical Projects</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProjects.length} projects
            {searchTerm && ` for "${searchTerm}"`}
            {selectedFilter !== 'all' && ` in ${selectedFilter}`}
          </p>
        </div>
      </div>

      {/* Department Folders */}
      <div className="space-y-4 mb-12">
        {departmentFolders.map((department) => {
          const isExpanded = expandedFolders.includes(department.id);
          const departmentProjects = department.projects.filter(project => {
            if (searchTerm) {
              return project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     project.tools.some(tool => tool.toLowerCase().includes(searchTerm.toLowerCase()));
            }
            if (selectedFilter !== 'all') {
              if (selectedFilter === 'workshops') return project.type === 'workshop';
              if (selectedFilter === 'research') return project.type === 'research';
              if (selectedFilter === 'technical') return project.type === 'technical';
            }
            return true;
          });

          if (departmentProjects.length === 0 && (searchTerm || selectedFilter !== 'all')) {
            return null;
          }

          return (
            <div key={department.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Folder Header */}
              <button
                onClick={() => handleFolderToggle(department.id)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{department.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{department.name}</h3>
                      <p className="text-sm text-gray-600">{department.projects.length} projects available</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      {departmentProjects.length} projects
                      {searchTerm || selectedFilter !== 'all' ? ` (filtered)` : ''}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>

              {/* Folder Content */}
              {isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50">
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {departmentProjects.map((project) => (
                        <div
                          key={project.id}
                          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 cursor-pointer overflow-hidden"
                          onClick={() => handleProjectClick({ ...project, departmentName: department.name, departmentIcon: department.icon })}
                        >
                          {/* Project Card Header */}
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-semibold text-gray-900 text-sm leading-tight">{project.name}</h4>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookmark(project.id);
                                }}
                                className={`p-1 rounded-full transition-colors ${
                                  bookmarkedProjects.includes(project.id)
                                    ? 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200'
                                    : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                                }`}
                              >
                                {bookmarkedProjects.includes(project.id) ? (
                                  <BookmarkCheck className="h-4 w-4" />
                                ) : (
                                  <Bookmark className="h-4 w-4" />
                                )}
                              </button>
                            </div>

                            <p className="text-gray-600 text-xs mb-3 line-clamp-2">{project.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                                {project.difficulty}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(project.type)}`}>
                                {project.type === 'workshop' ? 'Workshop' : project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                              </span>
                            </div>

                            {/* Project Info */}
                            <div className="space-y-1 text-xs text-gray-600">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{project.duration}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                <span>{project.facultyGuide.name}</span>
                              </div>
                            </div>
                          </div>

                          {/* Card Footer */}
                          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-xs text-gray-500">
                                <Star className="h-3 w-3 mr-1" />
                                <span>{project.tools.length} tools</span>
                              </div>
                              <ChevronRight className="h-3 w-3 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Workshop Calendar Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-900">Upcoming Workshops</h3>
          </div>
          <span className="text-sm text-gray-500">{workshopProjects.length} workshops available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workshopProjects.map((workshop) => (
            <div
              key={workshop.id}
              className="border border-purple-200 rounded-lg p-4 hover:bg-purple-50 transition-colors cursor-pointer"
              onClick={() => handleProjectClick({ ...workshop, departmentName: workshop.departmentName, departmentIcon: workshop.departmentIcon })}
            >
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-xl">{workshop.departmentIcon}</span>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{workshop.name}</h4>
                  <p className="text-xs text-gray-500">{workshop.departmentName}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-3 w-3 mr-1" />
                  {workshop.duration}
                </div>
                <span className="text-purple-600 font-medium">View Details</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bookmarked Projects Section */}
      {bookmarkedProjects.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <BookmarkCheck className="h-6 w-6 text-yellow-600" />
            <h3 className="text-xl font-semibold text-gray-900">My Bookmarked Projects</h3>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
              {bookmarkedProjects.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProjects
              .filter(project => bookmarkedProjects.includes(project.id))
              .map((project) => (
                <div
                  key={project.id}
                  className="border border-yellow-200 rounded-lg p-4 hover:bg-yellow-50 transition-colors cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg">{project.departmentIcon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{project.name}</h4>
                      <p className="text-xs text-gray-500">{project.departmentName}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                    <span className="text-yellow-600 font-medium">View Details</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or filters to find more projects.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedFilter('all');
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && <ProjectDetailsModal />}
    </Layout>
  );
};

export default ProjectTopics;