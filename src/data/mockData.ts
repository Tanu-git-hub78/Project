import { Student, Admin, Examiner, Submission, Department, ProjectTopic, Payment, Notification, EvaluationRecord } from '../types';

// Secure credentials
const CREDENTIALS = {
  students: [
    { username: 'tanu', password: 'Babaji78@@', userId: '1' }
  ],
  admins: [
    { username: 'Tanu@', password: 'Babaji@@', userId: 'admin1' }
  ],
  examiners: [
    { username: 'examiner1', password: 'exam123', userId: 'exam1' },
    { username: 'examiner2', password: 'exam123', userId: 'exam2' }
  ]
};

export const validateCredentials = (username: string, password: string): { isValid: boolean; userId?: string; role?: 'student' | 'admin' | 'examiner' } => {
  const student = CREDENTIALS.students.find(s => s.username === username && s.password === password);
  if (student) {
    return { isValid: true, userId: student.userId, role: 'student' };
  }
  
  const admin = CREDENTIALS.admins.find(a => a.username === username && a.password === password);
  if (admin) {
    return { isValid: true, userId: admin.userId, role: 'admin' };
  }
  
  const examiner = CREDENTIALS.examiners.find(e => e.username === username && e.password === password);
  if (examiner) {
    return { isValid: true, userId: examiner.userId, role: 'examiner' };
  }
  
  return { isValid: false };
};

export const students: Student[] = [
  {
    id: '1',
    username: 'tanu',
    role: 'student',
    name: 'Tanu Singh',
    email: 'tanu@university.edu',
    college: 'Main Campus',
    course: 'Computer Science',
    year: 3,
    department: 'Computer Science',
    rollNumber: 'CS2021001',
    paymentStatus: 'pending'
  }
];

export const admins: Admin[] = [
  {
    id: 'admin1',
    username: 'Tanu@',
    role: 'admin',
    name: 'Dr. Tanu Sharma',
    email: 'admin@university.edu',
    college: 'Main Campus',
    department: 'Administration'
  }
];

export const examiners: Examiner[] = [
  {
    id: 'exam1',
    username: 'examiner1',
    role: 'examiner',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh@university.edu',
    department: 'Computer Science',
    college: 'Main Campus',
    assignedClasses: ['CS2021', 'CS2022'],
    evaluationHistory: []
  },
  {
    id: 'exam2',
    username: 'examiner2',
    role: 'examiner',
    name: 'Dr. Priya Verma',
    email: 'priya@university.edu',
    department: 'Commerce',
    college: 'Main Campus',
    assignedClasses: ['COM2021', 'COM2022'],
    evaluationHistory: []
  }
];

// Categories for project submission
export const categories = [
  'Research Project',
  'Field Study',
  'Internship Report',
  'Workshop Project',
  'Technical Project',
  'Literature Review',
  'Case Study',
  'Survey Analysis'
];

// Analytics data for degrees
export const degrees = [
  { id: 'bsc-honors', name: 'BSc Honors', shortName: 'BSc Honors' },
  { id: 'bsc-cs', name: 'BSc Computer Science', shortName: 'BSc CS' },
  { id: 'bsc-physics', name: 'BSc Physics', shortName: 'BSc Physics' },
  { id: 'bca', name: 'Bachelor of Computer Applications', shortName: 'BCA' },
  { id: 'bcom-honors', name: 'BCom Honors', shortName: 'BCom Honors' },
  { id: 'bcom', name: 'Bachelor of Commerce', shortName: 'BCom' },
  { id: 'bba', name: 'Bachelor of Business Administration', shortName: 'BBA' },
  { id: 'finance', name: 'Finance', shortName: 'Finance' },
  { id: 'sanskrit', name: 'Sanskrit', shortName: 'Sanskrit' },
  { id: 'mathematics', name: 'Mathematics', shortName: 'Mathematics' }
];

