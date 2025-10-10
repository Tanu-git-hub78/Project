
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

// Get student payment status by student ID
export const getStudentPaymentStatus = (studentId: string) => {
  const student = students.find(s => s.id === studentId);
  return student ? student.paymentStatus : 'unknown';
};


// Mock Students Data
export const students: Student[] = [
  {
    id: 'student1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@student.edu',
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
      synopsis: 'synopsis_rahul.pdf',
      report: 'report_rahul.pdf',
      presentation: 'presentation_rahul.pptx'
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

// ✅ Notification mock data
export const notifications = [
  {
    id: 1,
    title: "Project Submitted",
    message: "Your field project has been successfully submitted.",
    time: "2 hours ago",
    userType: "student",
  },
  {
    id: 2,
    title: "Evaluation Assigned",
    message: "You’ve been assigned to evaluate a new project.",
    time: "1 day ago",
    userType: "examiner",
  },
];

// Mock Admins Data
export const admins: Admin[] = [
  {
    id: 'admin1',
    name: 'Dr. Rajesh Gupta',
    email: 'admin@university.edu',
    role: 'admin'
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
        studentName: 'Rahul Sharma',
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

// Authentication function
export const validateCredentials = (email: string, password: string, userType: 'student' | 'admin' | 'examiner') => {
  // Simple mock validation - in real app, this would be handled by backend
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
  return {
    totalStudents: students.length,
    totalProjects: students.filter(s => s.projectTitle).length,
    completedProjects: students.filter(s => s.projectStatus === 'evaluated').length,
    averageMarks: students.filter(s => s.vivaMarks).reduce((sum, s) => sum + (s.vivaMarks || 0), 0) / students.filter(s => s.vivaMarks).length || 0,
    paymentStats: {
      completed: students.filter(s => s.paymentStatus === 'completed').length,
      pending: students.filter(s => s.paymentStatus === 'pending').length
    }
  };
};

export const submissions = [];

export const addSubmission = (studentId: string, projectTitle: string, fileUrl: string) => {
  const submission = {
    id: `sub_${Date.now()}`,
    studentId,
    projectTitle,
    fileUrl,
    submittedAt: new Date().toISOString(),
    status: "Submitted",
  };

  submissions.push(submission);
  return submission;
};

export const departmentFolders = [
  {
    name: "Agriculture Science",
    projects: [
      "Precision Farming with IoT Sensors",
      "Organic Fertilizer Impact Study",
      "Drone-based Crop Health Monitoring"
    ]
  },
  {
    name: "Ancient History",
    projects: [
      "Cultural Heritage Documentation",
      "Archaeological Site Preservation",
      "Virtual Museum Creation"
    ]
  },
  {
    name: "Botany",
    projects: [
      "Plant Growth under Different Light Conditions",
      "Herbal Medicine Study",
      "Botanical Garden Digital Catalog"
    ]
  }
];

// ✅ Create topic cards from department folders
export const topicCards = departmentFolders.map(dept => ({
  id: dept.id,
  title: dept.name,
  icon: dept.icon,
  description: `Explore ${dept.projects.length} projects in ${dept.name}`,
  color: dept.color,
  projects: dept.projects,
}));
console.log("✅ departmentFolders loaded", departmentFolders.length);

// Update payment status for a specific student
export const updatePaymentStatus = (studentId: string, newStatus: string) => {
  console.log(`✅ Payment status for student ${studentId} updated to: ${newStatus}`);
  // Normally you'd update your backend or database here
};

console.log("✅ mockData exports loaded: ", { getStudentPaymentStatus, updatePaymentStatus });

// ✅ --- Admin Notifications Mock Data ---
export const adminNotifications = [
  {
    id: 1,
    title: "System Update Completed",
    message: "The university system has been successfully updated to version 2.1.",
    date: "2025-10-10",
    type: "info",
  },
  {
    id: 2,
    title: "Pending Viva Reports",
    message: "3 colleges have not yet submitted their viva evaluation reports.",
    date: "2025-10-08",
    type: "warning",
  },
  {
    id: 3,
    title: "New Project Submissions",
    message: "12 new student project submissions are awaiting review.",
    date: "2025-10-07",
    type: "success",
  },
];

// ✅ --- Examiner: Get Assigned Students ---
export const getAssignedStudents = (examinerId: string) => {
  // Example mock student list
  const students = [
    { id: "stu1", name: "Aman Sharma", department: "Computer Science", vivaMarks: null },
    { id: "stu2", name: "Neha Patel", department: "Computer Science", vivaMarks: null },
    { id: "stu3", name: "Ravi Verma", department: "Computer Science", vivaMarks: null },
  ];

  // You can filter by examinerId if needed
  if (examinerId === "examiner1") {
    return students;
  }
  return [];
};

// ✅ --- Examiner: Submit Viva Evaluation ---
export const submitVivaEvaluation = (
  studentId: string,
  vivaMarks: number,
  feedback: string,
  comments: string
) => {
  console.log("✅ Viva Evaluation Submitted:", {
    studentId,
    vivaMarks,
    feedback,
    comments,
  });

  return {
    success: true,
    message: `Viva evaluation submitted successfully for student ID: ${studentId}`,
  };
};


  // Example: filter based on examiner
  if (examinerId === "examiner1") {
    return students;
  }
  return [];
;

// ✅ Function to submit viva evaluation
export const submitVivaEvaluation = (
  studentId: string,
  vivaMarks: number,
  feedback: string,
  comments: string
) => {
  console.log("Submitted Viva Evaluation:", { studentId, vivaMarks, feedback, comments });
  return { success: true };
};
