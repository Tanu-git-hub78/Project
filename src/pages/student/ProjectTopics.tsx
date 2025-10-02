import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { ChevronDown, ChevronRight, FolderOpen, Folder, FileText, Users } from 'lucide-react';
import { departments } from '../../data/mockData';

const ProjectTopics: React.FC = () => {
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleDepartment = (departmentId: string) => {
    setExpandedDepartments(prev => 
      prev.includes(departmentId) 
        ? prev.filter(id => id !== departmentId)
        : [...prev, departmentId]
    );
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredDepartments = departments.filter(dept => 
    selectedFilters.length === 0 || selectedFilters.includes(dept.shortName)
  );

  const allDepartments = [
    {
      id: 'agriculture-science',
      name: 'Agriculture Science',
      shortName: 'Agriculture',
      projects: [
        'Precision Farming with IoT Sensors',
        'Organic Fertilizer Impact Study',
        'Drone-based Crop Health Monitoring'
      ],
      workshop: 'Teaching & Workshop: Sustainable Farming Practices and Agri-Tech Awareness'
    },
    {
      id: 'ancient-history',
      name: 'Ancient History',
      shortName: 'History',
      projects: [
        'Digital Archiving with GIS and 3D Models',
        'Oral History Documentation',
        'AI-based Text Recognition for Ancient Scripts'
      ],
      workshop: 'Teaching & Workshop: Heritage Awareness and Digital History Tools'
    },
    {
      id: 'botany',
      name: 'Botany',
      shortName: 'Botany',
      projects: [
        'Medicinal Plant Survey & Phytochemical Screening',
        'Plant Tissue Culture',
        'Climate Impact on Flora'
      ],
      workshop: 'Teaching & Workshop: Awareness of Medicinal Plants and Lab Techniques'
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      shortName: 'Chemistry',
      projects: [
        'Biodegradable Plastic Synthesis',
        'Water Purification with Nano-materials',
        'Green Catalysts'
      ],
      workshop: 'Teaching & Workshop: Green Chemistry and Modern Lab Safety'
    },
    {
      id: 'commerce',
      name: 'Commerce',
      shortName: 'Commerce',
      projects: [
        'Consumer Behavior in E-Commerce',
        'FinTech Adoption',
        'Digital Marketing Analytics'
      ],
      workshop: 'Teaching & Workshop: Financial Literacy and Digital Business Skills'
    },
    {
      id: 'earth-science',
      name: 'Earth Science',
      shortName: 'Earth Science',
      projects: [
        'Groundwater Mapping',
        'Earthquake Risk Modeling',
        'Soil Erosion Mapping'
      ],
      workshop: 'Teaching & Workshop: Disaster Preparedness and Earth Science Awareness'
    },
    {
      id: 'economics',
      name: 'Economics',
      shortName: 'Economics',
      projects: [
        'Digital Payment Impact',
        'Inflation Impact Study',
        'Microfinance Effectiveness'
      ],
      workshop: 'Teaching & Workshop: Economic Awareness and Data-Driven Decision Making'
    },
    {
      id: 'english',
      name: 'English',
      shortName: 'English',
      projects: [
        'AI-Assisted Textual Analysis',
        'Shakespeare Adaptations',
        'Sentiment Analysis of Literature'
      ],
      workshop: 'Teaching & Workshop: Communication Skills and AI Tools in Literature'
    },
    {
      id: 'environment-science',
      name: 'Environment Science',
      shortName: 'Environment',
      projects: [
        'Air & Water Quality Monitoring',
        'Waste Recycling Study',
        'Renewable Energy Feasibility'
      ],
      workshop: 'Teaching & Workshop: Environmental Awareness and Sustainable Practices'
    },
    {
      id: 'forensic-science',
      name: 'Forensic Science',
      shortName: 'Forensic',
      projects: [
        'Digital Forensics',
        'Crime Scene Reconstruction with VR',
        'Fingerprint Analysis'
      ],
      workshop: 'Teaching & Workshop: Cyber Safety and Forensic Awareness'
    },
    {
      id: 'indic-studies',
      name: 'Indic Studies',
      shortName: 'Indic Studies',
      projects: [
        'Digitization of Manuscripts',
        'AI-based Cultural Data Mining',
        'Comparative Literature Analysis'
      ],
      workshop: 'Teaching & Workshop: Cultural Heritage and Indic Knowledge Awareness'
    },
    {
      id: 'computer-science',
      name: 'Institute of Computer Science',
      shortName: 'Computer Science',
      projects: [
        'Cybersecurity Threat Hunting',
        'AI Chatbot',
        'Blockchain Records'
      ],
      workshop: 'Teaching & Workshop: Coding, Cybersecurity, and AI for Beginners'
    },
    {
      id: 'iips',
      name: 'International Institute of Professional Studies',
      shortName: 'IIPS',
      projects: [
        'Career Recommendation AI',
        'Business Simulation Game',
        'AI Resume Screener'
      ],
      workshop: 'Teaching & Workshop: Professional Skills and Technology Awareness'
    },
    {
      id: 'library-science',
      name: 'JNIBM Library and Information Science',
      shortName: 'Library Science',
      projects: [
        'Smart Digital Library',
        'QR-Based Access',
        'Book Recommendation AI'
      ],
      workshop: 'Teaching & Workshop: Digital Literacy and Smart Library Tools'
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      shortName: 'Mathematics',
      projects: [
        'Epidemic Spread Modeling',
        'Cryptography',
        'Machine Learning Math'
      ],
      workshop: 'Teaching & Workshop: Applied Math in Real-World Problems'
    },
    {
      id: 'microbiology',
      name: 'Microbiology and Foodtech',
      shortName: 'Microbiology',
      projects: [
        'Probiotic Food Development',
        'Antimicrobial Resistance Study',
        'AI Food Spoilage Detection'
      ],
      workshop: 'Teaching & Workshop: Food Safety and Microbiology Awareness'
    },
    {
      id: 'political-science',
      name: 'Political Science',
      shortName: 'Political Science',
      projects: [
        'Social Media & Voting Study',
        'Public Opinion Survey',
        'Policy Analysis'
      ],
      workshop: 'Teaching & Workshop: Democracy Awareness and Political Technology'
    },
    {
      id: 'public-administration',
      name: 'Public Administration',
      shortName: 'Public Admin',
      projects: [
        'E-Governance Dashboard',
        'Complaint Management',
        'Service Delivery Efficiency'
      ],
      workshop: 'Teaching & Workshop: Good Governance and Public Service Awareness'
    },
    {
      id: 'sanskrit',
      name: 'Sanskrit',
      shortName: 'Sanskrit',
      projects: [
        'Neural Machine Translation',
        'Digital Sanskrit Dictionary',
        'Chatbot'
      ],
      workshop: 'Teaching & Workshop: Sanskrit Awareness and Modern Computational Tools'
    },
    {
      id: 'sanskrit-jyotirvigyan',
      name: 'Sanskrit Jyotirvigyan Ved',
      shortName: 'Jyotirvigyan',
      projects: [
        'Astrological Data Analysis',
        'ML Horoscope Trends',
        'Cultural Study'
      ],
      workshop: 'Teaching & Workshop: Jyotirvigyan Awareness and Data Science Applications'
    },
    {
      id: 'engineering',
      name: 'School of Engineering And Technology',
      shortName: 'Engineering',
      projects: [
        'Smart Campus IoT',
        'Robotics',
        'AI Traffic Management'
      ],
      workshop: 'Teaching & Workshop: Robotics, IoT, and Smart Engineering Awareness'
    },
    {
      id: 'zoology',
      name: 'Zoology and Biotech',
      shortName: 'Zoology',
      projects: [
        'DNA Barcoding',
        'Climate Impact on Animals',
        'Genetic Sequence Bioinformatics'
      ],
      workshop: 'Teaching & Workshop: Biodiversity Conservation and Biotech Awareness'
    }
  ];

  return (
    <Layout title="Project Topics">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Topics by Department</h2>
        <p className="text-gray-600">Browse projects organized by department folders. Each department contains 3 specialized projects + 1 teaching workshop.</p>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Department</h3>
        <div className="flex flex-wrap gap-2">
          {allDepartments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => toggleFilter(dept.shortName)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilters.includes(dept.shortName)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {dept.shortName}
            </button>
          ))}
          {selectedFilters.length > 0 && (
            <button
              onClick={() => setSelectedFilters([])}
              className="px-3 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Department Folders */}
      <div className="space-y-4">
        {(selectedFilters.length > 0 ? allDepartments.filter(dept => selectedFilters.includes(dept.shortName)) : allDepartments).map((department) => {
          const isExpanded = expandedDepartments.includes(department.id);
          
          return (
            <div key={department.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Department Header (Folder) */}
              <button
                onClick={() => toggleDepartment(department.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  {isExpanded ? (
                    <FolderOpen className="h-6 w-6 text-blue-600" />
                  ) : (
                    <Folder className="h-6 w-6 text-gray-600" />
                  )}
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
                    <p className="text-sm text-gray-500">4 projects available</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {/* Department Projects (Folder Contents) */}
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="space-y-3 mt-4">
                    {/* Regular Projects */}
                    {department.projects.map((project, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{project}</h4>
                          <p className="text-sm text-gray-500">Specialized project</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Teaching Workshop */}
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer border-l-4 border-orange-500">
                      <Users className="h-5 w-5 text-orange-600" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{department.workshop}</h4>
                        <p className="text-sm text-orange-600">Teaching & Workshop Project</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {selectedFilters.length > 0 && allDepartments.filter(dept => selectedFilters.includes(dept.shortName)).length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more departments.</p>
        </div>
      )}
    </Layout>
  );
};

export default ProjectTopics;