// Generate students for each degree
export const generateStudentsForDegree = (degreeName: string, count: number = 50): Student[] => {
  const students: Student[] = [];
  const currentYear = new Date().getFullYear();
  
  for (let i = 1; i <= count; i++) {
    const rollNumber = `${degreeName.replace(/\s+/g, '').toUpperCase()}${currentYear}${String(i).padStart(3, '0')}`;
    const student: Student = {
      id: `${degreeName.toLowerCase().replace(/\s+/g, '-')}-${i}`,
      username: `student${i}`,
      role: 'student',
      name: `Student ${i} ${degreeName}`,
      email: `student${i}.${degreeName.toLowerCase().replace(/\s+/g, '')}@university.edu`,
      college: 'Main Campus',
      course: degreeName,
      year: Math.floor(Math.random() * 4) + 1,
      department: degreeName,
      rollNumber: rollNumber,
      paymentStatus: Math.random() > 0.3 ? 'paid' : 'pending',
      degree: degreeName
    };
    students.push(student);
  }
  
  return students;
};

// Student submission tracking
export const studentSubmissions: { [studentId: string]: StudentSubmissionStatus } = {};

export const getStudentSubmissionStatus = (studentId: string): StudentSubmissionStatus | undefined => {
  return studentSubmissions[studentId];
};

export const updateProjectSubmission = (
  studentId: string, 
  topicId: string, 
  projectId: string, 
  fileData: { name: string; type: string; uploadDate: string }
) => {
  if (!studentSubmissions[studentId]) {
    studentSubmissions[studentId] = {
      studentId,
      topicSubmissions: {}
    };
  }
  
  const key = `${topicId}-${projectId}`;
  studentSubmissions[studentId].topicSubmissions[key] = {
    status: 'Submitted',
    uploadedFile: fileData,
    aiFeedback: []
  };
};

export const generateAIFeedback = (projectName: string, fileName: string): string[] => {
  const feedbackOptions = [
    `Great work on "${projectName}"! Consider adding more detailed methodology section.`,
    `Your project shows good understanding. Try to include more recent references and citations.`,
    `Excellent choice of topic. The analysis could benefit from additional data visualization.`,
    `Well-structured project. Consider expanding the conclusion with practical implications.`,
    `Good research approach. Adding case studies would strengthen your arguments.`,
    `Impressive work! Consider including a section on limitations and future scope.`
  ];
  
  const formatFeedback = [
    `File "${fileName}" is well-formatted. Ensure consistent font sizes throughout.`,
    `Document structure looks good. Consider adding page numbers and proper headers.`,
    `Good use of headings. Make sure all images have proper captions and references.`
  ];
  
  return [
    feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)],
    formatFeedback[Math.floor(Math.random() * formatFeedback.length)]
  ];
};

