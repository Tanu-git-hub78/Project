// Mock data for the Student Project Management System

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  college: string;
  degree: string;
  year: number;
  cgpa: number;
  phone: string;
  projectTitle?: string;
  projectDescription?: string;
  projectStatus: 'not_started' | 'in_progress' | 'submitted' | 'evaluated';
  submissionDate?: string;
  vivaDate?: string;
  vivaMarks?: number;
  feedback?: string;
  paymentStatus: 'pending' | 'completed';
  documents?: {
    synopsis?: string;
    report?: string;
    presentation?: string;
  };
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  college: string;
  department: string;
}

export interface Examiner {
  id: string;
  name: string;
  email: string;
  department: string;
  college: string;
  assignedClasses: string[];
  evaluationHistory: EvaluationRecord[];
}

export interface EvaluationRecord {
  id: string;
  studentName: string;
  rollNumber: string;
  projectTitle: string;
  vivaMarks: number;
  feedback: string;
  comments?: string;
  evaluationDate: string;
}

export interface ProjectTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  technologies: string[];
  estimatedDuration: string;
  prerequisites: string[];
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  department: string;
  title: string;
  description: string;
  facultyName: string;
  fileName: string;
  fileType: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
  examinerComments?: string;
  vivaMarks?: number;
  totalScore?: number;
  paymentStatus: 'pending' | 'paid';
  category?: string;
  degree?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'deadline' | 'announcement' | 'examiner' | 'payment' | 'meeting' | 'format' | 'general';
  targetRole: 'student' | 'admin' | 'examiner' | 'all';
  department?: string;
  isImportant: boolean;
  createdDate: string;
  isActive: boolean;
}

export interface AIProjectIdea {
  id: string;
  title: string;
  description: string;
  degree: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: string;
  technologies?: string[];
}

export interface TopicProject {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  duration: string;
  tools: string[];
  facultyGuide: {
    name: string;
    email: string;
    department: string;
  };
  type: 'workshop' | 'research' | 'short-term' | 'field-based';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  submissionStatus: 'Not Submitted' | 'Submitted';
  hasFile: boolean;
  fileName: string;
  comments: string[];
  guidance: string[];
  uploadedFile?: {
    name: string;
    type: string;
    uploadDate: string;
  };
  isBookmarked?: boolean;
  departmentName?: string;
  departmentIcon?: string;
}

// Get student payment status by student ID
export const getStudentPaymentStatus = (studentId: string) => {
  const student = students.find(s => s.id === studentId);
  return student ? student.paymentStatus : 'pending';
};

// Mock Students Data
export const students: Student[] = [
  {
    id: 'student1',
    name: 'Tanu Sharma',
    email: 'tanu.sharma@student.edu',
    rollNumber: 'CS2021001',
    college: 'Delhi Technical University',
    degree: 'B.Tech Computer Science',
    year: 4,
    cgpa: 8.5,
    phone: '+91-9876543210',
    projectTitle: 'AI-Powered Student Management System',
    projectDescription: 'A comprehensive system using machine learning to manage student data and predict academic performance.',
    projectStatus: 'submitted',
    submissionDate: '2024-01-15',
    vivaDate: '2024-01-25',
    vivaMarks: 85,
    feedback: 'Excellent implementation with innovative features.',
    paymentStatus: 'completed',
    documents: {
      synopsis: 'synopsis_tanu.pdf',
      report: 'report_tanu.pdf',
      presentation: 'presentation_tanu.pptx'
    }
  },
  {
    id: 'student2',
    name: 'Priya Patel',
    email: 'priya.patel@student.edu',
    rollNumber: 'CS2021002',
    college: 'Mumbai Institute of Technology',
    degree: 'B.Tech Computer Science',
    year: 4,
    cgpa: 9.2,
    phone: '+91-9876543211',
    projectTitle: 'E-Commerce Platform with Blockchain',
    projectDescription: 'A secure e-commerce platform implementing blockchain technology for transparent transactions.',
    projectStatus: 'in_progress',
    paymentStatus: 'completed'
  },
  {
    id: 'student3',
    name: 'Amit Kumar',
    email: 'amit.kumar@student.edu',
    rollNumber: 'CS2021003',
    college: 'Bangalore Engineering College',
    degree: 'B.Tech Computer Science',
    year: 4,
    cgpa: 7.8,
    phone: '+91-9876543212',
    projectTitle: 'IoT-Based Smart Home System',
    projectDescription: 'An Internet of Things solution for home automation and energy management.',
    projectStatus: 'evaluated',
    submissionDate: '2024-01-10',
    vivaDate: '2024-01-20',
    vivaMarks: 78,
    feedback: 'Good technical implementation, needs improvement in documentation.',
    paymentStatus: 'completed'
  }
];

