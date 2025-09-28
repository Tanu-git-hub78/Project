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

export const departments: Department[] = [
  
  {
    id: 'agriculture',
    name: 'Agriculture Science',
    shortName: 'Agriculture',
    topics: [
      {
        id: 'agri-1',
        title: 'Organic Farming Workshop',
        description: 'Hands-on experience with organic farming techniques and sustainable agriculture practices.',
        department: 'Agriculture Science',
        type: 'workshop',
        duration: '3 months',
        requirements: ['Field visit', 'Practical implementation', 'Report submission']
      },
      {
        id: 'agri-2',
        title: 'Soil Testing Internship',
        description: 'Laboratory internship focusing on soil analysis and quality assessment techniques.',
        department: 'Agriculture Science',
        type: 'internship',
        duration: '2 months',
        requirements: ['Lab work', 'Data analysis', 'Technical report']
      },
      {
        id: 'agri-3',
        title: 'Smart Irrigation Project',
        description: 'Design and implement IoT-based smart irrigation systems for efficient water management.',
        department: 'Agriculture Science',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Technical design', 'Field implementation', 'Performance analysis']
      }
    ]
  },
  {
    id: 'history',
    name: 'Ancient History',
    shortName: 'History',
    topics: [
      {
        id: 'hist-1',
        title: 'Field Survey of Monuments',
        description: 'Archaeological survey and documentation of historical monuments in the region.',
        department: 'Ancient History',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Site visits', 'Documentation', 'Historical analysis']
      },
      {
        id: 'hist-2',
        title: 'Oral History Project',
        description: 'Collection and preservation of oral histories from local communities.',
        department: 'Ancient History',
        type: 'field-based',
        duration: '2 months',
        requirements: ['Interviews', 'Audio recording', 'Transcription']
      },
      {
        id: 'hist-3',
        title: 'Museum Volunteer Program',
        description: 'Volunteer work at local museums with curatorial and educational activities.',
        department: 'Ancient History',
        type: 'internship',
        duration: '3 months',
        requirements: ['Museum work', 'Visitor interaction', 'Exhibition support']
      }
    ]
  },
  {
    id: 'botany',
    name: 'Botany',
    shortName: 'Botany',
    topics: [
      {
        id: 'bot-1',
        title: 'Medicinal Plants Survey',
        description: 'Survey and documentation of medicinal plants in local ecosystems.',
        department: 'Botany',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Field survey', 'Plant identification', 'Medicinal properties research']
      },
      {
        id: 'bot-2',
        title: 'Botanical Garden Internship',
        description: 'Internship at botanical gardens focusing on plant conservation and research.',
        department: 'Botany',
        type: 'internship',
        duration: '2 months',
        requirements: ['Garden maintenance', 'Research assistance', 'Visitor education']
      },
      {
        id: 'bot-3',
        title: 'Seed Conservation Project',
        description: 'Project on seed banking and conservation of indigenous plant varieties.',
        department: 'Botany',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Seed collection', 'Storage techniques', 'Viability testing']
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    shortName: 'Chemistry',
    topics: [
      {
        id: 'chem-1',
        title: 'Water Quality Testing',
        description: 'Analysis of water quality in local sources using chemical testing methods.',
        department: 'Chemistry',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Sample collection', 'Laboratory analysis', 'Quality assessment']
      },
      {
        id: 'chem-2',
        title: 'Food Adulteration Awareness Workshop',
        description: 'Workshop on detecting food adulteration and consumer awareness.',
        department: 'Chemistry',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Testing methods', 'Public awareness', 'Educational materials']
      },
      {
        id: 'chem-3',
        title: 'Lab Safety Internship',
        description: 'Internship focusing on laboratory safety protocols and chemical handling.',
        department: 'Chemistry',
        type: 'internship',
        duration: '2 months',
        requirements: ['Safety training', 'Protocol development', 'Risk assessment']
      }
    ]
  },
  {
    id: 'commerce',
    name: 'Commerce',
    shortName: 'Commerce',
    topics: [
      {
        id: 'com-1',
        title: 'Small Business Survey',
        description: 'Survey and analysis of small businesses in the local market.',
        department: 'Commerce',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Business interviews', 'Market analysis', 'Financial assessment']
      },
      {
        id: 'com-2',
        title: 'Local Entrepreneurship Study',
        description: 'Study of local entrepreneurship trends and success factors.',
        department: 'Commerce',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Entrepreneur interviews', 'Case studies', 'Trend analysis']
      },
      {
        id: 'com-3',
        title: 'Banking Internship',
        description: 'Internship at local banks to understand banking operations and services.',
        department: 'Commerce',
        type: 'internship',
        duration: '2 months',
        requirements: ['Banking operations', 'Customer service', 'Financial products']
      }
    ]
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    shortName: 'CS',
    topics: [
      {
        id: 'cs-1',
        title: 'AI Chatbot Development',
        description: 'Develop an AI-powered chatbot for university assistance and FAQ handling.',
        department: 'Computer Science',
        type: 'field-based',
        duration: '4 months',
        requirements: ['Programming', 'AI/ML implementation', 'User testing']
      },
      {
        id: 'cs-2',
        title: 'Cybersecurity Awareness Workshop',
        description: 'Workshop on cybersecurity best practices and threat awareness.',
        department: 'Computer Science',
        type: 'workshop',
        duration: '2 months',
        requirements: ['Security research', 'Workshop materials', 'Public presentation']
      },
      {
        id: 'cs-3',
        title: 'Web Development for NGOs',
        description: 'Develop websites for local NGOs to improve their digital presence.',
        department: 'Computer Science',
        type: 'field-based',
        duration: '3 months',
        requirements: ['Web development', 'Client interaction', 'Deployment']
      }
    ]
  }

];

// ✅ Place the function here, **after departments is closed**
export const getAnalyticsData = () => {
  return [
    totalStudents: students.length,
    totalAdmins: admins.length,
    totalExaminers: examiners.length,
    totalDepartments: departments.length,
    totalSubmissions: submissions.length,
    totalPayments: payments.length,
    activeNotifications: notifications.filter(n => n.isActive).length,
    paidStudents: students.filter(s => s.paymentStatus === 'paid').length,
    pendingPayments: students.filter(s => s.paymentStatus === 'pending').length
  ];
};

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
    id: Date.now().toString()
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