// Topic cards for student dashboard
export const topicCards = [
  {
    id: 'agriculture-science',
    title: 'Agriculture Science',
    description: 'Modern farming techniques and agricultural innovation',
    icon: '🌾',
    color: 'bg-green-100 hover:bg-green-200 text-green-800',
    projects: [
      {
        id: 'precision-farming-iot',
        name: 'Precision Farming with IoT Sensors',
        description: 'Implement IoT sensors for precision agriculture to monitor soil conditions, weather patterns, and crop health in real-time.',
        objectives: [
          'Deploy IoT sensors across agricultural fields for data collection',
          'Develop real-time monitoring dashboard for farmers',
          'Analyze soil moisture, pH, and nutrient levels',
          'Create automated irrigation and fertilization systems'
        ],
        duration: '3-4 months',
        tools: ['IoT Sensors', 'Arduino/Raspberry Pi', 'Mobile App Development', 'Data Analytics', 'Cloud Computing'],
        facultyGuide: {
          name: 'Dr. Rajesh Kumar',
          email: 'rajesh.kumar@university.edu',
          department: 'Agriculture Science'
        },
        type: 'research' as const,
        difficulty: 'Advanced' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Focus on practical implementation for farmers', 'Include cost-benefit analysis'],
        guidance: ['Research IoT applications in agriculture', 'Connect with local farmers', 'Design user-friendly interfaces'],
        isBookmarked: false
      },
      {
        id: 'organic-fertilizer-study',
        name: 'Organic Fertilizer Impact Study',
        description: 'Comprehensive study on the effectiveness of organic fertilizers compared to chemical alternatives on crop yield and soil health.',
        objectives: [
          'Compare organic vs chemical fertilizer effects on crop yield',
          'Analyze long-term soil health impacts',
          'Study cost-effectiveness for farmers',
          'Document environmental benefits and challenges'
        ],
        duration: '4-6 months',
        tools: ['Soil Testing Kits', 'Laboratory Equipment', 'Statistical Software', 'Field Measurement Tools'],
        facultyGuide: {
          name: 'Dr. Sunita Verma',
          email: 'sunita.verma@university.edu',
          department: 'Agriculture Science'
        },
        type: 'research' as const,
        difficulty: 'Intermediate' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Include statistical analysis', 'Document farmer feedback'],
        guidance: ['Design controlled experiments', 'Collect comprehensive data', 'Analyze long-term impacts'],
        isBookmarked: false
      },
      {
        id: 'drone-crop-monitoring',
        name: 'Drone-based Crop Health Monitoring',
        description: 'Use drone technology with computer vision to monitor crop health, detect diseases, and optimize agricultural practices.',
        objectives: [
          'Deploy drones for aerial crop surveillance',
          'Implement computer vision for disease detection',
          'Create crop health mapping systems',
          'Develop early warning systems for farmers'
        ],
        duration: '3-4 months',
        tools: ['Drones', 'Computer Vision', 'Machine Learning', 'GIS Mapping', 'Image Processing Software'],
        facultyGuide: {
          name: 'Prof. Amit Gupta',
          email: 'amit.gupta@university.edu',
          department: 'Agriculture Science'
        },
        type: 'research' as const,
        difficulty: 'Advanced' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Focus on practical applications', 'Include technical specifications'],
        guidance: ['Learn drone operation and regulations', 'Study computer vision techniques', 'Test with real crops'],
        isBookmarked: false
      },
      {
        id: 'sustainable-farming-workshop',
        name: 'Teaching & Workshop: Sustainable Farming Practices',
        description: 'Conduct workshops for local farmers on sustainable farming practices and modern agricultural technologies.',
        objectives: [
          'Educate farmers about sustainable practices',
          'Demonstrate modern farming techniques',
          'Promote eco-friendly agricultural methods',
          'Create awareness about climate-smart agriculture'
        ],
        duration: '2-3 weeks',
        tools: ['Training Materials', 'Demonstration Plots', 'Presentation Tools', 'Agricultural Equipment'],
        facultyGuide: {
          name: 'Dr. Kavita Sharma',
          email: 'kavita.sharma@university.edu',
          department: 'Agriculture Science'
        },
        type: 'workshop' as const,
        difficulty: 'Beginner' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Focus on practical demonstrations', 'Include farmer feedback'],
        guidance: ['Prepare engaging presentations', 'Plan hands-on activities', 'Connect with farming communities'],
        isBookmarked: false
      }
    ]
  },
  {
    id: 'ancient-history',
    title: 'Ancient History',
    description: 'Digital preservation and analysis of historical artifacts',
    icon: '🏛️',
    color: 'bg-amber-100 hover:bg-amber-200 text-amber-800',
    projects: [
      {
        id: 'digital-archiving-gis',
        name: 'Digital Archiving with GIS and 3D Models',
        description: 'Create digital archives of historical sites using GIS mapping and 3D modeling technologies for preservation and research.',
        objectives: [
          'Document historical sites using 3D scanning technology',
          'Create comprehensive GIS databases of archaeological sites',
          'Develop virtual reality experiences for historical education',
          'Build accessible digital archives for researchers'
        ],
        duration: '4-5 months',
        tools: ['3D Scanners', 'GIS Software', 'VR Development Tools', 'Database Management', 'Web Development'],
        facultyGuide: {
          name: 'Dr. Priya Mehta',
          email: 'priya.mehta@university.edu',
          department: 'Ancient History'
        },
        type: 'research' as const,
        difficulty: 'Advanced' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Focus on preservation techniques', 'Include accessibility features'],
        guidance: ['Learn 3D modeling software', 'Study GIS applications', 'Collaborate with museums'],
        isBookmarked: false
      },
      {
        id: 'oral-history-documentation',
        name: 'Oral History Documentation',
        description: 'Collect, digitize, and preserve oral histories from elderly community members to maintain cultural heritage.',
        objectives: [
          'Interview elderly community members about historical events',
          'Record and digitize oral narratives',
          'Create searchable digital archives',
          'Develop educational materials from collected stories'
        ],
        duration: '3-4 months',
        tools: ['Audio Recording Equipment', 'Video Cameras', 'Transcription Software', 'Digital Archive Systems'],
        facultyGuide: {
          name: 'Prof. Rajesh Gupta',
          email: 'rajesh.gupta@university.edu',
          department: 'Ancient History'
        },
        type: 'field-based' as const,
        difficulty: 'Intermediate' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Respect cultural sensitivities', 'Ensure proper consent'],
        guidance: ['Develop interview skills', 'Learn recording techniques', 'Build community trust'],
        isBookmarked: false
      },
      {
        id: 'ai-ancient-text-recognition',
        name: 'AI-based Ancient Text Recognition',
        description: 'Develop AI systems to recognize and translate ancient scripts and manuscripts for historical research.',
        objectives: [
          'Train machine learning models on ancient scripts',
          'Develop OCR systems for historical manuscripts',
          'Create translation tools for ancient languages',
          'Build searchable databases of historical texts'
        ],
        duration: '4-6 months',
        tools: ['Machine Learning', 'Computer Vision', 'OCR Technology', 'Natural Language Processing', 'Python'],
        facultyGuide: {
          name: 'Dr. Anita Sharma',
          email: 'anita.sharma@university.edu',
          department: 'Ancient History'
        },
        type: 'research' as const,
        difficulty: 'Advanced' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Focus on accuracy and preservation', 'Include validation methods'],
        guidance: ['Study machine learning techniques', 'Collect training data', 'Collaborate with linguists'],
        isBookmarked: false
      },
      {
        id: 'heritage-awareness-workshop',
        name: 'Teaching & Workshop: Heritage Awareness',
        description: 'Conduct workshops to create awareness about cultural heritage preservation and the importance of historical sites.',
        objectives: [
          'Educate communities about heritage preservation',
          'Demonstrate digital tools for historical research',
          'Create awareness about archaeological importance',
          'Promote cultural tourism and conservation'
        ],
        duration: '2-3 weeks',
        tools: ['Presentation Materials', 'Digital Tools', 'Educational Resources', 'Community Outreach'],
        facultyGuide: {
          name: 'Prof. Meera Joshi',
          email: 'meera.joshi@university.edu',
          department: 'Ancient History'
        },
        type: 'workshop' as const,
        difficulty: 'Beginner' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Make it engaging for all ages', 'Include interactive elements'],
        guidance: ['Prepare visual presentations', 'Plan site visits', 'Engage local communities'],
        isBookmarked: false
      }
    ]
  }
];