// Mock Admins Data
export const admins: Admin[] = [
  {
    id: 'admin1',
    name: 'Dr. Rajesh Gupta',
    email: 'admin@university.edu',
    role: 'admin',
    college: 'Delhi Technical University',
    department: 'Computer Science'
  }
];

// Mock Examiners Data
export const examiners: Examiner[] = [
  {
    id: 'examiner1',
    name: 'Prof. Sunita Mehta',
    email: 'sunita.mehta@university.edu',
    department: 'Computer Science',
    college: 'Delhi Technical University',
    assignedClasses: ['B.Tech CS Final Year', 'M.Tech CS'],
    evaluationHistory: [
      {
        id: 'eval1',
        studentName: 'Tanu Sharma',
        rollNumber: 'CS2021001',
        projectTitle: 'AI-Powered Student Management System',
        vivaMarks: 85,
        feedback: 'Excellent implementation with innovative features.',
        comments: 'Student demonstrated strong understanding of AI concepts.',
        evaluationDate: '2024-01-25'
      },
      {
        id: 'eval2',
        studentName: 'Amit Kumar',
        rollNumber: 'CS2021003',
        projectTitle: 'IoT-Based Smart Home System',
        vivaMarks: 78,
        feedback: 'Good technical implementation, needs improvement in documentation.',
        comments: 'Hardware integration was well done.',
        evaluationDate: '2024-01-20'
      }
    ]
  }
];

// Mock Project Topics
export const projectTopics: ProjectTopic[] = [
  {
    id: 'topic1',
    title: 'Machine Learning for Healthcare',
    description: 'Develop ML models for disease prediction and diagnosis',
    category: 'Artificial Intelligence',
    difficulty: 'Advanced',
    technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas'],
    estimatedDuration: '6-8 months',
    prerequisites: ['Machine Learning Basics', 'Python Programming', 'Statistics']
  },
  {
    id: 'topic2',
    title: 'Blockchain-based Voting System',
    description: 'Create a secure and transparent voting system using blockchain',
    category: 'Blockchain',
    difficulty: 'Intermediate',
    technologies: ['Solidity', 'Web3.js', 'React', 'Node.js'],
    estimatedDuration: '4-6 months',
    prerequisites: ['Blockchain Fundamentals', 'JavaScript', 'Cryptography']
  },
  {
    id: 'topic3',
    title: 'Mobile App for Food Delivery',
    description: 'Build a complete food delivery application with real-time tracking',
    category: 'Mobile Development',
    difficulty: 'Intermediate',
    technologies: ['React Native', 'Firebase', 'Google Maps API', 'Node.js'],
    estimatedDuration: '4-5 months',
    prerequisites: ['Mobile Development', 'JavaScript', 'Database Design']
  }
];

// Mock Submissions
export const submissions: Submission[] = [
  {
    id: 'sub1',
    studentId: 'student1',
    studentName: 'Tanu Sharma',
    rollNumber: 'CS2021001',
    department: 'Computer Science',
    title: 'AI-Powered Student Management System',
    description: 'A comprehensive system using machine learning to manage student data and predict academic performance.',
    facultyName: 'Dr. Rajesh Kumar',
    fileName: 'AI_Student_Management_System.pdf',
    fileType: 'application/pdf',
    submissionDate: '2024-01-15T10:30:00Z',
    status: 'approved',
    feedback: 'Excellent work with innovative AI implementation.',
    examinerComments: 'Strong technical understanding demonstrated.',
    vivaMarks: 85,
    paymentStatus: 'paid',
    category: 'Artificial Intelligence',
    degree: 'B.Tech Computer Science'
  }
];

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Project Submission Deadline Extended',
    message: 'The final project submission deadline has been extended to May 20th, 2024.',
    type: 'deadline',
    targetRole: 'student',
    isImportant: true,
    createdDate: '2024-01-10',
    isActive: true
  },
  {
    id: '2',
    title: 'New Project Format Guidelines',
    message: 'Updated project format guidelines are now available. Please check the Guidelines section.',
    type: 'format',
    targetRole: 'student',
    isImportant: false,
    createdDate: '2024-01-08',
    isActive: true
  }
];

