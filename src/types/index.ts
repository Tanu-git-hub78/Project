export interface User {
  id: string;
  username: string;
  role: 'student' | 'admin' | 'examiner';
  name: string;
  email: string;
  department?: string;
  rollNumber?: string;
  college?: string;
  degree?: string;
}

export interface Student extends User {
  college: string;
  course: string;
  year: number;
  department: string;
  rollNumber: string;
  paymentStatus: 'pending' | 'paid';
  paymentDate?: string;
  totalScore?: number;
  degree: string;
}

export interface Admin extends User {
  college: string;
  department: string;
}

export interface Examiner extends User {
  department: string;
  college: string;
  assignedClasses: string[];
  evaluationHistory: EvaluationRecord[];
}

export interface EvaluationRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  projectTitle: string;
  vivaMarks: number;
  feedback: string;
  comments: string;
  evaluationDate: string;
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

export interface ProjectTopic {
  id: string;
  title: string;
  description: string;
  department: string;
  type: 'field-based' | 'internship' | 'workshop';
  duration: string;
  requirements: string[];
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  topics: ProjectTopic[];
  projects: string[];
  workshop: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentDate?: string;
  transactionId?: string;
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

export interface ChatMessage {
  id: string;
  message: string;
  response: string;
  timestamp: string;
  userId: string;
  userRole: 'student' | 'admin' | 'examiner';
}

export interface StudentSubmissionStatus {
  studentId: string;
  topicSubmissions: {
    [key: string]: {
      status: 'Not Submitted' | 'Submitted';
      uploadedFile?: {
        name: string;
        type: string;
        uploadDate: string;
      };
      aiFeedback: string[];
    };
  };
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
}