// Add all remaining 20 departments with similar structure
export const allDepartments = [
  ...topicCards,
  {
    id: 'botany',
    title: 'Botany',
    description: 'Plant biology and botanical research',
    icon: '🌿',
    color: 'bg-green-100 hover:bg-green-200 text-green-800',
    projects: [
      {
        id: 'medicinal-plant-survey',
        name: 'Medicinal Plant Survey',
        description: 'Comprehensive survey and documentation of medicinal plants in local ecosystems with phytochemical analysis.',
        objectives: [
          'Identify and catalog medicinal plants in the region',
          'Conduct phytochemical screening of plant extracts',
          'Document traditional uses and modern applications',
          'Create digital herbarium with GPS mapping'
        ],
        duration: '4-6 months',
        tools: ['Plant Collection Equipment', 'Microscopes', 'Chemical Analysis Kits', 'GPS Devices', 'Database Software'],
        facultyGuide: {
          name: 'Dr. Sunita Rao',
          email: 'sunita.rao@university.edu',
          department: 'Botany'
        },
        type: 'field-based' as const,
        difficulty: 'Intermediate' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Include conservation recommendations', 'Document sustainable harvesting'],
        guidance: ['Learn plant identification techniques', 'Study phytochemistry basics', 'Connect with local healers'],
        isBookmarked: false
      },
      {
        id: 'plant-tissue-culture',
        name: 'Plant Tissue Culture Experiment',
        description: 'Develop tissue culture protocols for endangered plant species conservation and mass propagation.',
        objectives: [
          'Establish sterile tissue culture protocols',
          'Optimize growth media for different plant species',
          'Study regeneration patterns and success rates',
          'Develop protocols for endangered species conservation'
        ],
        duration: '3-4 months',
        tools: ['Tissue Culture Lab', 'Sterile Equipment', 'Growth Media', 'Microscopes', 'Environmental Controls'],
        facultyGuide: {
          name: 'Prof. Kavita Mehta',
          email: 'kavita.mehta@university.edu',
          department: 'Botany'
        },
        type: 'research' as const,
        difficulty: 'Intermediate' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Maintain sterile conditions', 'Document all protocols'],
        guidance: ['Learn sterile techniques', 'Study plant physiology', 'Practice lab procedures'],
        isBookmarked: false
      },
      {
        id: 'climate-impact-flora',
        name: 'Climate Change Impact on Flora',
        description: 'Study the effects of climate change on local plant communities and develop adaptation strategies.',
        objectives: [
          'Monitor plant phenology changes due to climate',
          'Study species distribution shifts',
          'Analyze adaptation mechanisms in plants',
          'Develop conservation strategies for vulnerable species'
        ],
        duration: '4-5 months',
        tools: ['Climate Monitoring Equipment', 'GIS Software', 'Statistical Analysis', 'Field Survey Tools'],
        facultyGuide: {
          name: 'Dr. Rajesh Kumar',
          email: 'rajesh.kumar@university.edu',
          department: 'Botany'
        },
        type: 'research' as const,
        difficulty: 'Advanced' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Include long-term monitoring', 'Focus on conservation'],
        guidance: ['Study climate science basics', 'Learn ecological monitoring', 'Analyze environmental data'],
        isBookmarked: false
      },
      {
        id: 'modern-lab-techniques-workshop',
        name: 'Teaching & Workshop: Modern Lab Techniques',
        description: 'Train students and researchers in modern botanical laboratory techniques and equipment usage.',
        objectives: [
          'Demonstrate advanced microscopy techniques',
          'Teach molecular biology methods for plants',
          'Train in tissue culture procedures',
          'Introduce modern analytical instruments'
        ],
        duration: '2-3 weeks',
        tools: ['Laboratory Equipment', 'Microscopes', 'Training Materials', 'Safety Equipment'],
        facultyGuide: {
          name: 'Prof. Anita Verma',
          email: 'anita.verma@university.edu',
          department: 'Botany'
        },
        type: 'workshop' as const,
        difficulty: 'Beginner' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Emphasize safety protocols', 'Include hands-on practice'],
        guidance: ['Prepare detailed protocols', 'Plan practical sessions', 'Ensure safety compliance'],
        isBookmarked: false
      }
    ]
  },
  {
    id: 'veterinary',
    title: 'Veterinary Hospital',
    description: 'Animal health and veterinary services',
    icon: '🐕',
    color: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
    projects: [
      {
        id: 'animal-health-survey',
        name: 'Animal Health Survey',
        description: 'Conduct health surveys of livestock in rural areas.',
        objectives: [
          'Survey livestock health status in rural communities',
          'Identify common diseases and health issues',
          'Document vaccination and treatment records',
          'Recommend preventive healthcare measures'
        ],
        duration: '3-4 months',
        tools: ['Health Assessment Forms', 'Digital Cameras', 'GPS Devices', 'Database Software'],
        facultyGuide: {
          name: 'Dr. Kavita Joshi',
          email: 'kavita.joshi@university.edu',
          department: 'Veterinary Science'
        },
        type: 'field-based' as const,
        difficulty: 'Intermediate' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Include vaccination records', 'Document common diseases'],
        guidance: ['Learn basic veterinary assessment', 'Coordinate with local vets', 'Create health database'],
        isBookmarked: false
      },
      {
        id: 'pet-care-awareness',
        name: 'Pet Care Awareness Program',
        description: 'Educate communities about proper pet care and hygiene.',
        objectives: [
          'Develop pet care educational materials',
          'Conduct community awareness sessions',
          'Train pet owners in basic healthcare',
          'Establish pet care support networks'
        ],
        duration: '2-3 months',
        tools: ['Educational Materials', 'Presentation Tools', 'Pet Care Kits', 'Community Networks'],
        facultyGuide: {
          name: 'Dr. Ravi Sharma',
          email: 'ravi.sharma@university.edu',
          department: 'Veterinary Science'
        },
        type: 'workshop' as const,
        difficulty: 'Beginner' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'pet-care-guidelines.pdf',
        comments: ['Include practical demonstrations', 'Focus on preventive care'],
        guidance: ['Research pet care best practices', 'Prepare educational materials', 'Organize community sessions'],
        isBookmarked: false
      }
    ]
  },
  {
    id: 'banking',
    title: 'Banking',
    description: 'Financial literacy and banking services',
    icon: '🏦',
    color: 'bg-purple-100 hover:bg-purple-200 text-purple-800',
    projects: [
      {
        id: 'financial-literacy',
        name: 'Financial Literacy Program',
        description: 'Conduct financial literacy workshops for rural communities.',
        objectives: [
          'Assess current financial literacy levels',
          'Design culturally appropriate training modules',
          'Conduct interactive financial education workshops',
          'Measure improvement in financial knowledge and behavior'
        ],
        duration: '3-4 months',
        tools: ['Training Materials', 'Interactive Games', 'Assessment Tools', 'Mobile Banking Apps'],
        facultyGuide: {
          name: 'Prof. Deepak Agarwal',
          email: 'deepak.agarwal@university.edu',
          department: 'Banking & Finance'
        },
        type: 'workshop' as const,
        difficulty: 'Beginner' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Use simple, practical examples', 'Include digital banking basics'],
        guidance: ['Understand basic financial concepts', 'Design interactive workshops', 'Create easy-to-understand materials'],
        isBookmarked: false
      },
      {
        id: 'digital-banking',
        name: 'Digital Banking Adoption',
        description: 'Help communities adopt digital banking services.',
        objectives: [
          'Study barriers to digital banking adoption',
          'Develop user-friendly training programs',
          'Provide hands-on digital banking training',
          'Monitor adoption rates and user satisfaction'
        ],
        duration: '2-3 months',
        tools: ['Smartphones/Tablets', 'Banking Apps', 'Training Modules', 'User Feedback Systems'],
        facultyGuide: {
          name: 'Dr. Neha Kapoor',
          email: 'neha.kapoor@university.edu',
          department: 'Banking Technology'
        },
        type: 'short-term' as const,
        difficulty: 'Intermediate' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'digital-banking-tutorial.pdf',
        comments: ['Address security concerns', 'Provide hands-on training'],
        guidance: ['Learn digital banking platforms', 'Identify user barriers', 'Provide step-by-step guidance'],
        isBookmarked: false
      }
    ]
  },
  {
    id: 'social-work',
    title: 'Social Work',
    description: 'Community development and social welfare',
    icon: '🤝',
    color: 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800',
    projects: [
      {
        id: 'community-development',
        name: 'Community Development Project',
        description: 'Identify and address key community development needs.',
        objectives: [
          'Conduct comprehensive community needs assessment',
          'Identify priority development areas',
          'Design community-driven development programs',
          'Implement pilot development initiatives'
        ],
        duration: '4-5 months',
        tools: ['Survey Tools', 'Community Mapping', 'Project Management Software', 'Impact Measurement Tools'],
        facultyGuide: {
          name: 'Dr. Sunita Rao',
          email: 'sunita.rao@university.edu',
          department: 'Social Work'
        },
        type: 'field-based' as const,
        difficulty: 'Advanced' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Involve community members in planning', 'Focus on sustainable solutions'],
        guidance: ['Conduct community needs assessment', 'Build local partnerships', 'Develop action plans'],
        isBookmarked: false
      },
      {
        id: 'elderly-care',
        name: 'Elderly Care Initiative',
        description: 'Develop support systems for elderly community members.',
        objectives: [
          'Assess elderly care needs in the community',
          'Design comprehensive support programs',
          'Train community volunteers in elderly care',
          'Establish sustainable care networks'
        ],
        duration: '3-4 months',
        tools: ['Assessment Forms', 'Training Materials', 'Care Protocols', 'Volunteer Management Systems'],
        facultyGuide: {
          name: 'Prof. Ramesh Gupta',
          email: 'ramesh.gupta@university.edu',
          department: 'Social Work'
        },
        type: 'workshop' as const,
        difficulty: 'Intermediate' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'elderly-care-framework.pdf',
        comments: ['Include family involvement strategies', 'Address healthcare access'],
        guidance: ['Assess elderly population needs', 'Design support programs', 'Train community volunteers'],
        isBookmarked: false
      }
    ]
  },
  {
    id: 'teaching',
    title: 'Teaching',
    description: 'Educational initiatives and skill development',
    icon: '📚',
    color: 'bg-orange-100 hover:bg-orange-200 text-orange-800',
    projects: [
      {
        id: 'adult-literacy',
        name: 'Adult Literacy Program',
        description: 'Teach basic literacy skills to adults in rural communities.',
        objectives: [
          'Assess adult literacy levels in target communities',
          'Develop age-appropriate learning materials',
          'Conduct structured literacy classes',
          'Track learning progress and outcomes'
        ],
        duration: '4-6 months',
        tools: ['Learning Materials', 'Assessment Tools', 'Teaching Aids', 'Progress Tracking Systems'],
        facultyGuide: {
          name: 'Dr. Pooja Mishra',
          email: 'pooja.mishra@university.edu',
          department: 'Education'
        },
        type: 'workshop' as const,
        difficulty: 'Intermediate' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Use culturally relevant materials', 'Track learning progress'],
        guidance: ['Assess current literacy levels', 'Develop appropriate curriculum', 'Use engaging teaching methods'],
        isBookmarked: false
      },
      {
        id: 'skill-development',
        name: 'Skill Development Workshop',
        description: 'Conduct workshops to teach practical skills for employment.',
        objectives: [
          'Identify market-relevant skills in demand',
          'Design practical skill training modules',
          'Conduct hands-on training workshops',
          'Connect trainees with employment opportunities'
        ],
        duration: '2-3 months',
        tools: ['Training Equipment', 'Skill Assessment Tools', 'Certification Systems', 'Job Placement Networks'],
        facultyGuide: {
          name: 'Prof. Vikash Kumar',
          email: 'vikash.kumar@university.edu',
          department: 'Skill Development'
        },
        type: 'workshop' as const,
        difficulty: 'Beginner' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'skill-development-modules.pdf',
        comments: ['Focus on market-relevant skills', 'Include certification process'],
        guidance: ['Identify in-demand skills', 'Design practical training modules', 'Connect with potential employers'],
        isBookmarked: false
      }
    ]
  }
  // Continue with remaining 19 departments...
];