// Department Folders with Projects
export const departmentFolders = [
  {
    id: 'agriculture',
    name: 'Agriculture Science',
    icon: '🌾',
    color: 'bg-green-100 hover:bg-green-200 text-green-800',
    projects: [
      {
        id: 'agri1',
        name: 'Precision Farming with IoT Sensors',
        description: 'Implement IoT sensors for monitoring soil moisture, temperature, and crop health.',
        objectives: [
          'Design and deploy IoT sensor network',
          'Develop data collection and analysis system',
          'Create farmer-friendly mobile application'
        ],
        duration: '4-6 months',
        tools: ['Arduino', 'Raspberry Pi', 'Python', 'Mobile App Development'],
        facultyGuide: {
          name: 'Dr. Rajesh Patel',
          email: 'rajesh.patel@university.edu',
          department: 'Agriculture Science'
        },
        type: 'field-based' as const,
        difficulty: 'Intermediate' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: true,
        fileName: 'IoT_Farming_Guide.pdf',
        comments: ['Focus on practical implementation', 'Consider cost-effective solutions'],
        guidance: [
          'Start with literature review on precision farming',
          'Identify suitable IoT sensors for agricultural use',
          'Design system architecture before implementation'
        ]
      }
    ]
  },
  {
    id: 'botany',
    name: 'Botany',
    icon: '🌿',
    color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800',
    projects: [
      {
        id: 'bot1',
        name: 'Plant Growth Analysis under Different Light Conditions',
        description: 'Study the effects of various light spectrums on plant growth and development.',
        objectives: [
          'Set up controlled light environment chambers',
          'Monitor plant growth parameters',
          'Analyze data and draw conclusions'
        ],
        duration: '3-4 months',
        tools: ['LED Light Systems', 'Growth Measurement Tools', 'Data Analysis Software'],
        facultyGuide: {
          name: 'Dr. Priya Sharma',
          email: 'priya.sharma@university.edu',
          department: 'Botany'
        },
        type: 'research' as const,
        difficulty: 'Beginner' as const,
        submissionStatus: 'Not Submitted' as const,
        hasFile: false,
        fileName: '',
        comments: ['Ensure proper control groups', 'Document all observations'],
        guidance: [
          'Research different light spectrums and their effects',
          'Design experimental setup with proper controls',
          'Plan regular monitoring schedule'
        ]
      }
    ]
  }
];

// AI Project Ideas
export const aiProjectIdeas: AIProjectIdea[] = [
  {
    id: 'ai1',
    title: 'Smart Campus Management System',
    description: 'AI-powered system for managing campus resources, student attendance, and facility optimization.',
    degree: 'B.Tech Computer Science',
    difficulty: 'Advanced',
    estimatedDuration: '6-8 months',
    technologies: ['Python', 'Machine Learning', 'Computer Vision', 'IoT']
  },
  {
    id: 'ai2',
    title: 'Automated Essay Grading System',
    description: 'Natural language processing system for automated evaluation of student essays.',
    degree: 'B.Tech Computer Science',
    difficulty: 'Intermediate',
    estimatedDuration: '4-5 months',
    technologies: ['Python', 'NLP', 'TensorFlow', 'NLTK']
  }
];

// Topic Cards
export const topicCards = departmentFolders.map(dept => ({
  id: dept.id,
  title: dept.name,
  icon: dept.icon,
  description: `Explore ${dept.projects.length} projects in ${dept.name}`,
  color: dept.color,
  projects: dept.projects,
}));

// Categories
export const categories = [
  'Artificial Intelligence',
  'Machine Learning',
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Cybersecurity',
  'IoT',
  'Blockchain',
  'Cloud Computing',
  'Software Engineering'
];

// Colleges
export const colleges = [
  {
    id: 'college1',
    name: 'Delhi Technical University',
    location: 'New Delhi',
    students: 15000,
    established: '1941'
  },
  {
    id: 'college2',
    name: 'Mumbai Institute of Technology',
    location: 'Mumbai',
    students: 12000,
    established: '1958'
  }
];

// Degrees
export const degrees = [
  {
    id: 'btech-cs',
    name: 'Bachelor of Technology in Computer Science',
    shortName: 'B.Tech CS',
    duration: '4 years'
  },
  {
    id: 'bsc-cs',
    name: 'Bachelor of Science in Computer Science',
    shortName: 'B.Sc CS',
    duration: '3 years'
  }
];

// Authentication function
export const validateCredentials = (email: string, password: string, userType: 'student' | 'admin' | 'examiner') => {
  if (userType === 'student') {
    const student = students.find(s => s.email === email);
    return student ? { ...student, role: 'student' } : null;
  } else if (userType === 'admin') {
    const admin = admins.find(a => a.email === email);
    return admin ? { ...admin, role: 'admin' } : null;
  } else if (userType === 'examiner') {
    const examiner = examiners.find(e => e.email === email);
    return examiner ? { ...examiner, role: 'examiner' } : null;
  }
  return null;
};

// Analytics data
export const getAnalyticsData = () => {
  return [
    {
      degree: 'B.Tech Computer Science',
      total: 150,
      submitted: 120,
      approved: 100,
      pending: 20,
      percentage: 80
    },
    {
      degree: 'B.Sc Computer Science',
      total: 100,
      submitted: 75,
      approved: 60,
      pending: 15,
      percentage: 75
    }
  ];
};

