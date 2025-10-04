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