// AI Project Ideas and Recommendations
export const aiProjectIdeas: AIProjectIdea[] = [
  {
    id: 'ai-1',
    title: 'Smart Campus Management System',
    description: 'Develop an AI-powered system to manage campus resources, student attendance, and facility optimization.',
    degree: 'BSc CS',
    difficulty: 'Intermediate',
    estimatedDuration: '3-4 months',
    technologies: ['Python', 'Machine Learning', 'IoT', 'Database Management']
  },
  {
    id: 'ai-2',
    title: 'Automated Essay Grading System',
    description: 'Create an NLP-based system that can automatically grade essays and provide feedback.',
    degree: 'BSc CS',
    difficulty: 'Advanced',
    estimatedDuration: '4-5 months',
    technologies: ['Natural Language Processing', 'Python', 'TensorFlow', 'Machine Learning']
  },
  {
    id: 'ai-3',
    title: 'Personal Finance Tracker',
    description: 'Build a mobile app that helps users track expenses, set budgets, and provide financial insights.',
    degree: 'BCA',
    difficulty: 'Beginner',
    estimatedDuration: '2-3 months',
    technologies: ['React Native', 'JavaScript', 'Database', 'API Integration']
  }
];

export const getAIProjectRecommendations = (degree: string, preferences: string[]): AIProjectIdea[] => {
  return aiProjectIdeas.filter(project => 
    project.degree === degree || 
    preferences.some(pref => 
      project.technologies?.some(tech => 
        tech.toLowerCase().includes(pref.toLowerCase())
      ) || 
      project.title.toLowerCase().includes(pref.toLowerCase()) ||
      project.description.toLowerCase().includes(pref.toLowerCase())
    )
  );
};