// Add submission function
export const addSubmission = (submission: Omit<Submission, 'id'>) => {
  const newSubmission = {
    id: `sub_${Date.now()}`,
    ...submission
  };
  submissions.push(newSubmission);
  return newSubmission;
};

// Update payment status
export const updatePaymentStatus = (studentId: string, newStatus: 'pending' | 'completed') => {
  const student = students.find(s => s.id === studentId);
  if (student) {
    student.paymentStatus = newStatus;
  }
};

// Get assigned students for examiner
export const getAssignedStudents = (examinerId: string) => {
  return [
    {
      id: 'stu1',
      name: 'Tanu Sharma',
      rollNumber: 'CS2021001',
      department: 'Computer Science',
      assignedProject: 'AI-Powered Student Management System',
      status: 'Pending Viva'
    },
    {
      id: 'stu2',
      name: 'Neha Patel',
      rollNumber: 'CS2021002',
      department: 'Computer Science',
      assignedProject: 'E-Commerce Platform with Blockchain',
      status: 'Pending Viva'
    },
    {
      id: 'stu3',
      name: 'Ravi Verma',
      rollNumber: 'CS2021003',
      department: 'Computer Science',
      assignedProject: 'IoT-Based Smart Home System',
      status: 'Pending Viva'
    }
  ];
};

// Submit viva evaluation
export const submitVivaEvaluation = (
  studentId: string,
  vivaMarks: number,
  feedback: string,
  examinerComments: string
) => {
  const submission = submissions.find(s => s.studentId === studentId);
  if (submission) {
    submission.vivaMarks = vivaMarks;
    submission.feedback = feedback;
    submission.examinerComments = examinerComments;
    submission.status = vivaMarks >= 70 ? 'approved' : vivaMarks >= 50 ? 'pending' : 'rejected';
  }

  return {
    success: true,
    message: `Viva evaluation submitted successfully for student ID: ${studentId}`,
  };
};

// Generate students for degree
export const generateStudentsForDegree = (degreeName: string, count: number) => {
  const names = ['Aarav Singh', 'Vivaan Sharma', 'Aditya Patel', 'Vihaan Kumar', 'Arjun Gupta'];
  const colleges = ['Delhi Technical University', 'Mumbai Institute of Technology', 'Bangalore Engineering College'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: `student_${degreeName}_${index + 1}`,
    name: names[index % names.length],
    email: `student${index + 1}@university.edu`,
    rollNumber: `${degreeName.substring(0, 2).toUpperCase()}2021${String(index + 1).padStart(3, '0')}`,
    college: colleges[index % colleges.length],
    degree: degreeName,
    year: 4,
    course: degreeName,
    paymentStatus: Math.random() > 0.3 ? 'completed' : 'pending'
  }));
};

// Student submission status
export const studentSubmissions: { [key: string]: any } = {};

export const getStudentSubmissionStatus = (studentId: string) => {
  return studentSubmissions[studentId] || {
    topicSubmissions: {}
  };
};

export const updateProjectSubmission = (studentId: string, topicId: string, projectId: string, fileData: any) => {
  if (!studentSubmissions[studentId]) {
    studentSubmissions[studentId] = { topicSubmissions: {} };
  }
  
  const key = `${topicId}-${projectId}`;
  studentSubmissions[studentId].topicSubmissions[key] = {
    status: 'Submitted',
    uploadedFile: fileData,
    aiFeedback: [`Great work on ${projectId}!`, 'Consider adding more technical details.']
  };
};

// AI Project Recommendations
export const getAIProjectRecommendations = (degree: string, preferences: string[]) => {
  return aiProjectIdeas.filter(project => project.degree === degree);
};

// Generate AI Feedback
export const generateAIFeedback = (projectName: string, fileName: string) => {
  return [
    `Your project "${projectName}" shows good technical understanding.`,
    'Consider adding more detailed analysis in the methodology section.',
    'The implementation approach is solid, but documentation could be improved.',
    'Great choice of technologies for this type of project.'
  ];
};

// Admin Notifications
export const adminNotifications = [
  {
    id: '1',
    title: 'System Update Completed',
    message: 'The university system has been successfully updated to version 2.1.',
    date: '2024-01-10',
    type: 'info',
    createdDate: '2024-01-10',
    isActive: true
  },
  {
    id: '2',
    title: 'Pending Viva Reports',
    message: '3 colleges have not yet submitted their viva evaluation reports.',
    date: '2024-01-08',
    type: 'warning',
    createdDate: '2024-01-08',
    isActive: true
  }
];

console.log("✅ mockData exports loaded successfully");