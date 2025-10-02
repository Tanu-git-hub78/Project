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
    id: 'environmental-studies',
    title: 'Environmental Studies',
    description: 'Sustainability and conservation projects',
    icon: '🌱',
    color: 'bg-green-100 hover:bg-green-200 text-green-800',
    projects: [
      {
        id: 'waste-management',
        name: 'Waste Management Project',
        description: 'Develop sustainable waste management solutions for local communities.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Focus on practical implementation', 'Include cost-benefit analysis'],
        guidance: ['Research current waste management practices', 'Identify key stakeholders', 'Propose innovative solutions']
      },
      {
        id: 'renewable-energy',
        name: 'Renewable Energy Assessment',
        description: 'Assess renewable energy potential in rural areas.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'renewable-energy-guidelines.pdf',
        comments: ['Consider multiple energy sources', 'Include feasibility study'],
        guidance: ['Study solar and wind potential', 'Analyze energy consumption patterns', 'Calculate return on investment']
      }
    ]
  },
  {
    id: 'public-health',
    title: 'Public Health',
    description: 'Community health and wellness initiatives',
    icon: '🏥',
    color: 'bg-red-100 hover:bg-red-200 text-red-800',
    projects: [
      {
        id: 'health-awareness',
        name: 'Health Awareness Campaign',
        description: 'Design and implement health awareness campaigns for rural communities.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Target specific health issues', 'Measure campaign effectiveness'],
        guidance: ['Identify priority health issues', 'Design engaging materials', 'Plan community outreach events']
      },
      {
        id: 'nutrition-study',
        name: 'Nutrition Assessment Study',
        description: 'Conduct nutritional assessment in local schools.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'nutrition-assessment-template.pdf',
        comments: ['Use standardized assessment tools', 'Include dietary recommendations'],
        guidance: ['Learn assessment techniques', 'Collect comprehensive data', 'Provide actionable recommendations']
      }
    ]
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    description: 'Sustainable farming and agricultural innovation',
    icon: '🌾',
    color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800',
    projects: [
      {
        id: 'organic-farming',
        name: 'Organic Farming Initiative',
        description: 'Promote organic farming practices among local farmers.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Document farmer feedback', 'Compare yield differences'],
        guidance: ['Research organic methods', 'Connect with local farmers', 'Monitor implementation progress']
      },
      {
        id: 'crop-monitoring',
        name: 'Smart Crop Monitoring',
        description: 'Implement IoT-based crop monitoring systems.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'iot-agriculture-guide.pdf',
        comments: ['Focus on cost-effective solutions', 'Include technical specifications'],
        guidance: ['Learn IoT basics', 'Design monitoring system', 'Test with real crops']
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
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Include vaccination records', 'Document common diseases'],
        guidance: ['Learn basic veterinary assessment', 'Coordinate with local vets', 'Create health database']
      },
      {
        id: 'pet-care-awareness',
        name: 'Pet Care Awareness Program',
        description: 'Educate communities about proper pet care and hygiene.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'pet-care-guidelines.pdf',
        comments: ['Include practical demonstrations', 'Focus on preventive care'],
        guidance: ['Research pet care best practices', 'Prepare educational materials', 'Organize community sessions']
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
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Use simple, practical examples', 'Include digital banking basics'],
        guidance: ['Understand basic financial concepts', 'Design interactive workshops', 'Create easy-to-understand materials']
      },
      {
        id: 'digital-banking',
        name: 'Digital Banking Adoption',
        description: 'Help communities adopt digital banking services.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'digital-banking-tutorial.pdf',
        comments: ['Address security concerns', 'Provide hands-on training'],
        guidance: ['Learn digital banking platforms', 'Identify user barriers', 'Provide step-by-step guidance']
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
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Involve community members in planning', 'Focus on sustainable solutions'],
        guidance: ['Conduct community needs assessment', 'Build local partnerships', 'Develop action plans']
      },
      {
        id: 'elderly-care',
        name: 'Elderly Care Initiative',
        description: 'Develop support systems for elderly community members.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'elderly-care-framework.pdf',
        comments: ['Include family involvement strategies', 'Address healthcare access'],
        guidance: ['Assess elderly population needs', 'Design support programs', 'Train community volunteers']
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
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Use culturally relevant materials', 'Track learning progress'],
        guidance: ['Assess current literacy levels', 'Develop appropriate curriculum', 'Use engaging teaching methods']
      },
      {
        id: 'skill-development',
        name: 'Skill Development Workshop',
        description: 'Conduct workshops to teach practical skills for employment.',
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'skill-development-modules.pdf',
        comments: ['Focus on market-relevant skills', 'Include certification process'],
        guidance: ['Identify in-demand skills', 'Design practical training modules', 'Connect with potential employers']
      }
    ]
  }
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