// Analytics data
export const getAnalyticsData = () => {
  const analyticsData = degrees.map(degree => {
    const students = generateStudentsForDegree(degree.shortName, 50);
    const submitted = Math.floor(Math.random() * 30) + 10; // Random between 10-40
    const total = students.length;
    const pending = total - submitted;
    const percentage = Math.round((submitted / total) * 100);
    
    return {
      degree: degree.shortName,
      submitted,
      pending,
      total,
      percentage
    };
  });
  
  return analyticsData;
};

// Colleges data
export const colleges = [
  {
    id: 'main-campus',
    name: 'Main Campus',
    location: 'University City',
    students: 2500,
    established: '1985'
  },
  {
    id: 'north-campus',
    name: 'North Campus',
    location: 'North District',
    students: 1800,
    established: '1995'
  },
  {
    id: 'south-campus',
    name: 'South Campus',
    location: 'South District',
    students: 2200,
    established: '1990'
  }
];

// Departments data
export const departments: Department[] = [
  {
    id: 'agriculture-science',
    name: 'Agriculture Science',
    shortName: 'Agriculture',
    topics: [],
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
    topics: [],
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
    topics: [],
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
    topics: [],
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
    topics: [],
    projects: [
      'Consumer Behavior in E-Commerce',
      'FinTech Adoption',
      'Digital Marketing Analytics'
    ],
    workshop: 'Teaching & Workshop: Financial Literacy and Digital Business Skills'
  }
];

