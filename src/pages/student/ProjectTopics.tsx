import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { ListFilter as Filter, Search, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import { departments, getDepartmentTopics } from '../../data/mockData';
import { ProjectTopic } from '../../types';

const ProjectTopics: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filterTopics = (): ProjectTopic[] => {
    let allTopics: ProjectTopic[] = [];
    
    if (selectedDepartment === 'all') {
      departments.forEach(dept => {
        allTopics = [...allTopics, ...dept.topics];
      });
    } else {
      allTopics = getDepartmentTopics(selectedDepartment);
    }

    if (selectedType !== 'all') {
      allTopics = allTopics.filter(topic => topic.type === selectedType);
    }

    if (searchTerm) {
      allTopics = allTopics.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return allTopics;
  };

  const filteredTopics = filterTopics();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'field-based': return <MapPin className="h-4 w-4" />;
      case 'internship': return <Users className="h-4 w-4" />;
      case 'workshop': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'field-based': return 'bg-green-100 text-green-800';
      case 'internship': return 'bg-blue-100 text-blue-800';
      case 'workshop': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="Project Topics">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Topics</h2>
        <p className="text-gray-600">Browse project topics by department with advanced filters</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search topics, departments, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="field-based">Field-based</option>
                  <option value="internship">Internship</option>
                  <option value="workshop">Workshop</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredTopics.length} project{filteredTopics.length !== 1 ? 's' : ''} 
          {selectedDepartment !== 'all' && ` in ${departments.find(d => d.id === selectedDepartment)?.name}`}
          {selectedType !== 'all' && ` (${selectedType} projects)`}
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTopics.map((topic) => (
          <div key={topic.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-sm text-blue-600 font-medium mb-2">{topic.department}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getTypeColor(topic.type)}`}>
                  {getTypeIcon(topic.type)}
                  <span className="capitalize">{topic.type.replace('-', ' ')}</span>
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-3">{topic.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{topic.duration}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
              <div className="flex flex-wrap gap-2">
                {topic.requirements.slice(0, 3).map((req, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {req}
                  </span>
                ))}
                {topic.requirements.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{topic.requirements.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <span>Select This Topic</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No topics found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </Layout>
  );
};

export default ProjectTopics;