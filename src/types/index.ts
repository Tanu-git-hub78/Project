export interface User {
  id: string;
  username: string;
  role: 'student' | 'admin' | 'examiner';
  name: string;
  email: string;
  department?: string;
  rollNumber?: string;
  college?: string;
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
  type: 'deadline' | 'announcement' | 'examiner' | 'payment';
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