export const submissions: Submission[] = [];

export const payments: Payment[] = [];

  export const notifications: Notification[] = [
  {
    id: 'notif1',
    title: 'Project Submission Deadline Extended',
    message: 'The final project submission deadline has been extended to May 20th, 2024. Payment of ₹50 is mandatory before submission.',
    type: 'deadline',
    targetRole: 'student',
    isImportant: true,
    createdDate: '2024-01-25',
    isActive: true
  },
  {
    id: 'notif2',
    title: 'Payment Gateway Now Active',
    message: 'Students can now make payments of ₹50 for project submissions. Payment is required before uploading projects.',
    type: 'payment',
    targetRole: 'student',
    isImportant: true,
    createdDate: '2024-01-22',
    isActive: true
  }
];

// 👇 Instead of referencing `notifications`, make a separate export
export const adminNotifications: Notification[] = [
  {
    id: 'adminNotif1',
    title: 'Faculty Meeting Scheduled',
    message: 'All examiners are requested to attend the faculty meeting on May 5th, 2024.',
    type: 'meeting',
    targetRole: 'admin',
    isImportant: true,
    createdDate: '2024-01-20',
    isActive: true
  },
  {
    id: 'adminNotif2',
    title: 'Evaluation Deadline',
    message: 'Examiners must submit all project evaluations by May 25th, 2024.',
    type: 'deadline',
    targetRole: 'admin',
    isImportant: true,
    createdDate: '2024-01-18',
    isActive: true
  }
];

// Helper functions
export const getDepartmentTopics = (departmentId: string): ProjectTopic[] => {
  const department = departments.find(d => d.id === departmentId);
  return department ? department.topics : [];
};

export const getStudentPaymentStatus = (studentId: string): 'pending' | 'paid' => {
  const student = students.find(s => s.id === studentId);
  return student ? student.paymentStatus : 'pending';
};

export const updatePaymentStatus = (studentId: string, status: 'paid' | 'pending') => {
  const student = students.find(s => s.id === studentId);
  if (student) {
    student.paymentStatus = status;
    if (status === 'paid') {
      student.paymentDate = new Date().toISOString();
    }
  }
};

export const addSubmission = (submission: Omit<Submission, 'id'>) => {
  const newSubmission: Submission = {
    ...submission,
    id: Date.now().toString(),
    category: submission.category || 'General Project',
    degree: submission.degree || 'Unknown'
  };
  submissions.push(newSubmission);
  return newSubmission;
};

export const getStudentSubmissions = (studentId: string): Submission[] => {
  return submissions.filter(s => s.studentId === studentId);
};

export const addEvaluationRecord = (examinerId: string, record: Omit<EvaluationRecord, 'id'>) => {
  const examiner = examiners.find(e => e.id === examinerId);
  if (examiner) {
    const newRecord: EvaluationRecord = {
      ...record,
      id: Date.now().toString()
    };
    examiner.evaluationHistory.push(newRecord);
    
    // Update submission with viva marks
    const submission = submissions.find(s => s.studentId === record.studentId);
    if (submission) {
      submission.vivaMarks = record.vivaMarks;
      submission.examinerComments = record.comments;
      submission.totalScore = record.vivaMarks; // Can be enhanced with other components
    }
    
    return newRecord;
  }
  return null;
};